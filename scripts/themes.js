/**
 * @author Eugen
 */

function themesRotator(){	
};

themesRotator.prototype = {
	thmTimer: null,		// timer
	thmThemes: null,	// array of styles 
	thmInterval: null,	// how often check the time(milliseconds)
	thmCount : null,    // themes count
	thmName : null,     //current theme name
	dtsTimer : null,	// DayTime service check timer
	dtsInterval: 8640,// 24 hours = 86400 seconds = 86400000 ms
	dtsUrl: 'data/DTS.data',
	
	init : function(i){ // i - initial interval
		var _this = this;
		
		this.thmThemes = {};
				
		if(parseInt(i) && (i > 1000))
			this.thmInterval = i;
		else
			this.thmInterval = 1000;
			
		this.setcount(themesData.themes.length);
		
		for(var i = 0; i < this.getcount(); i++){
			this.thmThemes[i] = {};
			
			this.thmThemes[i]['name']  = themesData.themes[i].name;
			this.thmThemes[i]['theme'] = themesData.themes[i].theme;
			this.thmThemes[i]['start'] = themesData.themes[i].start;
			this.thmThemes[i]['end']   = themesData.themes[i].end;
		}
		
		$('link[href*=style]').attr('href','css/' + this.checktime());
		
		if (!this.thmTimer) 
			this.thmTimer = window.setInterval(function(){
				$('link[href*=style]').attr('href', 'css/' + _this.checktime());
			}, this.thmInterval);
		else {
			window.clearInterval(this.thmTimer);
			this.thmTimer = null;
		}
		
		// Start DayTime service check timer
		if (!this.dtsTimer) {
			this.dtsTimer = window.setInterval(function() {
				_this.checkDTS();
			}, this.dtsInterval)
		}
		else {
			window.clearInterval(this.dtsTimer);
			this.dtsTimer = null;
		}
	},
	
	checktime : function(){
		var _this = this;
		var d= new Date();
		var t = d.getHours();
			
		var th = 'style.css';
		
		for(var i = 0;i < this.getcount();i++){
			var start = parseInt(this.thmThemes[i]['start'])
			var end = parseInt(this.thmThemes[i]['end']);
			var name = this.thmThemes[i]['name'];
			
			if (start < end){
				if ((t >= start) && (t < end)) {
					th = this.thmThemes[i]['theme'];
						
					$("div.menuItem img, div[id^=page] img").each(function(){
						var str = $(this).attr("src");
						if ((typeof(str) === 'undefined') || (str == null)) str = ''; 
						
						if ((_this.thmName == null) || (_this.thmName === 'undefined'))
							str = str.replace("###",name);
						else
							str = str.replace(_this.thmName, name);
							
						$(this).attr("src",str);	
					});

					this.thmName = this.thmThemes[i]['name'];
				}
			}
			if (start > end){
				if ((t >= start) || (t < end)) {
					th = this.thmThemes[i]['theme'];
					
					$("div.menuItem img, div[id^=page] img").each(function(){
						var str = '';
						str = $(this).attr("src");
						
						if ((_this.thmName == null) || (_this.thmName === 'undefined'))
							str = str.replace("###",name);
						else
							str = str.replace(_this.thmName,name);
							
						$(this).attr("src", str);	
					});
					
					this.thmName = this.thmThemes[i]['name'];
				}				
			}
		}
		
		return th;
	},
	
	getcount : function(){
		return this.thmCount;
	},
	
	setcount : function(c){
		this.thmCount = c;
	},
	
	checkDTS: function() {
		var _this = this;
		
		this.getRSSContent(this.dtsUrl, function(){
			for (var i = 0; i < _this.getcount(); i++) {
				_this.thmThemes[i] = null;
				_this.thmThemes[i] = {};
			}
	
			_this.thmThemes[0]['name']  = 'day';
			_this.thmThemes[0]['theme'] = 'style.day.css';
			_this.thmThemes[0]['start'] = RSSData.Detail.sunrise;
			_this.thmThemes[0]['end']   = RSSData.Detail.sunset;
	
			_this.thmThemes[1]['name']  = 'night';
			_this.thmThemes[1]['theme'] = 'style.night.css';
			_this.thmThemes[1]['start'] = RSSData.Detail.sunset;
			_this.thmThemes[1]['end']   = RSSData.Detail.sunrise;
		});
	},
	
	getRSSContent: function(url, callback) {
	    var randomnumber = Math.floor(Math.random()*1000001);
		url += '?r=' + randomnumber;
		if (jQuery.support.scriptEval) { 
	        var old = document.getElementById('div_Theme_Processor_Container');  
	        if (old != null) {  
	             old.parentNode.removeChild(old);  
	             delete old;  
	        } 
	        
			var head = document.getElementsByTagName('head')[0]; 
	        var script = document.createElement('script');
	        script.id = 'div_Theme_Processor_Container';
	        script.type = 'text/javascript';
	        script.onload = callback; 
	        script.src = url; 
	        head.appendChild(script);  
	    } else {
	       $.getScript(url, function(){
	            callback();
	      });
		}
	},
}
