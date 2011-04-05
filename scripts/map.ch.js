/**
 * @author Eugen
 */

var chSearchMap = {
	map : null,
	container : null,
	lat : null,
	lon : null,
	panshift : null,
	startx : null,
	starty :  null,
	x : null,
	y : null,
	
	initMap: function(map_container){
		if (typeof(SearchChMap) !== 'function') {
			$('#' + map_container).text('Diese Funktion ist zur Zeit nicht verfügbar. Bitte versuchen Sie es später noch einmal.');
			$('#divMapControls').html('');
			return;
		}
		if (this.map == null) {// Skip if already initialized
			if (!SearchChMap.isBrowserCompatible()) {
				document.getElementById(map_container).innerHTML = "Ihr Browser ist nicht kompatibel.";
			}
			else {
				this.lat = 47.378315;
				this.lon = 9.538313;
				this.x = 758549;
				this.y = 249618;
				this.startx = this.x;
				this.starty = this.y;
				this.panshift = 100;
				this.container = map_container;
				this.map = new SearchChMap({
					container: this.container,
					center: [this.x, this.y],
					zoom: "0.5",
					type: "aerial",
					poigroups: "-",
					controls: "-",
					circle: false
				});
				this.defaultPOI();
				this.map.disable("clickzoom");
			}
		} else { this.resetMap(); }
	},
		
	findAddress : function(address){
		if (chSearchMap.map) {
			chSearchMap.addMyPOI(address);
			chSearchMap.map.set({ center: address /*, zoom: 0.25*/});
		} 
	},
	
	resetMap : function(){
		if (chSearchMap.map) {
			chSearchMap.defaultPOI();
			chSearchMap.map.set({ center: [chSearchMap.lat, chSearchMap.lon], zoom: 0.25 });
		}
	},
	
	satView : function(){
		if (chSearchMap.map) {
			chSearchMap.map.set({
				type: "aerial"
			});
		}
	},	

	streetView : function(){
		if (chSearchMap.map) {
			chSearchMap.map.set({
				type: "street"
			});
		}
	},
	
	addMyPOI : function(name) {
		if (chSearchMap.map) {
			chSearchMap.map.removeAllPOIs();
			var poi = new SearchChPOI({
				center: name,
				title: "Ortsplan",
				html: "<strong>" + name + "<\/strong>",
				icon: "images/marker.50.png"
			});
			chSearchMap.map.addPOI(poi);
		}	
	},
	
	defaultPOI : function() {			
		if (chSearchMap.map) {
			chSearchMap.map.removeAllPOIs();
			var poi = new SearchChPOI({
				center: [chSearchMap.lat, chSearchMap.lon],
				title: "Ortsplan",
				html: "<strong>Altstatten<\/strong>",
				icon: "images/marker.50.png"
			});
			chSearchMap.map.addPOI(poi);
		}			
	},
	
	moveUp : function(){
		chSearchMap.starty += chSearchMap.panshift;
		chSearchMap.map.go({center : [chSearchMap.startx, chSearchMap.starty]});
	},

	moveRight : function(){
		chSearchMap.startx += chSearchMap.panshift;
		chSearchMap.map.go({center : [chSearchMap.startx, chSearchMap.starty]});
	},	

	moveDown : function(){
		chSearchMap.starty -= chSearchMap.panshift;
		chSearchMap.map.go({center : [chSearchMap.startx, chSearchMap.starty]});
	},

	moveLeft : function(){
		chSearchMap.startx -= chSearchMap.panshift;
		chSearchMap.map.go({center : [chSearchMap.startx, chSearchMap.starty]});
	}	

}

/**
 * 
 * @param {Object} map_container
 */

var chLandMap = {
	map : null,
	container : null,
	lat : null,
	lon : null,
	x : null, 
	y : null,
	startx : null,
	starty : null,
	panshift : null,
	
	initMap: function(map_container) {
		if (typeof(SearchChMap) !== 'function') {
			$('#' + map_container).text('Diese Funktion ist zur Zeit nicht verfügbar. Bitte versuchen Sie es später noch einmal.');
			$('#divMapLandControls').html('');
			return;
		}
		if (this.map == null) {// Skip if already initialized
			if ((typeof(SearchChMap) !== 'undefined') && (!SearchChMap.isBrowserCompatible())) {
				document.getElementById(map_container).innerHTML = "Ihr Browser ist nicht kompatibel.";
			}
			else {
				this.x = 759943;
				this.y = 249211;
				this.startx = this.x;
				this.starty = this.y;
				this.panshift = 100;
				
				this.container = map_container;
				this.map = new SearchChMap({
					container: this.container,
					center: [this.x, this.y],
					zoom: "0.5",
					type: "aerial",
					poigroups: "-",//poigroups: "verkehr",
					controls: "-",
					circle: false
				});
				this.map.disable("clickzoom");
				
				this.defaultPOI();
			}
		} else { this.resetMap(); }
		
		//
		$('#' + map_container).bind('mousemove click', function() {
			var tooltip = $(this).find('table.tooltip');			
			if (tooltip.length > 0) {
				tooltip.find('.tttitle').next().html('');
				tooltip.find('.ttform').html('');
			}
			$(this).find('a').each(function() {
				$(this).removeAttr('href');
			});
		});
		
		//this.map.addEventListener("mouseclick", function(e) {
		//	alert(e.mx + '\n' + e.my);
		//});
	
	},
	
	resetMap : function(){
		if (chLandMap.map) {
			this.defaultPOI();	
		}		
	},
	
	satView : function(){
		if (chLandMap.map) {
			this.map.set({
				type: "aerial"
			});
		}
	},	

	streetView : function(){
		if (chLandMap.map) {
			this.map.set({
				type: "street"
			});
		}
	},
	
	defaultPOI : function(){
		if (chLandMap.map) {
			this.map.removeAllPOIs();
			var poi = new SearchChPOI({
				center: [this.x, this.y],
				title: "Fahrplan",
				html: "<strong>Altstätten Bahnhof SBB<\/strong>",
				icon: "images/marker.50.png",
				circle: false
			});
			this.map.addPOI(poi);
			
			this.addPois();
			
			this.map.set({
				center: [this.x, this.y],
				zoom: 0.25
			});
		}		
	},
	
	setStation: function (_x, _y, _txt) {
		if (chLandMap.map) {
			this.map.removeAllPOIs();
			var poi = new SearchChPOI({
				center: [_x, _y],
				title: "Fahrplan",
				html: "<strong>" + _txt + "<\/strong>",
				icon: "images/marker.50.png",
				circle: false
			});
			this.map.addPOI(poi);
			
			this.addPois();
			
			this.map.set({
				center: [_x, _y],
				zoom: 0.25
			});
		}
	},
	
	addPois: function() {
		this.map.addPOI(new SearchChPOI({ center:[759900, 249180], title:"Bushaltestelle",
        	html:'<table class="nude tttop"><tbody><tr><td class="tttitle">Altstätten SG, Bahnhof</td><td class="ttsbb"></td></tr></tbody></table><div class="ttshort" id="tt0body"><table class="ovt"><colgroup><col class="tt1"><col class="tt2"><col class="tt3"><col class="tt4"></colgroup><tbody><tr><th align="right" colspan="2"><a onclick="return tti0.sort(0)" title="sortieren">Linie</a><span class="ttdown">▼</span></th><th><a onclick="return tti0.sort(1)" title="sortieren">Abfahrten</a><span class="ttdown" style="visibility:hidden">▼</span></th><th class="tt4"><a onclick="return tti0.sort(2)" title="sortieren">Richtung</a><span class="ttdown" style="visibility:hidden">▼</span></th></tr><tr><td id="tti0x1400039" class="tt1" align="center"><div style="background-color:#f81820; color:#fff;width:2.5em" title="Bus">300</div></td><td id="tti01400039" class="tt2" title="Richtung des nächsten Halts">↖</td><td class="tt3" title=""><a class="oev_hidden">06:48</a>,&nbsp;<a class="oev_hidden">08:14</a></td><td class="tt4">Rathaus</td></tr>' +
				'<tr><td id="tti0x1400045" class="tt1" align="center"><div style="background-color:#f81820; color:#fff;width:2.5em" title="Bus">300</div></td><td id="tti01400045" class="tt2" title="Richtung des nächsten Halts">←</td><td class="tt3" title=""><a class="oev_hidden">06:42</a></td><td class="tt4">Buchs SG, Bahnhof</td></tr>' +
				'<tr><td id="tti0x1431032" class="tt1" align="center"><div style="background-color:#00c6f4; color:#fff;width:2.5em" title="Bus">331</div></td><td id="tti01431032" class="tt2" title="Richtung des nächsten Halts">↖</td><td class="tt3" title="... 08:25"><a class="oev_hidden">06:39</a>,&nbsp;<a class="oev_hidden">07:29</a></td><td class="tt4">Oberriet SG, Zollbrücke</td></tr>' +
				'<tr><td id="tti0x5" colspan="4" class="ttmore">spätere</td></tr><tr><td id="tti0x5430039" class="tt1" align="center"><div style="background-color:#8ec631; color:#fff;width:2.5em" title="Bus">330</div></td><td id="tti05430039" class="tt2" title="Richtung des nächsten Halts">↖</td><td class="tt3" title="... 08:45"><a class="oev_hidden">07:45</a>,&nbsp;<a class="oev_hidden">08:19</a></td><td class="tt4">Stadt</td></tr>' +
				'<tr><td id="tti0x5432009" class="tt1" align="center"><div style="background-color:#865220; color:#fff;width:2.5em" title="Bus">332</div></td><td id="tti05432009" class="tt2" title="Richtung des nächsten Halts">→</td><td class="tt3" title=""><a class="oev_hidden">07:45</a>,&nbsp;<a class="oev_hidden">08:45</a></td><td class="tt4">Oberriet SG, Zollbrücke</td></tr>' +
				'</tbody></table></div><div class="ttform"></div>', 
			icon:"images/circle.BUS.60.png" }));

		this.map.addPOI(new SearchChPOI({ center:[759936, 249202], title:"Bahnhofv",
        	html:'<table class="nude tttop"><tbody><tr><td class="tttitle">Altstätten SG</td><td class="ttsbb"></td></tr></tbody></table><div class="ttshort" id="tt0body"><table class="ovt"><colgroup><col class="tt1"><col class="tt2"><col class="tt3"><col class="tt4"></colgroup><tbody><tr><th align="right" colspan="2"><a onclick="return tti0.sort(0)" title="sortieren">Linie</a><span class="ttdown">▼</span></th><th><a onclick="return tti0.sort(1)" title="sortieren">Abfahrten</a><span class="ttdown" style="visibility:hidden">▼</span></th><th class="tt4"><a onclick="return tti0.sort(2)" title="sortieren">Richtung</a><span class="ttdown" style="visibility:hidden">▼</span></th></tr><tr><td id="tti0x1200119" class="tt1" align="center"><div style="background-color:#039; color:#fff;width:2.5em" title="S-Bahn">S1</div></td><td id="tti01200119" class="tt2" title="Richtung des nächsten Halts">↗</td><td class="tt3" title=""><a class="oev_hidden">07:35</a>,&nbsp;<a class="oev_hidden">08:35</a></td><td class="tt4">Wil</td></tr>' +
				'<tr><td id="tti0x1200219" class="tt1" align="center"><div style="background-color:#039; color:#fff;width:2.5em" title="S-Bahn">S2</div></td><td id="tti01200219" class="tt2" title="Richtung des nächsten Halts">↗</td><td class="tt3" title=""><a class="oev_hidden">06:51</a></td><td class="tt4">Wattwil</td></tr>' +
				'<tr><td id="tti0x1308319" class="tt1" align="center"><div style="background-color:#039; color:#fff;width:2.5em" title="S-Bahn">S</div></td><td id="tti01308319" class="tt2" title="Richtung des nächsten Halts">↗</td><td class="tt3" title=""><a class="oev_hidden">07:28</a></td><td class="tt4">St. Gallen</td></tr>' +
				'<tr><td id="tti0x5" colspan="4" class="ttmore">spätere/Fernverkehr</td></tr><tr><td id="tti0x5308219" class="tt1" align="center"><div style="background-color:#f00; color:#fff;width:2.5em">RE</div></td><td id="tti05308219" class="tt2" title="Richtung des nächsten Halts">↗</td><td class="tt3" title=""><a class="oev_hidden">07:15</a>,&nbsp;<a class="oev_hidden">08:17</a></td><td class="tt4">St. Gallen</td></tr>' +
				'<tr><td id="tti0x5308269" class="tt1" align="center"><div style="background-color:#f00; color:#fff;width:2.5em">RE</div></td><td id="tti05308269" class="tt2" title="Richtung des nächsten Halts">↓</td><td class="tt3" title=""><a class="oev_hidden">07:42</a>,&nbsp;<a class="oev_hidden">08:42</a></td><td class="tt4">Chur</td></tr>' +
				'</tbody></table></div><div class="ttform"></div>', 
			icon:"images/circle.TRAIN.60.png" }));
			
		this.map.addPOI(new SearchChPOI({ center:[759687, 249344], title:"Bushaltestelle",
        	html:'<table class="nude tttop"><tbody><tr><td class="tttitle">Altstätten SG, Oberkirlen</td><td class="ttsbb"></td></tr></tbody></table><div class="ttshort" id="tt0body"><table class="ovt"><colgroup><col class="tt1"><col class="tt2"><col class="tt3"><col class="tt4"></colgroup><tbody><tr><th align="right" colspan="2"><a onclick="return tti0.sort(0)" title="sortieren">Linie</a><span class="ttdown">▼</span></th><th><a onclick="return tti0.sort(1)" title="sortieren">Abfahrten</a><span class="ttdown" style="visibility:hidden">▼</span></th><th class="tt4"><a onclick="return tti0.sort(2)" title="sortieren">Richtung</a><span class="ttdown" style="visibility:hidden">▼</span></th></tr><tr><td id="tti0x1306637" class="tt1" align="center"><div title="Bus">Bus</div></td><td id="tti01306637" class="tt2" title="Richtung des nächsten Halts">↖</td><td class="tt3" title=""><a class="oev_hidden">06:48</a>,&nbsp;<a class="oev_hidden">08:14</a></td><td class="tt4">Rathaus</td></tr>' +
				'<tr><td id="tti0x1430079" class="tt1" align="center"><div style="background-color:#8ec631; color:#fff;width:2.5em" title="Bus">330</div></td><td id="tti01430079" class="tt2" title="Richtung des nächsten Halts">↘</td><td class="tt3" title="... 08:08 08:37"><a class="oev_hidden">07:07</a>,&nbsp;<a class="oev_hidden">07:37</a></td><td class="tt4">Bahnhof</td></tr>' +
				'<tr><td id="tti0x1431079" class="tt1" align="center"><div style="background-color:#00c6f4; color:#fff;width:2.5em" title="Bus">331</div></td><td id="tti01431079" class="tt2" title="Richtung des nächsten Halts">↘</td><td class="tt3" title=""><a class="oev_hidden">07:22</a>,&nbsp;<a class="oev_hidden">08:31</a></td><td class="tt4">Bahnhof</td></tr>' +
				'<tr><td id="tti0x5" colspan="4" class="ttmore">spätere</td></tr><tr><td id="tti0x5430039" class="tt1" align="center"><div style="background-color:#8ec631; color:#fff;width:2.5em" title="Bus">330</div></td><td id="tti05430039" class="tt2" title="Richtung des nächsten Halts">↖</td><td class="tt3" title="... 08:45"><a class="oev_hidden">07:45</a>,&nbsp;<a class="oev_hidden">08:19</a></td><td class="tt4">Stadt</td></tr>' +
				'</tbody></table></div><div class="ttform"></div>', 
			icon:"images/circle.BUS.60.png" }));
			
		this.map.addPOI(new SearchChPOI({ center:[759450, 249450], title:"Bushaltestelle",
        	html:'<table class="nude tttop"><tbody><tr><td class="tttitle">Altstätten SG, Klosterguet</td><td class="ttsbb"></td></tr></tbody></table><div class="ttshort" id="tt0body"><table class="ovt"><colgroup><col class="tt1"><col class="tt2"><col class="tt3"><col class="tt4"></colgroup><tbody><tr><th align="right" colspan="2"><a onclick="return tti0.sort(0)" title="sortieren">Linie</a><span class="ttdown">▼</span></th><th><a onclick="return tti0.sort(1)" title="sortieren">Abfahrten</a><span class="ttdown" style="visibility:hidden">▼</span></th><th class="tt4"><a onclick="return tti0.sort(2)" title="sortieren">Richtung</a><span class="ttdown" style="visibility:hidden">▼</span></th></tr><tr><td id="tti0x1306647" class="tt1" align="center"><div title="Bus">Bus</div></td><td id="tti01306647" class="tt2" title="Richtung des nächsten Halts">←</td><td class="tt3" title=""><a class="oev_hidden">06:49</a>,&nbsp;<a class="oev_hidden">08:15</a></td><td class="tt4">Rathaus</td></tr>' +
				'<tr><td id="tti0x1430079" class="tt1" align="center"><div style="background-color:#8ec631; color:#fff;width:2.5em" title="Bus">330</div></td><td id="tti01430079" class="tt2" title="Richtung des nächsten Halts">↘</td><td class="tt3" title="... 08:08 08:36"><a class="oev_hidden">07:06</a>,&nbsp;<a class="oev_hidden">07:36</a></td><td class="tt4">Bahnhof</td></tr>' +
				'<tr><td id="tti0x1431049" class="tt1" align="center"><div style="background-color:#00c6f4; color:#fff;width:2.5em" title="Bus">331</div></td><td id="tti01431049" class="tt2" title="Richtung des nächsten Halts">←</td><td class="tt3" title=""><a class="oev_hidden">07:29</a>,&nbsp;<a class="oev_hidden">08:25</a></td><td class="tt4">Oberriet SG, Zollbrücke</td></tr>' +
				'<tr><td id="tti0x1431079" class="tt1" align="center"><div style="background-color:#00c6f4; color:#fff;width:2.5em" title="Bus">331</div></td><td id="tti01431079" class="tt2" title="Richtung des nächsten Halts">↘</td><td class="tt3" title="... 08:30"><a class="oev_hidden">07:21</a>,&nbsp;<a class="oev_hidden">08:07</a></td><td class="tt4">Bahnhof</td></tr>' +
				'<tr><td id="tti0x5" colspan="4" class="ttmore">spätere</td></tr><tr><td id="tti0x5430049" class="tt1" align="center"><div style="background-color:#8ec631; color:#fff;width:2.5em" title="Bus">330</div></td><td id="tti05430049" class="tt2" title="Richtung des nächsten Halts">←</td><td class="tt3" title="... 08:46"><a class="oev_hidden">07:46</a>,&nbsp;<a class="oev_hidden">08:20</a></td><td class="tt4">Stadt</td></tr>' +
				'</tbody></table></div><div class="ttform"></div>', 
			icon:"images/circle.BUS.60.png" }));
			
		this.map.addPOI(new SearchChPOI({ center:[758800, 249625], title:"Bushaltestelle",
        	html:'<table class="nude tttop"><tbody><tr><td class="tttitle">Altstätten SG, Rathaus</td><td class="ttsbb"></td></tr></tbody></table><div class="ttshort" id="tt0body"><table class="ovt"><colgroup><col class="tt1"><col class="tt2"><col class="tt3"><col class="tt4"></colgroup><tbody><tr><th align="right" colspan="2"><a onclick="return tti0.sort(0)" title="sortieren">Linie</a><span class="ttdown">▼</span></th><th><a onclick="return tti0.sort(1)" title="sortieren">Abfahrten</a><span class="ttdown" style="visibility:hidden">▼</span></th><th class="tt4"><a onclick="return tti0.sort(2)" title="sortieren">Richtung</a><span class="ttdown" style="visibility:hidden">▼</span></th></tr><tr><td id="tti0x1400079" class="tt1" align="center"><div style="background-color:#f81820; color:#fff;width:2.5em" title="Bus">300</div></td><td id="tti01400079" class="tt2" title="Richtung des nächsten Halts">↘</td><td class="tt3" title="... 08:03 08:33"><a class="oev_hidden">07:03</a>,&nbsp;<a class="oev_hidden">07:35</a></td><td class="tt4">Buchs SG, Bahnhof</td></tr>' +
				'<tr><td id="tti0x1401019" class="tt1" align="center"><div style="background-color:#7e2a88; color:#fff;width:2.5em" title="Bus">301</div></td><td id="tti01401019" class="tt2" title="Richtung des nächsten Halts">↗</td><td class="tt3" title="... 07:23 07:40 07:56"><a class="oev_hidden">06:56</a>,&nbsp;<a class="oev_hidden">07:11</a></td><td class="tt4">Heerbrugg, Bahnhof</td></tr>' +
				'<tr><td id="tti0x1401059" class="tt1" align="center"><div style="background-color:#7e2a88; color:#fff;width:2.5em" title="Bus">301</div></td><td id="tti01401059" class="tt2" title="Richtung des nächsten Halts">↙</td><td class="tt3" title="... 08:15 08:45"><a class="oev_hidden">07:11</a>,&nbsp;<a class="oev_hidden">07:45</a></td><td class="tt4">Stadt</td></tr>' +
				'<tr><td id="tti0x1430009" class="tt1" align="center"><div style="background-color:#8ec631; color:#fff;width:2.5em" title="Bus">330</div></td><td id="tti01430009" class="tt2" title="Richtung des nächsten Halts">→</td><td class="tt3" title="... 08:07 08:35"><a class="oev_hidden">07:05</a>,&nbsp;<a class="oev_hidden">07:35</a></td><td class="tt4">Bahnhof</td></tr>' +
				'<tr><td id="tti0x1431009" class="tt1" align="center"><div style="background-color:#00c6f4; color:#fff;width:2.5em" title="Bus">331</div></td><td id="tti01431009" class="tt2" title="Richtung des nächsten Halts">→</td><td class="tt3" title="... 08:29"><a class="oev_hidden">07:20</a>,&nbsp;<a class="oev_hidden">08:06</a></td><td class="tt4">Bahnhof</td></tr>' +
				'<tr><td id="tti0x1431059" class="tt1" align="center"><div style="background-color:#00c6f4; color:#fff;width:2.5em" title="Bus">331</div></td><td id="tti01431059" class="tt2" title="Richtung des nächsten Halts">↙</td><td class="tt3" title=""><a class="oev_hidden">07:32</a>,&nbsp;<a class="oev_hidden">08:28</a></td><td class="tt4">Oberriet SG, Zollbrücke</td></tr>' +
				'<tr><td id="tti0x5" colspan="4" class="ttmore">spätere</td></tr><tr><td id="tti0x5306629" class="tt1" align="center"><div title="Bus">Bus</div></td><td id="tti05306629" class="tt2" title="Richtung des nächsten Halts">↑</td><td class="tt3" title=""><a class="oev_hidden">08:29</a></td><td class="tt4">Reute AR, Dorf</td></tr>' +
				'<tr><td id="tti0x5430059" class="tt1" align="center"><div style="background-color:#8ec631; color:#fff;width:2.5em" title="Bus">330</div></td><td id="tti05430059" class="tt2" title="Richtung des nächsten Halts">↙</td><td class="tt3" title="... 08:48"><a class="oev_hidden">07:48</a>,&nbsp;<a class="oev_hidden">08:22</a></td><td class="tt4">Stadt</td></tr>' +
				'</tbody></table></div><div class="ttform"></div>', 
			icon:"images/circle.BUS.60.png" }));
			
		this.map.addPOI(new SearchChPOI({ center:[759051, 249875], title:"Bushaltestelle",
        	html:'<table class="nude tttop"><tbody><tr><td class="tttitle">Altstätten SG, Depot</td><td class="ttsbb"></td></tr></tbody></table><div class="ttshort" id="tt0body"><table class="ovt"><colgroup><col class="tt1"><col class="tt2"><col class="tt3"><col class="tt4"></colgroup><tbody><tr><th align="right" colspan="2"><a onclick="return tti0.sort(0)" title="sortieren">Linie</a><span class="ttdown">▼</span></th><th><a onclick="return tti0.sort(1)" title="sortieren">Abfahrten</a><span class="ttdown" style="visibility:hidden">▼</span></th><th class="tt4"><a onclick="return tti0.sort(2)" title="sortieren">Richtung</a><span class="ttdown" style="visibility:hidden">▼</span></th></tr><tr><td id="tti0x1401019" class="tt1" align="center"><div style="background-color:#7e2a88; color:#fff;width:2.5em" title="Bus">301</div></td><td id="tti01401019" class="tt2" title="Richtung des nächsten Halts">↗</td><td class="tt3" title="... 07:23 07:40 07:56"><a class="oev_hidden">06:56</a>,&nbsp;<a class="oev_hidden">07:11</a></td><td class="tt4">Heerbrugg, Bahnhof</td></tr>' +
				'<tr><td id="tti0x1401059" class="tt1" align="center"><div style="background-color:#7e2a88; color:#fff;width:2.5em" title="Bus">301</div></td><td id="tti01401059" class="tt2" title="Richtung des nächsten Halts">↙</td><td class="tt3" title="... 07:58 08:28 08:58"><a class="oev_hidden">06:58</a>,&nbsp;<a class="oev_hidden">07:30</a></td><td class="tt4">Rathaus</td></tr>' +
				'<tr><td id="tti0x1401059" class="tt1" align="center"><div style="background-color:#7e2a88; color:#fff;width:2.5em" title="Bus">301</div></td><td id="tti01401059" class="tt2" title="Richtung des nächsten Halts">↙</td><td class="tt3" title="... 08:13 08:43"><a class="oev_hidden">07:09</a>,&nbsp;<a class="oev_hidden">07:43</a></td><td class="tt4">Stadt</td></tr>' +
				'</tbody></table></div><div class="ttform"></div>', 
			icon:"images/circle.BUS.60.png" }));
			
		this.map.addPOI(new SearchChPOI({ center:[758540, 249499], title:"Bushaltestelle",
        	html:'<table class="nude tttop"><tbody><tr><td class="tttitle">Altstätten SG, Stadt</td><td class="ttsbb"></td></tr></tbody></table><div class="ttshort" id="tt0body"><table class="ovt"><colgroup><col class="tt1"><col class="tt2"><col class="tt3"><col class="tt4"></colgroup><tbody><tr><th align="right" colspan="2"><a onclick="return tti0.sort(0)" title="sortieren">Linie</a><span class="ttdown">▼</span></th><th><a onclick="return tti0.sort(1)" title="sortieren">Abfahrten</a><span class="ttdown" style="visibility:hidden">▼</span></th><th class="tt4"><a onclick="return tti0.sort(2)" title="sortieren">Richtung</a><span class="ttdown" style="visibility:hidden">▼</span></th></tr><tr><td id="tti0x1401019" class="tt1" align="center"><div style="background-color:#7e2a88; color:#fff;width:2.5em" title="Bus">301</div></td><td id="tti01401019" class="tt2" title="Richtung des nächsten Halts">↗</td><td class="tt3" title="... 08:38"><a class="oev_hidden">07:21</a>,&nbsp;<a class="oev_hidden">08:09</a></td><td class="tt4">Heerbrugg, Bahnhof</td></tr>' +
				'<tr><td id="tti0x1431009" class="tt1" align="center"><div style="background-color:#00c6f4; color:#fff;width:2.5em" title="Bus">331</div></td><td id="tti01431009" class="tt2" title="Richtung des nächsten Halts">→</td><td class="tt3" title=""><a class="oev_hidden">07:34</a>,&nbsp;<a class="oev_hidden">08:30</a></td><td class="tt4">Oberriet SG, Zollbrücke</td></tr>' +
				'<tr><td id="tti0x1431019" class="tt1" align="center"><div style="background-color:#00c6f4; color:#fff;width:2.5em" title="Bus">331</div></td><td id="tti01431019" class="tt2" title="Richtung des nächsten Halts">↗</td><td class="tt3" title=""><a class="oev_hidden">07:18</a>,&nbsp;<a class="oev_hidden">08:27</a></td><td class="tt4">Bahnhof</td></tr>' +
				'<tr><td id="tti0x5" colspan="4" class="ttmore">spätere</td></tr><tr><td id="tti0x5430019" class="tt1" align="center"><div style="background-color:#8ec631; color:#fff;width:2.5em" title="Bus">330</div></td><td id="tti05430019" class="tt2" title="Richtung des nächsten Halts">↗</td><td class="tt3" title=""><a class="oev_hidden">08:04</a></td><td class="tt4">Bahnhof</td></tr>' +
				'</tbody></table></div><div class="ttform"></div>', 
			icon:"images/circle.BUS.60.png" }));
			
		this.map.addPOI(new SearchChPOI({ center:[758480, 249444], title:"Bahnhofv",
        	html:'<table class="nude tttop"><tbody><tr><td class="tttitle">Altstätten Stadt</td><td class="ttsbb"></td></tr></tbody></table><div class="ttshort" id="tt0body"><table class="ovt"><colgroup><col class="tt1"><col class="tt2"><col class="tt3"><col class="tt4"></colgroup><tbody><tr><th align="right" colspan="2"><a onclick="return tti0.sort(0)" title="sortieren">Linie</a><span class="ttdown">▼</span></th><th><a onclick="return tti0.sort(1)" title="sortieren">Abfahrten</a><span class="ttdown" style="visibility:hidden">▼</span></th><th class="tt4"><a onclick="return tti0.sort(2)" title="sortieren">Richtung</a><span class="ttdown" style="visibility:hidden">▼</span></th></tr><tr><td id="tti0x1308259" class="tt1" align="center"><div style="background-color:#039; color:#fff;width:2.5em">R</div></td><td id="tti01308259" class="tt2" title="Richtung des nächsten Halts">↙</td><td class="tt3" title=""><a class="oev_hidden">07:17</a>,&nbsp;<a class="oev_hidden">08:17</a></td><td class="tt4">Gais</td></tr>' +
				'</tbody></table></div><div class="ttform"></div>', 
			icon:"images/circle.TRAIN.60.png" }));

	},
	
	moveUp : function(){
		chLandMap.starty += chLandMap.panshift;
		chLandMap.map.set({center : [chLandMap.startx, chLandMap.starty]});
	},

	moveRight : function(){
		chLandMap.startx += chLandMap.panshift;
		chLandMap.map.set({center : [chLandMap.startx, chLandMap.starty]});
	},	

	moveDown : function(){
		chLandMap.starty -= chLandMap.panshift;
		chLandMap.map.set({center : [chLandMap.startx, chLandMap.starty]});
	},

	moveLeft : function(){
		chLandMap.startx -= chLandMap.panshift;
		chLandMap.map.set({center : [chLandMap.startx, chLandMap.starty]});
	}	
}