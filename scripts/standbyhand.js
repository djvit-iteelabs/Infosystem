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
	init : function(i1,i2,i3,p){ 
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
			this.sbhTimer = window.setInterval(function(){_this.move_hand();}, this.sbhGlobalDelay);
		}
		else {
			window.clearInterval(this.sbhTimer);
			this.sbhTimer = null;
		}		
	},
	
	move_hand : function(){
		var _this = this;
		
		this.sbhContainer.css("background", "url(./images/standby.hand.png)");
		
		this.sbhContainer.animate({
			marginLeft: "-=210px",
			marginTop: "-=500px",
			opacity: "toggle"
		},this.sbhMoveTime,this.sbhStyle,function(){
			_this.sbhContainer.css("background", "url(./images/hand.red.png)");}).
			delay(this.sbhDelay).animate({
				marginLeft: "+=210px",
				marginTop: "+=500px",
				opacity: "toggle"
			}, this.sbhMoveTime);
	}
}
