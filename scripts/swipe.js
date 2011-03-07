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
			
			// Add scroll indicator
			var mask = $this.parents('.swipeMask');
			
			// If content is small than mask - no need in scroll
			if (mask.height() > $this.height()) return;
			
			var indicator = mask.find('.scrollIndicator');
			if ((typeof(indicator) === 'undefined') || (indicator == null) || (indicator.length == 0)) {
				mask.append('<div class="scrollIndicator"></div>');
				indicator = mask.find('.scrollIndicator');
			}
			indicator.css('left', mask.css('width')); // Set the location of indicator
			
			function updateIndicator()
			{
				// If no indicator - return
				if ((typeof(indicator) === 'undefined') || (indicator == null) || (indicator.length == 0))
					return;
				
				// Get dimentions and update cooridinates
				var dTop = parseInt($this.css('top').replace('px', ''));
				var iTravel = mask.height() - indicator.height() - 30;
				var dTravel = $this.height() - mask.height();
				var ratio = iTravel / dTravel;
				if ((dTop > 0) || (Math.abs(dTop) > Math.abs(dTravel))) return;

				var iTop = Math.round(Math.abs(dTop) * ratio);
				
				indicator.css('top', iTop + "px");
			}

			function updateIndicatorAnimated(offset)
			{	
				var iTop = parseInt(indicator.css('top').replace('px', ''));
				var dTop = parseInt($this.css('top').replace('px', ''));
				var iTravel = mask.height() - indicator.height() - 30;
				var dTravel = $this.height() - mask.height();
				if ((dTop > 0) || (Math.abs(dTop) > Math.abs(dTravel))) return;

				var ratio = iTravel / dTravel;
				var iOffset = Math.round(offset * ratio);
				
				indicator.animate({ top: iTop + iOffset*-1}, 600);
			}
			
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
						updateIndicator();
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
								 updateIndicator();
							} else if (($this.height() + top) <  $this.parent().height()) {
								$this.animate({ top: ($this.height() - $this.parent().height())*-1 }, 600, function(){ settings.callback($this); })
								updateIndicator(($this.height() - $this.parent().height())*-1); 
							} else {
								if (diffY > 0) { 
									$this.animate({ top: top + 100 }, 600, function(){ settings.callback($this); });
									updateIndicatorAnimated(100); 
								} else { 
									$this.animate({ top: top - 100 }, 600, function(){ settings.callback($this); });
									updateIndicatorAnimated(-100); 
								}
							}
						} else if (settings.direction == 'H') {
							// TODO: Add horizontal scrolling support
						}
						
						$('body').attr('scrolled', 'true');
					} else { // restore previous position if movement was small
						if (settings.direction == 'V') {
							$this.animate({ top: top }, 800);
							updateIndicator();
						} else if (settings.direction == 'H') {
							$this.animate({ left: left }, 800);
						}
					}
					
					$(this).unbind();
					$('body').disableSelection();
                });
            });
    	});
	};
})( jQuery );