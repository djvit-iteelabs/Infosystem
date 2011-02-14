/**
 * @author Eugen
 */

/**
 * Active timer
 */

 function Timer(){	
 };

Timer.prototype = {
	timer: null,
	init : function(){
		if(!this.timer)
			this.timer = window.setInterval(function(){
				var d = new Date();
				var t = $("#dateText");
		
				t.html(d.toLocaleDateString() + "<br/>" +
						 d.toLocaleTimeString());
			},1000);
		else
			this.stop();
	},
	stop : function(){
		window.clearInterval(this.timer);
		this.timer = null;
	}
}
