/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 * @uses jQuery 1.4.2
 * @uses rss.data.js
 */

function RSS(){
};

/**
 * RSS parser global singleton object
 * @param {Object} rssUrl
 */
RSS.prototype  = {
	template: null,
	rssSrcList: null,
	infoSys : null,
	
	/**
	 * Initializes RSS processor
	 * @param {Object} list
	 */
	init: function(list, is){
		this.rssSrcList = list;
		this.infoSys = is;

		// Bind the events
		this.bindEvents();
	},
	
	/**
	 * Updates page content with latest RSS data
	 * @param {Object} page
	 */
	updatePageList: function(page) {
		this.resetPanels();
		var rssData = this.rssSrcList[page];
		this.getList(rssData.src, rssData.target, rssData.layout, 20);
	},
	
	updatePageContent: function(page)
	{
		this.resetPanels();
		var rssData = this.rssSrcList[page];
		if (rssData.layout == "details") {
			this.getRSSContent(rssData.src, function(){
				$(rssData.target).html(RSSData.Detail);
				$(rssData.target).swipe();
			});
		}
	},
	
	/**
	 * bindEvents - registers RSS events
	 */
	bindEvents: function(context){
		var _this = this;
		// Back to List event handler
		$('.buttonToList').click(function(){
			$('div[class*="lrSlider"]').animate({"left": "+=1080px"}, "slow");

			// Restore bottom back button function
			$('[id*="btn"]').unbind('click');
			$('[id*="btn"]').click(function(){
				$(this).parent().effect("shake", {times: 1, direction: 'down', distance: 7 }, 200, function(){
					_this.infoSys.showPage('pageMain');	
				});
			});
		});
	},
	
	/**
	 * Reads RSS data and injects HTML content
	 * @param {Object} rssUrl
	 * @param {Object} targetContainer
	 * @param {Object} count
	 */
	getList: function(rssUrl, targetContainer, rssListLayout, rssSourceVar, count) {
		var _this = this;
		// Get the RSS content
		// $('body').append('<div style="display:none;" id="rss_dataContainer"></div>');
		_this.getRSSContent(rssUrl, function() {
			$('body').append('<div id="div_Rss_Content_Container" style="display:none;">' + RSSData.Content + '</div>');
			
			// Find each 'item' in the file and parse it
			$(targetContainer).find('#divItemsList').html('');
			$('#div_Rss_Content_Container').find('item').each( function(index) {
				// Fetch title, URL, description and publication date
				var $item = $(this);
				var title = $item.find('title').text();
				var image = $item.attr('image');
				var link  = $item.attr('rdf:about');
				var description = $item.find('description').text();
				description = description.replace(/\n/gi, '<br />');
				var pubDate = $item.find('date').html();
				var pubDateHr = '';
				if ((pubDate.indexOf('<br>') > 0) && (typeof(pubDate) !== 'undefined') && (pubDate != null) && (pubDate != '')) {
					pubDateHr = pubDate.substring(pubDate.indexOf('<br>') + 4, pubDate.length);
					pubDate = pubDate.substring(0, pubDate.indexOf('<br>'));
					pubDateHr = '<span>' + pubDateHr + '</span>';
					pubDate = pubDate + '<br>' + pubDateHr;
				}
				
				var startIdx = link.indexOf('_id=') + 4;
				var endIdx = link.indexOf('&', startIdx);
				if (endIdx < 0) endIdx = link.length;
				var data = link.substring(startIdx, endIdx);
	 
				// Build HTML output based on the template
				var htmlItem = '';
				if ( (typeof(image) !== 'undefined') && (image != null) && (image != '') ) {
					htmlItem += RSSData.Template.image.replace('%####_00%', image);
				}
				if ((typeof(pubDate) !== 'undefined') && (pubDate != null) && (pubDate != '')) {
					htmlItem += RSSData.Template.date.replace('%####_00%', pubDate);
				}

				htmlItem += RSSData.Template.title.replace('%####_00%', title);

				if ((typeof(description) !== 'undefined') && (description != null) && (description != '')) {
					htmlItem += RSSData.Template.description.replace('%####_00%', description);
				}
				
				if (rssListLayout == 'date-title') {
					htmlItem = RSSData.Template.item.replace('%####_00%', htmlItem);
				} else if (rssListLayout == 'picture-title') {
					htmlItem = RSSData.Template.itemWImage.replace('%####_00%', htmlItem);
				} else if (rssListLayout == 'title-description') {
					htmlItem = RSSData.Template.itemWDescription.replace('%####_00%', htmlItem);
				}
				htmlItem = htmlItem.replace('%####_01%', data);
				htmlItem = htmlItem.replace('%####_02%', title);
	 
				// Put that feed content on the screen!
				$(targetContainer).find('#divItemsList').append($(htmlItem));
				
				// Append only given number of records
				if (index > count) return;
			});
			
			// Nav to details handler
			$('[data]').click( function() {
				//var scr = $('body').attr('scrolled'); 
				//if (scr == 'true') return false;
				var detailsUrl = 'data/' + $(this).attr('data') + '.data'; 
				var clickElm = $(this);
				
				// Save data
				_this.infoSys.database.addRecord(_this.infoSys.getDateTimeString(), 
												 _this.infoSys.activePage.id, 
												 clickElm.attr('title'));
				
				_this.getRSSContent(detailsUrl, function(){
					$(targetContainer).parent().find('#rssDetailTitle').html(clickElm.attr('title'));
					$(targetContainer).parent().find('#rssDetailTarget').html(RSSData.Detail);
					$(targetContainer).parent().find('#rssDetailTarget').css('top', '0px');
					$(targetContainer).parent().find('#rssDetailTarget').find('table').removeAttr('width');
					
					// Remove not needed content
					//$(targetContainer).parent().find('.rssData table').last().html('');
					$(targetContainer).parent().find('div span').css('font-size', '');
					$(targetContainer).parent().find('tr td img').css('width', '180px').css('height', 'auto');
					$('td').prepend('<br>');
					
					// Remove links to PDFs
					$(targetContainer).parent().find('a').each(function() {
						if ($(this).text().indexOf('.pdf') > 0) {
							$(this).parent().html('');
						}
					});
					
					// Remove Zur Übersicht
					$(targetContainer).parent().find('table').each(function() {
						if ($(this).text().indexOf('zur Übersicht') > 0) {
							$(this).html('');
						}
					});
					
					// Remove extra <BR> before tables (Events category)
					$(targetContainer).find('table').each(function() {
						if ($(this).prev().is('br')) {
							$(this).prev().html('');
						}
					});
					
					// Update address if present
					_this.processAddress(targetContainer);
					
					// Change "back" button handler
					$('[id*="btn"]').unbind('click');
					$('[id*="btn"]').click(function(){
						$('[id*="btn"]').unbind('click');
						
						$(this).parent().effect("shake", {times: 1, direction: 'down', distance: 7 }, 200, function(){
							$('div[class*="lrSlider"]').animate({"left": "+=1080px"}, "slow");
							setTimeout(function() {
								$('[id*="btn"]').click(function(){
									$(this).parent().effect("shake", {times: 1, direction: 'down', distance: 7 }, 200, function(){
										_this.infoSys.showPage('pageMain');	
									});
								});
							}, 2000);
						});
					});
					
					// Bind Swipe handlers
					$(targetContainer).parent().find('#rssDetailTarget').swipe();
					
					// Show details animated
					$('div[class*="lrSlider"]').animate({'left': '-=1080px'}, 'slow');
				});
			});
			
			// Cleanup DOM containers
			var old = document.getElementById('div_Rss_Content_Container');  
	        if (old != null) {  
	             old.parentNode.removeChild(old);  
	             delete old;  
	        }
			
			// Bind Swipe handlers
			$(targetContainer).find('#divItemsList').swipe();
		});
	},
	
	getRSSContent: function(url, callback) {
	    var randomnumber = Math.floor(Math.random()*1000001);
		url += '?r=' + randomnumber;
		if (jQuery.support.scriptEval) { 
	        var old = document.getElementById('div_Rss_Processor_Container');  
	        if (old != null) {  
	             old.parentNode.removeChild(old);  
	             delete old;  
	        } 
	        
			var head = document.getElementsByTagName('head')[0]; 
	        var script = document.createElement('script');
	        script.id = 'div_Rss_Processor_Container';
	        script.type = 'text/javascript';
	        script.onload = callback; 
	        script.src = url; 
	        head.appendChild(script);  
	    } else {
	       $.getScript(url, function(){
	            callback();
	      });
		}
	},
	
	getDetails: function(elm, callback) {
		var id = $(elm).attr('data'); 
		$.ajax({
			url: 'data/' + id + '.data',
			success: function(data) {
				callback(elm, data);
			},
			error: function(xhr, msg, error) {
				//TODO: Provide styles error message/notification
				//alert('RSS Content not found');		
			}
		});
		
		return ;
	},
	
	processAddress: function(elm) {
		var _this = this;
		$(elm).find('td').each(function(){
			if ($(this).text() == 'Adresse') {
				$(this).next().children('br').each(function() {
					$(this).html('<br> &nbsp;');
				});

				var addr = $(this).next().text();

				//$(elm).find('.divListTitle').append('<div address="' + addr + '" class="gotoMap">Zur Karte</div>');
				$(this).next().append('<div address="' + addr + '" class="gotoMap"><img src="./images/marker.36.png" alt="Zur Karte"/>&nbsp;&nbsp;Zur Karte</div>');
				$('.gotoMap').click(function() {
					var btn = $(this);
					btn.css('-webkit-box-shadow', '0px 0px 0px #000000');
					btn.bind('webkitTransitionEnd', function(){
						btn.css('-webkit-box-shadow', '10px 10px 10px #444444').delay(500);
					});
					setTimeout(function() {
						_this.infoSys.showMapPage(addr);	
					}, 500);
				});
			}
		});
		//Auf der karte anzeigen
	},
	
	resetPanels: function() {
		$('div[class*="lrSlider"]').css('left', '0px');
	}
}