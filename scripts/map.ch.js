/**
 * @author Eugen
 */

var chSearchMap = {
	map : null,
	container : null,
	lat : null,
	lon : null,
	
	initMap: function(map_container){
		if (!SearchChMap.isBrowserCompatible()) {
			document.getElementById(map_container).innerHTML = "Ihr Browser ist nicht kompatibel.";
		} 
		else {
			this.lat = 47.378315;
			this.lon = 9.538313;
			this.container = map_container;
			this.map = new SearchChMap({container: this.container, 
										center: [this.lat,this.lon], 
										zoom: "0.5", 
										type: "aerial",
										controls: "-",
										circle: false});
			this.defaultPOI();
		}
	},
		
	findAddress : function(address){
		if (chSearchMap.map){
			chSearchMap.map.set({ 
				center:address, 
				zoom:0.25 
			});
		} 
	},
	
	resetMap : function(){
		if (chSearchMap.map) {			
			chSearchMap.map.removeAllPOIs();
			chSearchMap.map.set({
				center: [chSearchMap.lat,chSearchMap.lon],
				zoom: 0.25
			});
			chSearchMap.defaultPOI();
		}		
	},
	
	satView : function(){
		chSearchMap.map.set({type: "aerial"});
	},	

	streetView : function(){
		chSearchMap.map.set({type: "street"});
	},
	
	addMyPOI : function(name){
		chSearchMap.map.removeAllPOIs();
			
		var poi = new SearchChPOI({center: name,
								   title:"Fahrplan",
								   html: "<strong>"+name+"<\/strong>", 
								   icon:"images/marker.50.png"});
		chSearchMap.map.addPOI(poi);	
	},
	
	defaultPOI : function(){			
		var poi = new SearchChPOI({center: [chSearchMap.lat,chSearchMap.lon],
								   title:"Fahrplan",
								   html: "<strong>Altstatten<\/strong>", 
								   icon:"images/marker.50.png"});
		chSearchMap.map.addPOI(poi);			
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
	
	initMap: function(map_container){
		if (!SearchChMap.isBrowserCompatible()) {
			document.getElementById(map_container).innerHTML = "Ihr Browser ist nicht kompatibel.";
		} 
		else {
			this.lat = 47.378315;
			this.lon = 9.538313;
			this.container = map_container;
			this.map = new SearchChMap({container: this.container, 
										center: [this.lat,this.lon], 
										zoom: "0.5", 
										type: "aerial",
										poigroups: "verkehr",
										controls: "-",
										circle: false});
			this.defaultPOI();			this.map.disable("clickzoom");		}
	},
		
	findAddress : function(address){
		if (chLandMap.map){
			chLandMap.map.set({ 
				center:address, 
				zoom: 0.25 
			});
		} 
	},
	
	resetMap : function(){
		if (chLandMap.map) {			
			chLandMap.map.removeAllPOIs();
			chLandMap.map.set({
				center: [chLandMap.lat,chLandMap.lon],
				zoom: 0.25
			});
			chLandMap.defaultPOI();
		}		
	},
	
	satView : function(){
		chLandMap.map.set({type: "aerial"});
	},	

	streetView : function(){
		chLandMap.map.set({type: "street"});
	},
	
	addMyPOI : function(name){
		chLandMap.map.removeAllPOIs();
			
		var poi = new SearchChPOI({center: name,
								   title:"Fahrplan",
								   html: "<strong>"+name+"<\/strong>", 
								   icon:"images/marker.50.png"});
		chLandMap.map.addPOI(poi);	
	},
	
	defaultPOI : function(){			
		var poi = new SearchChPOI({center: [chLandMap.lat,chLandMap.lon],
								   title:"Fahrplan",
								   html: "<strong>Altstatten<\/strong>", 
								   icon:"images/marker.50.png"});
		chLandMap.map.addPOI(poi);			
	}	
}