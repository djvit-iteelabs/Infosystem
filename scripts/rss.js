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
	
	getList: function(rssUrl, targetContainer, count) {
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
				var data = link.substring(link.indexOf('info_id=') + 8, link.length);
	 
				// Build HTML output based on the template
				var htmlItem = '';
				if ( (typeof(image) !== 'undefined') && (image != null) && (image != '') ) {
					htmlItem += RSSData.image.replace('%####%', image);
				}
				htmlItem += RSSData.title.replace('%####_00%', title);
				htmlItem += RSSData.date.replace('%####_00%', pubDate);
				htmlItem += RSSData.description.replace('%####_00%', description);
				htmlItem = RSSData.item.replace('%####_00%', htmlItem);
				htmlItem = htmlItem.replace('%####_01%', data);
	 
				// Put that feed content on the screen!
				$(targetContainer).append($(htmlItem));
				
				// Append only given number of records
				if (index > count) return;
			});
			
			$('.rssItem').click( function(){
				RSS.getDetails(this, function(content){
					alert('CALLBACK - ' + content);
				});
			}); 
		});
	},
	
	getDetails: function(elm, callback) {
		var id = $(elm).attr('data'); 
		$.ajax({
			url: 'data/' + id + '.data',
			success: function(data) {
				callback(data);
			},
			error: function(xhr, msg, error) {
				//TODO: Provide styles error message/notification
				alert(msg + '\n\n\n' + error);		
			}
		});
		
		return ;
	}
}