/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 * @uses Google maps API V3 (3.1)
 */

/**
 * Google Map functional wrapper global singleton object
 */
var googleMap = {
	map: null,
	geocoder: null,
	
	/**
	 * Intializes the map
	 * @param {Object} map_container - map container div
	 */
	initMap: function(map_container){
		// Initialize map		
        var myOptions = {
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
            navigationControl: true,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL}
        }
        this.map = new google.maps.Map(document.getElementById(map_container), myOptions);
		
		// Initialize geocoder
		this.geocoder = new google.maps.Geocoder();
		var initialAddress = '9450 Altstätten, Schweiz';
		
		this.findAddress(initialAddress);
	},
	
	/**
	 * Searches for the provided location and centers a map if result found
	 * @param {Object} address - location to look for
	 */
	findAddress: function(address) {
		var _this = this;
        if (typeof (_this.geocoder) === 'undefined')
            _this.geocoder = new google.maps.Geocoder();
        
        _this.geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                googleMap.map.setCenter(results[0].geometry.location);
            } else {
                alert("Cannot find specified address");
            }
        });
    }
}