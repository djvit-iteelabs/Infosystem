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
			$('.lrSlider').animate({"left": "+=1080px"}, "slow");
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
			$('#div_Rss_Content_Container').find('item').each( function(index) {
				// Fetch title, URL, description and publication date
				var $item = $(this);
				var title = $item.find('title').text();
				var image = $item.attr('image');
				var link  = $item.attr('rdf:about');
				var description = $item.find('description').text();
				description = description.replace(/\n/gi, '<br />');
				var pubDate = $item.find('date').html();
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
				var scr = $('body').attr('scrolled'); 
				if (scr == 'true') return false;
				var detailsUrl = 'data/' + $(this).attr('data') + '.data'; 
				var clickElm = $(this);
				_this.getRSSContent(detailsUrl, function(){
					$(targetContainer).parent().find('#rssDetailTitle').html(clickElm.attr('title'));
					$(targetContainer).parent().find('#rssDetailTarget').html(RSSData.Detail);
					$(targetContainer).parent().find('#rssDetailTarget').css('top', '0px');
					$(targetContainer).parent().find('#rssDetailTarget').find('table').removeAttr('width');
					// Bind Swipe handlers
					$(targetContainer).parent().find('#rssDetailTarget').swipe();
					
					// Remove not needed content
					$(targetContainer).parent().find('.rssData table').last().html('');
					$(targetContainer).parent().find('div span').css('font-size', '');
					$('td').prepend('<br>');
					
					// Show details animated
					$('.lrSlider').animate({'left': '-=1080px'}, 'slow');
					
					// Change "back" button handler
					$('[id*="btn"]').unbind('click');
					$('[id*="btn"]').click(function(){
						$('.lrSlider').animate({"left": "+=1080px"}, "slow");
						$('[id*="btn"]').unbind('click');
						$('[id*="btn"]').click(function(){
							$(this).parent().effect("shake", {times: 1, direction: 'down', distance: 7 }, 200, function(){
								_this.infoSys.showPage('pageMain');	
							});
						});
					});
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
	
	resetPanels: function() {
		$('.lrSlider').css('left', '0px');
	}
}