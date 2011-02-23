/**
 * @author Eugen
 */

var chMap = {
	map : null,
	
	initMap: function(map_container){
		if (!SearchChMap.isBrowserCompatible()) {
			document.getElementById(map_container).innerHTML = "Ihr Browser ist nicht kompatibel.";
		} 
		else {
			this.map = new SearchChMap({container: map_container, center:[47.378315,9.538313], zoom:"1", type:"aerial"});
		}
	},
		
	findAddress : function(address){
		if (chMap.map){
			chMap.map.go({ center:address, zoom:1 });
		} 
	}	
}
