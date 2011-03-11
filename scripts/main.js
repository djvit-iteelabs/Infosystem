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
	lastPage: null,
	activePageIndex: null,
	lastActivity: null,
	activityCheckInterval: 10000, // Activity check interval
	lastActivityLimit: 180000, // Last activity in milliseconds (1m)
	activityCheckerEnabled: true,
	eventsAPI: null,
	map: null,
	rss: null,
	quiz: null,
	standbyhand: null,
	osk: null, 
	
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
		this.standbyhand = new standbyHand();
		this.standbyhand.init(10000, 30000, 5000,"easeInOutQuart");
		
		this.showPage('pageLanding');		
				// Initialize date
		//$('span[id*="date"]').text(this.getDateTimeString());
		var timer = new Timer();
		timer.setDate();
				
		//Initialize themesRotator		
		var themes = new themesRotator();
		themes.init(60000);

		chSearchMap.initMap('mapContainer');				
		chLandMap.initMap('mapContainerLand');

		// Initialize On Screen Keyboard
		this.osk = new OSK();
		this.osk.init(chSearchMap.findAddress, 'de');
		
		//Initialize Background SlideShow
		$(document).bgStretcher({
					images: [
							'images/sample-1.jpg', 
							'images/sample-2.jpg', 
							'images/sample-3.jpg', 
							'images/sample-4.jpg'
							],
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
		, this);

	
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
		
		quiz = new QUIZ();
		quiz.init();
		
		// Initialize
		$('#divToggelVids').click(function(){
			var vid = document.getElementById('altstattenVideo');
			$(this).css('-webkit-box-shadow', '0px 0px 0px #000000');
			$(this).bind('webkitTransitionEnd', function(){
				$(this).css('-webkit-box-shadow', '10px 10px 10px #444444').delay(500);
			});
			
			if (!vid.error) {
			
				if (vid.getAttribute('src').indexOf('short') > 0) {
					vid.pause();
					$(this).text('Kurze Version ansehen');
					vid.setAttribute('src', './video/Altstaetten_long.mp4');
					vid.play();
				}
				else {
					vid.pause();
					$(this).text('Lange Version ansehen');
					vid.setAttribute('src', './video/Altstaetten_short.mp4');
					vid.play();
				}
			}
		});
	},
	
	/**
	 * Pages control function
	 */
	showPage: function(pageId) {
		var p = $(this.pages[pageId]);
		this.lastPage = this.activePage; 
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
	
	showMapPage: function(addr) {
		var p = $(this.pages['pageMap']);
		this.lastPage = this.activePage; 
		this.activePage = this.pages['pageMap'];
		var _this = this;
		
		// TODO: Use/Change some animation here
		this.hidePages(function(){
			p.fadeIn(500, function(){
				chSearchMap.findAddress(addr);
			});
		});
		
		// Change Back button bindings
		$('[id*="btn"]').unbind('click');
		$('[id*="btn"]').click(function(){
			_this.hidePages(function() {
				$(_this.lastPage).fadeIn(500, function(){
					_this.activePage = _this.lastPage; 
					$('[id*="btn"]').unbind('click');
					$('[id*="btn"]').click(function() {
						$('.lrSlider').animate({"left": "+=1080px"}, "slow");
						$('[id*="btn"]').unbind('click');
						$('[id*="btn"]').click(function(){
							$(this).parent().effect("shake", {times: 1, direction: 'down', distance: 7 }, 200, function(){
								_this.showPage('pageMain');	
							});
						});
					});
				});
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
	refreshPage: function() {
		// Enable activity checker
		this.lastActivity = null;
		this.lastActivity = new Date();
		this.activityCheckerEnabled = true;

		// Switch to the needed page
		switch(this.activePage.id) {
			
			case 'pageMain':
				// Reset positions
				$('.lrSlider').css('left','0px');
				$('.rssData').css('top', '0px');
				$('.scrollIndicator').css('top', '0px');
				quiz.resetQuiz();
				
				var vidEl = document.getElementById('altstattenVideo');
				if (!vidEl.error) vidEl.pause();
				
				if (this.standbyhand != null) {
					this.standbyhand.kill_timer();
					this.standbyhand = null;
				}
				break;
			
			case 'pageMap':
				chSearchMap.resetMap();
				break;
				
			case 'pageSchedule':
				chLandMap.resetMap(); 
				break;
				
			case 'pageEvents':
				this.rss.updatePageList('pageEvents');
				break;
				
			case 'pageQuiz':
				quiz.resetQuiz();
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
				
			case 'pageVideo':
				var vidEl = document.getElementById('altstattenVideo');
				if (!vidEl.error) {
					vidEl.setAttribute('src', './video/Altstaetten_short.mp4');
					vidEl.play();
				}
				// Disable activity checker
				this.activityCheckerEnabled = false;

				break;	
		}
	},

	/**
	 * Activity monitor callback
	 */
	checkActivity: function(){
		var currDate = new Date();
		var diff = currDate - this.lastActivity;
		if ((this.activityCheckerEnabled == true) && (this.activePage.id != 'pageLanding') && (diff > this.lastActivityLimit)) {
			// Stop videos
			var vidEl = document.getElementById('altstattenVideo');
			if (!vidEl.error) vidEl.pause();
			
			// Reset OSK
			this.osk.hideKeyboard();

			this.showPage('pageLanding');
			$("#bgstretcher").show();
			
			this.standbyhand = new standbyHand();
			this.standbyhand.init(10000, 30000, 5000,"easeInOutQuart");
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
}