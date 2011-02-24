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
	},
	
	setDate: function(){
		var d = new Date();
		var dy = d.getDate();
		var m = d.getMonth() + 1;
		var y = d.getFullYear();
		var t = $(".dateText");
		if (m < 10) m = '0' + m;
		if (dy < 10) dy = '0' + dy;

		t.html(dy + '.' + m + '.' + y);
	}
}
