/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 * @extends jQuery 1.4.2
 * @uses jGesture 1.0.3
 */

// Extend jQuery to bind Swipe event handling to the particular element
(function( $ ) {

	$.fn.swipe = function( options ) {  

	    var settings = {
	      'direction' : 'V', // V || H
	      'threshold' : '20',
		  'callback' : function(){ /*alert('Swipe completed callback')*/} 
	    };
		var downX, upX, downY, upY, origX, origY, mDown;
	
	    return this.each(function() {        
			// If options exist, lets merge them with our default settings
			if ( options ) { 
				$.extend( settings, options );
			}
			
			// This reference for chainability
			var $this = $(this);
			
			// Bind a gesture handler
			$this.bind('mousedown', function (e) {
				$('body').attr('scrolled', 'false');
				mDown = true;
				e.stopPropagation();
				downX = e.originalEvent.pageX;
				downY = e.originalEvent.pageY;
                upX = downX;
				upY = downY;
				origX = downX;
				origY = downY;
                
				// Bind movement events
				$('body').unbind();
                $('body').bind('mousemove', function (e) {
					if (mDown == false) return false; // If mouse is not pressed - just ignore movement
					
                    e.preventDefault(); // Prevent default scrolling
                    
					// Calculate offset
					var diffX = e.originalEvent.pageX - upX;
					var diffY = e.originalEvent.pageY - upY;
                    var left = parseInt($this.css('left').replace('px', ''));
					var top = parseInt($this.css('top').replace('px', ''));
                    
					// Move the target element
					if (settings.direction == 'V') {
						$this.css('top', top + diffY);	
					} else if (settings.direction == 'H') {
						$this.css('left', left + diffX);	
					}
					
                    upX = e.originalEvent.pageX;
					upY = e.originalEvent.pageY;
                });
				
				// Bind drag-end event
                $('body').bind('mouseup', function (e) {
					e.stopPropagation();
					mDown = false;
					$('body').unbind();
					var diffX = e.originalEvent.pageX - origX;
					var diffY = e.originalEvent.pageY - origY;
                    var left = parseInt($this.css('left').replace('px', ''));
					var top = parseInt($this.css('top').replace('px', ''));

					if ((Math.abs(diffX) > settings.threshold) || (Math.abs(diffY) > settings.threshold)) {
		
						
						// Move / Restore original position if exceeded limits
						if (settings.direction == 'V') {
							if (top > 0 ) {
								 $this.animate({ top: 0 }, 800, function(){ settings.callback($this); });
							} else if (($this.height() + top) <  $this.parent().height()) {
								$this.animate({ top: ($this.height() - $this.parent().height())*-1 }, 800, function(){ settings.callback($this); }) 
							} else {
								if (diffY > 0) { 
									$this.animate({ top: top + 100 }, 600, function(){ settings.callback($this); }); 
								} else { 
									$this.animate({ top: top - 100 }, 600, function(){ settings.callback($this); }); 
								}
							}
						} else if (settings.direction == 'H') {
							// TODO: Add horizontal scrolling support
						}
						
						$('body').attr('scrolled', 'true');
					} else { // restore previous position if movement was small
						if (settings.direction == 'V') {
							$this.animate({ top: top }, 800);
						} else if (settings.direction == 'H') {
							$this.animate({ left: left }, 800);
						}
					}
					
					$(this).unbind();
                });
            });
    	});
	};
})( jQuery );