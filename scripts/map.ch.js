/**
 * @author Eugen
 */

var chSearchMap = {
	map : null,
	lat : null,
	lon : null,
	
	initMap: function(map_container){
		if (!SearchChMap.isBrowserCompatible()) {
			document.getElementById(map_container).innerHTML = "Ihr Browser ist nicht kompatibel.";
		} 
		else {
			this.lat = 47.378315;
			this.lon = 9.538313;
			var x = "759943";
			var y = "249211";
			this.map = new SearchChMap({container: map_container, 
										center:[x, y],
										zoom:"0.25", 
										poigroups: "verkehr",
										controls: "-",
									    circle : false});
										
			var poi = new SearchChPOI({center : [x, y],
									   title : "Fahrplan",
									   html : "<strong>Fahrplan<\/strong>", 
									   icon :"images/marker.50.png"});
			this.map.addPOI(poi);
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
		}		
	},

	satView : function(){
		chSearchMap.map.set({type: "aerial"});
	},	

	streetView : function(){
		chSearchMap.map.set({type: "street"});
	}	

}

var chLandMap = {
	map : null,
	lat : null,
	lon : null,
	
	initMap: function(map_container){
		if (!SearchChMap.isBrowserCompatible()) {
			document.getElementById(map_container).innerHTML = "Ihr Browser ist nicht kompatibel.";
		} 
		else {
			this.lat = 47.378315;
			this.lon = 9.538313;
			this.map = new SearchChMap({container: map_container, 
										center: [this.lat,this.lon], 
										zoom: "0.5", 
										type: "aerial",
										poigroups: "verkehr",
										controls: "-",
									    circle : false});
			
			this.map.disable("clickzoom");
		}
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
		}		
	},
	
	satView : function(){
		chLandMap.map.set({type: "aerial"});
	},	

	streetView : function(){
		chLandMap.map.set({type: "street"});
	}	
}