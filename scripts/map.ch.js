/**
 * @author Eugen
 */

var chSearchMap = {
	map : null,
	
	initMap: function(map_container){
		if (!SearchChMap.isBrowserCompatible()) {
			document.getElementById(map_container).innerHTML = "Ihr Browser ist nicht kompatibel.";
		} 
		else {
			this.map = new SearchChMap({container: map_container, 
										center:[47.378315,9.538313], 
										zoom:"1", 
										poigroups: "-",
										controls: "-"});
		}
	},
		
	findAddress : function(address){
		if (chSearchMap.map){
			chSearchMap.map.go({ center:address, zoom:0.5 });
		} 
	}	
}

var chLandMap = {
	map : null,
	
	initMap: function(map_container){
		if (!SearchChMap.isBrowserCompatible()) {
			document.getElementById(map_container).innerHTML = "Ihr Browser ist nicht kompatibel.";
		} 
		else {
			this.map = new SearchChMap({container: map_container, 
										center: [47.378315,9.538313], 
										zoom: "1", 
										type: "aerial",
										poigroups: "verkehr",
										controls: "-"});
		}
	},
		
	findAddress : function(address){
		if (chLandMap.map){
			chLandMap.map.go({ center:address, zoom:0.25 });
		} 
	}	
}
