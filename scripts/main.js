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
	activityCheckInterval: 10000, // Activity check interval
	lastActivityLimit: 10000, // Last activity in milliseconds (1m)
	eventsAPI: null,
	map: null,
	rss: null,
	
	init: function() {
		var _this = this; // Closure reference
		
		// Disable text selections
		$('body').disableSelection();

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
		
		// Initialize Stand By screen animation
		var standbyhand = new standbyHand();
		standbyhand.init(5000, 15000, 3000,"easeInOutQuart");
		
		this.showPage('pageLanding');		
				// Initialize date
		//$('span[id*="date"]').text(this.getDateTimeString());
		var timer = new Timer();
		timer.setDate();
				
		//Initialize themesRotator		
		var themes = new themesRotator();
		themes.init(60000);
				
		chLandMap.initMap('mapContainerLand');

		// Initialize On Screen Keyboard
		var osk = new OSK();
		osk.init(chSearchMap.findAddress, 'de');
		
		//Initialize Background SlideShow
		$(document).bgStretcher({
					images: [
							'images/sample-1.jpg', 
							'images/sample-2.jpg', 
							'images/sample-3.jpg', 
							'images/sample-4.jpg'],
					slideShowSpeed: 5000,
					nextSlideDelay: 10000
				});

		// Initialize RSS readers
		this.rss = new RSS();
		this.rss.init(
			{"pageNews": {
				"src": "data/news.rss",
				"target": "#rssNews",
				"layout": "date-title"
			}, 
			"pageEvents": {
				"src": "data/events.rss",
				"target": "#rssEvents",
				"layout": "date-title"
			}, 
			"pageTourism": {
				"src": "data/tourism.rss",
				"target": "#rssTourism",
				"layout": "picture-title"
			}, 
			"pageHotels": {
				"src": "data/hotels.rss",
				"target": "#rssHotels",
				"layout": "title-description"
			}, 
			"pageRestaurants": {
				"src": "data/restaurants.rss",
				"target": "#rssRestaurants",
				"layout": "title-description"
			},
			"pageWeather": {
				"src": "data/weather.data",
				"target": "#divWeatherContent",
				"layout": "details"
			}}
		);


/*		
		// Weather data
		this.rss.getDetails($('#divWeatherContent'), function(elm, content){
			$(elm).html(content);
		});
		
		// Quiz Data
		this.rss.getDetails($('#divQ1Content'), function(elm, content){
			$(elm).html(content);
		});
		this.rss.getDetails($('#divQ2Content'), function(elm, content){
			$(elm).html(content);
		});
		this.rss.getDetails($('#divQ3Content'), function(elm, content){
			$(elm).html(content);
		});
		this.rss.getDetails($('#divQ4Content'), function(elm, content){
			$(elm).html(content);
		});
		this.rss.getDetails($('#divQ5Content'), function(elm, content){
			$(elm).html(content);
		});
*/	
		/////////////////////////////////////////
		// Initialize menu items and their events
		var catItems = $('div[id*="cat"]');
		for (var i = 0; i < catItems.length; i++) {
			$(catItems[i]).click(function(){
				var _targetElement = this;
				$(_targetElement).children().hide( "puff", { }, 500, function(){
					_this.showPage($(_targetElement).attr('page'));
					} );				
			});
		}
		// Init video page link
		$("#videoLink").click(function(){
				_this.showPage($(this).attr('page'));
		});
		
		// Register events
		// Any "body" event resets the last activity time
		$(document).click(function(){
			_this.lastActivity = null;
			_this.lastActivity = new Date();
			$("#bgstretcher").hide();
		});
		
		// StandBy page click/touch - moves to the Main/Menu page  
		$(this.pages['pageLanding']).click(function(){
			_this.showPage('pageMain');
		});
		
		// Start activity monitor
		setInterval(function() { 
			_this.checkActivity();
		}, this.activityCheckInterval);
		
		// Intialize buttons
		$('[id*="btn"]').click(function(){
			//$('body').trigger('showPageMain');
			$(this).parent().effect("shake", {times: 1, direction: 'down', distance: 7 }, 200, function(){
				_this.showPage('pageMain');	
			});
			
		});
		
		// Bind Swipe handlers
		$('.rssData').swipe({'callback' : function(elm){
			alert(elm);
		}});
		
		// Quiz events
		$('.buttonToList').click(function(){
			$('.lrSliderQuiz').animate({"left": "+=1060px"}, "slow");
		});

		$('.buttonToNext').click(function(){
			$('.lrSliderQuiz').animate({"left": "-=1060px"}, "slow");
		});
		
		// Schedule items clicks
		$('.scheduleItems .scheduleItem').click( function(){			
			var _clicked = $(this);
			var txt = $(this).children('.scheduleText').text();

			var x = $(this).children('.scheduleText').attr('x');
			var y = $(this).children('.scheduleText').attr('y');
			var cssShadow = $(this).css('-webkit-box-shadow');
			_clicked.css('-webkit-box-shadow', '0px 0px 0px #000000');
			_clicked.bind('webkitTransitionEnd', function(){
				_clicked.css('-webkit-box-shadow', '10px 10px 10px #444444').delay(500);
			});
			
			chLandMap.setStation(x, y, txt);
		});

		$("#zoomOutLand").click(function(){
			$(this).children().hide("puff",{},500);
			chLandMap.map.zoom(-1);
		});
		$("#zoomInLand").click(function(){
			$(this).children().hide("puff",{},500);
			chLandMap.map.zoom(1);
		});
		$("#zoomOut").click(function(){
			$(this).children().hide("puff",{},500);
			chSearchMap.map.zoom(-1);
		});
		$("#zoomIn").click(function(){
			$(this).children().hide("puff",{},500);
			chSearchMap.map.zoom(1);
		});
		
		$("#homeLand").click(function(){
			$(this).children().hide("puff",{},500);
			chLandMap.resetMap();	
		});
		
		$("#satLand").click(function(){
			$(this).children().hide("puff",{},500);
			chLandMap.satView();	
		});

		$("#roadLand").click(function(){
			$(this).children().hide("puff",{},500);
			chLandMap.streetView();	
		});

		$("#homeMap").click(function(){
			$(this).children().hide("puff",{},500);
			chSearchMap.resetMap();
		});	
		
		$("#satMap").click(function(){
			$(this).children().hide("puff",{},500);
			chSearchMap.satView();	
		});

		$("#roadMap").click(function(){
			$(this).children().hide("puff",{},500);
			chSearchMap.streetView();	
		});
		
	},
	
	/**
	 * Pages control function
	 */
	showPage: function(pageId) {
		var p = $(this.pages[pageId]);
		this.activePage = this.pages[pageId];
		var _this = this;
		
		// Reset button glow/shadow
		//$('span[id*="btn"]').css('-webkit-box-shadow', '0px 0px 0px #000000');
		
		// TODO: Use/Change some animation here
		this.hidePages(function(){
			//_this.refreshPage();
			//p.show("slide",{},"slow",function(){_this.refreshPage();});
			p.fadeIn(500, function(){
				_this.refreshPage();
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
				});
				
				return;
			} 
		} 
		
		// If no pages found - still launch a callback
		if (flag == false) {
			callback();
		}
	},
	
	/**
	 * Refreshes DOM/Layout of currently active page
	 */
	refreshPage: function(){
		switch(this.activePage.id) {
			case 'pageMap':
				chSearchMap.initMap('mapContainer');
				break;
				
			case 'pageSchedule':
				chLandMap.initMap('mapContainerLand'); 
				break;
				
			case 'pageEvents':
				this.rss.updatePageList('pageEvents');
				break;
				
			case 'pageQuiz':
				// TODO: add Quiz Page Refresh to the beginning
				break;
				
			case 'pageTourism':
				this.rss.updatePageList('pageTourism');
				break;
				
			case 'pageHotels':
				this.rss.updatePageList('pageHotels');
				break;
				
			case 'pageRestaurants':
				this.rss.updatePageList('pageRestaurants');
				break;
				
			case 'pageWeather':
				this.rss.updatePageContent('pageWeather');
				break;
				
			case 'pageNews':
				this.rss.updatePageList('pageNews');
				break;	
		}
	},

	/**
	 * Activity monitor callback
	 */
	checkActivity: function(){
		var currDate = new Date();
		var diff = currDate - this.lastActivity;
		if ( (this.activePage.id != 'pageLanding') && (diff > this.lastActivityLimit)) {
			this.showPage('pageLanding');
			$("#bgstretcher").show();
		}
	},
	
	/**
	 * Returns formatted current Date string
	 */
	getDateString: function() {
		var date = new Date();
		var dt = date.getDate();
		var mn = date.getMonth();
		var yr = date.getFullYear();
		
		return dt + '/' + mn + '/' + yr;
	},
	
	/**
	 * Returns formatted current Time string
	 */
	getTimeString: function(){
		var time = new Date();
		var hr = time.getHours();
		var min = time.getMinutes();
		if (min < 10) min = "0" + min;

		var sec = time.getSeconds();
		
		return hr + ':' + min;
	},
	
	/**
	 * Returns formatted current Date and Time string
	 */
	getDateTimeString: function(){
		return this.getDateString() + ' ' + this.getTimeString();		
	}
	

	
	
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