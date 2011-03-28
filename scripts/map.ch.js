/**
 * @author Eugen
 */

var chSearchMap = {
	map : null,
	container : null,
	lat : null,
	lon : null,
	
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
				this.container = map_container;
				this.map = new SearchChMap({
					container: this.container,
					center: [this.lat, this.lon],
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
				this.container = map_container;
				this.map = new SearchChMap({
					container: this.container,
					center: [this.x, this.y],
					zoom: "0.5",
					type: "aerial",
					poigroups: "verkehr",
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
		});
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
			
			this.map.set({
				center: [_x, _y],
				zoom: 0.25
			});
		}
	}	
}