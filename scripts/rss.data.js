/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 */

/**
 * RSS template data definition
 */
function RSSData() {};

RSSData.Template = {
	"item"  : "<div class=\"rssItem\"  data=\"%####_01%\" title=\"%####_02%\" >%####_00%</div>",
	"itemWImage"  : "<div class=\"rssItemWImage\"  data=\"%####_01%\" title=\"%####_02%\" >%####_00%</div>",
	"itemWDescription"  : "<div class=\"rssItemWDescription\"  data=\"%####_01%\" title=\"%####_02%\" >%####_00%</div>",
	"image" : "<img class=\"rssImage\" src=\"%####_00%\" alt=\"Element Image\" />",
	"title" : "<span class=\"rssItemTitle\">%####_00%</span>",
	"date"  : "<span class=\"rssItemDate\">%####_00%</span>",
	"description" : "<span class=\"rssItemDescription\">%####_00%</span>"
};