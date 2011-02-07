/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 * @uses jQuery 1.4.2
 */

/**
 * InfoSystem class constructor
 */
function InfoSystem(){
};

/**
 * InfoSystem class definition
 */
InfoSystem.prototype = {
	pages: [{}],
	activePage: null,	
	activePageIndex: null,
	lastActivity: null,
	activityCheckInterval: 30000, // Activity check interval
	lastActivityLimit: 300000, // Last activity in milliseconds (5m)
	eventsAPI: null,
	
	init: function() {
		var _this = this; // Closure reference

		// Initialize pages
		this.pages = new Array();
		var infoPages = $('div[id*="page"]');
	    for (var i = 0; i < infoPages.length; i++) {
			var p = infoPages[i];
			
			// Initialize a page
			// TODO: Add transition effects definition for each page
			
			// Store page - key = ID of the page
			this.pages[p.id] = p;
			$(p).css('display', 'none');
		}
		
		this.showPage('pageLanding');
		
		// Initialize menu items and their events
		var catItems = $('div[id*="cat"]');
		for (var i = 0; i < catItems.length; i++) {
			$(catItems[i]).click(function(){
				_this.showPage($(this).attr('page'));				
			});
		}
		
		// Register events
		// Any "body" event resets the last activity time
		$('body').click(function(){
			_this.lastActivity = new Date();
		});
		
		// StandBy page click/touch - moves to the Main/Menu page  
		$(this.pages['pageLanding']).click(function(){
			_this.showPage('pageMain');
		});
		
		// Start activity monitor
		setInterval(function(){_this.checkActivity()}, this.activityCheckInterval);
		
		// Initialize Scrollers
		/*var pane = $('.scroll-pane');
		pane.jScrollPane(
			{
				showArrows: true,
				animateScroll: true
			}
		);
		this.eventsAPI = pane.data('jsp'); */
	},
	
	/**
	 * Pages control function
	 */
	showPage: function(pageId) {
		var p = $(this.pages[pageId]);
		this.activePage = this.pages[pageId];
		var _this = this;
		
		// TODO: Use/Change some animation here
		this.hidePages(function(){
			p.fadeIn(500, function(){
				if (pageId == 'pageEvents') {
					$('.scroll-pane').jScrollPane();
				}
			});
		});
	},
	
	hidePage: function(pageId) {
		var p = $(this.pages[pageId]);
			
		p.fadeOut(500);
	},

	hidePages: function(callback) {
		var flag = false;
		for (var p in this.pages) {
			var page = $(this.pages[p]);
			if (page.css('display') != 'none') {
				flag = true;
				page.fadeOut(500, function(){
					//page.css('display', 'none');
					callback();
					
					return;
				});
			} 
		} 
		
		// If no pages found - still launch a callback
		if (flag == false) {
			callback();
		}
	},

	checkActivity: function(){
		var currDate = new Date();
		var diff = currDate - this.lastActivity;
		if ( (this.activePage.id != 'pageLanding') && (diff > this.lastActivityLimit)) {
			this.showPage('pageLanding');
		}
	},
// Swipe Setup function - iPhone
/*function setSwipe(div, callback) {
    div.bind('touchstart', function (e) {
        down_x = e.originalEvent.touches[0].pageX;
        up_x = down_x;
        $("body").unbind();
        $("body").bind('touchmove', function (e) {
            e.preventDefault();
            var diff = e.originalEvent.touches[0].pageX - up_x;
            var left = parseInt(div.css('left').replace('px', ''));
            div.css('left', left + diff);
            up_x = e.originalEvent.touches[0].pageX;
        });
        $("body").bind('touchend', function (e) {
            callback();
            $(this).unbind();
        });
    }); */
}