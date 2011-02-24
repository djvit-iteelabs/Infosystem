/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 * @uses jQuery 1.4.2
 * @uses rss.template.js
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
	
	init: function(list){
		this.rssSrcList = list;
		
		for(var r in this.rssSrcList) {
			var rssData = this.rssSrcList[r];
			this.getList(rssData.src, rssData.target, 20);
		}
		
		// Bind the events
		this.bindEvents();
	},
	
	/**
	 * bindEvents - registers RSS events
	 */
	bindEvents: function(context){
		// Back to List event handler
		$('.buttonToList').click(function(){
			$('.rssSlider').animate({"left": "+=1080px"}, "slow");
		});	},
	
	/**
	 * Reads RSS data and injects HTML content
	 * @param {Object} rssUrl
	 * @param {Object} targetContainer
	 * @param {Object} count
	 */
	getList: function(rssUrl, targetContainer, count) {
		var _this = this;
		// Get the RSS content
		$.get(rssUrl, function(data) {

			// Find each 'item' in the file and parse it
			$(data).find('item').each( function(index) {
				
				// Fetch title, URL, description and publication date
				var $item = $(this);
				var image = $item.find('image').text();
				var title = $item.find('title').text();
				var link  = $item.attr('rdf:about');
				var description = $item.find('description').text();
				description = description.replace(/\n/gi, '<br />');
				var pubDate = $item.find('date').text();
				var data = link.substring(link.indexOf('_id=') + 4, link.length);
	 
				// Build HTML output based on the template
				var htmlItem = '';
				if ( (typeof(image) !== 'undefined') && (image != null) && (image != '') ) {
					htmlItem += RSSData.image.replace('%####%', image);
				}
				htmlItem += RSSData.date.replace('%####_00%', pubDate);
				htmlItem += RSSData.title.replace('%####_00%', title);
				//htmlItem += RSSData.description.replace('%####_00%', description);
				htmlItem = RSSData.item.replace('%####_00%', htmlItem);
				htmlItem = htmlItem.replace('%####_01%', data);
				htmlItem = htmlItem.replace('%####_02%', title);
	 
				// Put that feed content on the screen!
				$(targetContainer).append($(htmlItem));
				
				// Bind events
				$('[data="' + data + '"]').click(function() {
					_this.getDetails($(this), function(elm, content){
						$('#rssDetailTitle').html($(elm).attr('title'));
						$(targetContainer).parent().next().children('#rssDetailTarget').html(content);
						$('.rssSlider').animate({"left": "-=1080px"}, "slow");
					});
				});
				
				// Append only given number of records
				if (index > count) return;
			});
		});
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
				alert('RSS Content not found');		
			}
		});
		
		return ;
	},
	
	resetPanels: function() {
		$('.rssSlider').css('left', '0px');
	}
}