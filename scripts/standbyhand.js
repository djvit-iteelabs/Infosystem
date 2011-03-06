/**
 * @author Eugen
 */

function standbyHand(){
};

standbyHand.prototype = {
	sbhContainer : null,
	sbhTimer : null,
	sbhDelay : null,
	sbhGlobalDelay : null,
	sbhMoveTime : null,
	sbhStyle: null,
	
	//i1 - first delay, when the hand moves back
	//i2 - delay before next move
	//i3 - time hand travel
	//p - moves effect
	init : function(i1, i2, i3, p){ 
		var _this = this;
		
		if(parseInt(i1) && (i1 > 1000))
			this.sbhDelay = i1;
		else
			this.sbhDelay = 1000;
		
		if(parseInt(i2) && (i2 > 1000))
			this.sbhGlobalDelay = i2;
		else
			this.sbhGlobalDelay = 1000;

		if(parseInt(i3) && (i3 > 1000))
			this.sbhMoveTime = i3;
		else
			this.sbhMoveTime = 1000;
		
		this.sbhStyle = p;
		
		this.sbhContainer = $('#standbyHand');
		
		this.move_hand();
		
		if (!this.sbhTimer) {
			this.sbhTimer = window.setInterval(function(){
				_this.move_hand();
			}, this.sbhGlobalDelay);
		}
	},
	
	move_hand : function(){
		var _this = this;
		var t = null;
		
		this.sbhContainer.animate({top: "850px"},{queue:false, duration: this.sbhMoveTime, easing: this.sbhStyle}).
						  animate({left:"485px"},{queue:false, duration: this.sbhMoveTime, easing: this.sbhStyle}).
						  animate({opacity:"1"},{queue:false, duration: this.sbhMoveTime, easing: this.sbhStyle,
						  complete: function(){
						  	$(this).css("background", "url(../images/hand.red.png)");
						  }});
						  				  
		window.setTimeout(function(){
			_this.default_position();
			_this.sbhContainer.css("background", "url(../images/standby.hand.png)");
		},this.sbhDelay);
	},
	
	default_position : function(){
		this.sbhContainer.animate({top: "1920px"},{queue:false, duration: this.sbhMoveTime, easing: this.sbhStyle}).
						  animate({left:"1080px"},{queue:false, duration: this.sbhMoveTime, easing: this.sbhStyle}).
						  animate({opacity:"0"},{queue:false, duration: this.sbhMoveTime, easing: this.sbhStyle,
						  complete: function(){
						  	$(this).css("background", "url(../images/standby.hand.png)");
						  }});
	},
	
	kill_timer : function(){
		window.clearInterval(this.sbhTimer);
		this.sbhTimer = null;
	}
}
