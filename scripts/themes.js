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
				//$('link[href*=style]').attr('href','css/' + _this.thmThemes[Math.round(Math.random())]['theme']);
				$('link[href*=style]').attr('href', 'css/' + _this.checktime());
			}, this.thmInterval);
		else {
			window.clearInterval(this.thmTimer);
			this.thmTimer = null;
		}
	},
	
	checktime : function(){
		var d= new Date();
		var t = d.getHours();
			
		var th = 'style.css';
		
		for(var i = 0;i < this.getcount();i++){
			var start = parseInt(this.thmThemes[i]['start'])
			var end = parseInt(this.thmThemes[i]['end']);
			
			if (start < end){
				if((t >= start) && (t <= end))
					th = this.thmThemes[i]['theme'];
			}
			if (start > end){
				if((t >= start) || (t <= end))
			  		th = this.thmThemes[i]['theme'];				
			}
		}
		
		return th;
	},
	
	getcount : function(){
		return this.thmCount;
	},
	
	setcount : function(c){
		this.thmCount = c;
	}
	
}
