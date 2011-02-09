/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 * @uses jQuery 1.4.2
 * @uses rss.template.js
 */

/**
 * RSS parser global singleton object
 * @param {Object} rssUrl
 */
var RSS = {
	template: null,
	
	getHTML: function(rssUrl) {
		var htmlResult = '';
		// Get the RSS content
		$.get(rssUrl, function(data) {

			// Find each 'item' in the file and parse it
			$(data).find('item').each(function() {
				// Name the current found item  and fetch title, URL, description and publication date
				var $item = $(this);
				var title = $item.find('title').text();
				var link = $item.find('link').text();
				var description = $item.find('description').text();
				var pubDate = $item.find('pubDate').text();
	 
				// Build HTML output based on the template
				var htmlItem = "<div class=\"entry\"><h2 class=\"postTitle\">" + title + "<\/h2>";
	 
				//put that feed content on the screen!
				$('#feedContent').append($(html));  
			});
		});
		
	}
}