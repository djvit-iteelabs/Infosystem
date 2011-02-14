/**
 * @author Eugen
 */

function themesRotator(){	
};

themesRotator.prototype = {
	thmTimer: null,		// timer
	thmThemes: null,		//css style 
	thmInterval: null,	// how often check the time(milliseconds)
	
	init : function(i){ // i - initial interval
		var _this = this;
		var _document = document;
		var c = 0;
		
		this.thmThemes = {};
				
		if(parseInt(i)&& (i > 1000))
			this.thmInterval = i;
		else
			this.thmInterval = 1000;
			
		for(var i = 0; i < themesData.themes.length; i++){
			this.thmThemes[i] = {};
			
			this.thmThemes[i]['theme'] = themesData.themes[i].theme;
			this.thmThemes[i]['start'] = themesData.themes[i].start;
			this.thmThemes[i]['end'] = themesData.themes[i].end;
		}
		
		$('link[href*=style]').attr('href','css/' + this.thmThemes[c]['theme']);
		
		if(!this.thmTimer)
			this.thmTimer = window.setInterval(function(){
				$('link[href*=style]').attr('href','css/' + _this.thmThemes[Math.round(Math.random())]['theme']);
			}, this.thmInterval);
		else
			window.clearInterval(this.thmTimer);
	}
}
