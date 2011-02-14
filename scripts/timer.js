/**
 * @author Eugen
 */

 function Timer(){	
 };

Timer.prototype = {
	timer: null,
	init : function(){
		if(!this.timer)
			this.timer = window.setInterval(function(){
				var d = new Date();
				$("#dateText").html(d.toLocaleDateString() + " " +
						 d.toLocaleTimeString());
			}, 1000);
		else
			this.stop();
	},
	stop : function(){
		window.clearInterval(this.timer);
		this.timer = null;
	}
}
