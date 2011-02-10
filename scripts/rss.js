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
	
	getList: function(rssUrl, count) {
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
		
	},
	
	getDetails: function(id) {
		return "<br><!-- start contents --><h2>Baumschneidekurs am 19. Februar 2011</h2><p>  <b>Seit vielen Jahren gibt die Stadt Altstätten Hochstamm-Obstbäume vergünstigt ab. Auch 2011 ist wiederum eine „Baumaktion“ vorgesehen. Damit die Jungbäume fachgerecht und regelmässig gepflegt werden, bietet die Stadt Altstätten am 19. Februar 2011 einen Baumschneidekurs an. Dieses Jahr werden insbesondere Informationen zum Schneiden von Beerengehölzen sowie Spalier- und Niederstammbäumen vermittelt.</b></p> Seit einigen Jahren führt die Stadt Altstätten jährlich den beliebten Baumschneidekurs durch. Die Baumschneidekurse sind in Anlehnung an die durchgeführten Hochstamm-Obstbaumaktionen eingeführt worden. Auch in diesem Jahr wird wieder eine Baumaktion durchgeführt.<br> <br> <b>Hochstamm-Obstbaumaktion<br> </b>Ab sofort können bei der Stadtverwaltung Hochstamm-Obstbäume zum verbilligten Preis von 30 Franken pro Baum bestellt werden. Bestellformulare können beim Frontoffice (Telefon 071 757 77 20) bzw. beim Bauamt der Stadt Altstätten (Telefon 071 757 77 83) bezogen werden. Bezugsberechtigt sind Personen mit Wohnsitz in der Politischen Gemeinde Altstätten<br> <br> <b>Obstbaum-Schnittkurs in Lüchingen<br> </b>Ebenso wichtig wie die Pflanzung junger Obstbäume ist auch die regelmässige und fachgerechte Pflege. Aus diesem Grunde bietet die Stadt Altstätten am Samstag, 19. Februar 2011, von 13.30 bis zirka 16.00 Uhr, bei der Obst- und Beerenanlage von Peter Eugster, im Gehrenhof 6, Lüchingen, einen Obstbaum-Schnittkurs an. Auch zum Thema Beerengehölze, Spalier- und Niederstammbäume werden an diesem Nachmittag Infos und Tipps vermittelt. Kursleiter sind Florian Vetsch, Grabs, und Peter Lippus, Widnau.<br> <br> <b>Kursinhalt<br> </b>Das Ziel des Kurses besteht darin, Grundwissen für das richtige Schneiden der Bäume und der Beerengehölze zu vermitteln. Auch wertvolle Tipps zur fachgerechten Pflanzung von Jungbäumen und Pflanzen werden von den Kursleitern abgegeben. Die Pflegeschnitte erfolgen durch die Kursleiter unter Einbezug der Kursteilnehmenden.<br> <br> <b>Anmeldungen<br> </b>Die Stadt Altstätten lädt interessierte Personen ein, den Kurs zu besuchen und freut sich auf einen interessanten und abwechslungsreichen Kursnachmittag. Anmeldungen sind bis 17. Februar 2011 an Markus Stieger, Bauamt (Telefon 071 757 77 83 oder E-Mail <u> markus.stieger@altstaetten.ch</u>) oder Peter Eugster, Lüchingen (Telefon 071 755 28 09 oder E-Mail <u>eugster-gehrenhof@bluewin.ch</u>) zu richten. Der Kurs wird bei genügend Anmeldungen durchgeführt. Sollte der Kurs mangels Anmeldungen nicht stattfinden, werden die angemeldeten Personen informiert. Treffpunkt ist am 19. Februar 2011 um 13.15 Uhr beim Ribelhof, Rietstrasse 52, Lüchingen. Die Kursteilnehmenden werden gebeten, auf witterungsgerechte Bekleidung zu achten. Von den Kursteilnehmenden wird ein kleiner Unkostenbeitrag erhoben.<br> <br> Die Stadt Altstätten freut sich über eine grosse Anzahl Kursbesucherinnen und Kursbesucher. <br><br>Datum der Neuigkeit  10. Feb. 2011    <br> <table style=\"width: 100%;\"><tbody><tr> <td align=\"left\"> &nbsp;</td></tr></tbody></table> <!-- end of contents -->";
	}
}