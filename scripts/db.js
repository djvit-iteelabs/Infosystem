/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 * @uses jQuery 1.4.2
 * @uses HTML5 LocalStorage - WebDB
 */

/**
 * OSK (On Screen Keyboard) class constructor
 */
function DB(){
};

/**
 * InfoSystem class definition
 */
DB.prototype = {
	dbName: 'InfoSystemDB',
	dbVersion: '0.0.1',  
	displayName: 'InfoSystem Local Database', 
	estDbSize: 65536*512,
	_db: null,

	init: function(){
		// Open the database
		/*
		
		this._db = window.openDatabase(this.dbName, '', this.displayName, this.estDbSize);
		
		// Check if the table is present - if not create it
		if(this._db.version == ""){
			this._db.changeVersion('', this.dbVersion, function(t) {
				t.executeSql('CREATE TABLE Stats(actionTime, page, detail)');
			});
		}
		*/
	},
	
	addRecord: function(time, page, detail) {
		// Insert a record
		if (page && detail) {
			var len = window.localStorage.length;
			window.localStorage[len++] = time;
			window.localStorage[len++] = page;
			window.localStorage[len++] = detail;
		}
	},
	
	getRecords: function(){
		// Get all records
		var max_key = 0;
		var min_key = 99999;
		var str = '';
		
		for(key in window.localStorage){
			if (parseInt(key) > max_key) max_key = parseInt(key);
			if (parseInt(key) < min_key) min_key = parseInt(key);
		}
		
		alert(min_key+" / "+max_key + " / " + window.localStorage.length);
		
		if(min_key <= max_key){
			for(var i = min_key; i <= max_key;i++){
				str += "<li><strong>" + window.localStorage[i] + "</strong>";
				i++;
				str += "<span style='display:inline-block;width:200px;text-align:center;'>" + 
						window.localStorage[i] + "</span>";
				i++;
				str += window.localStorage[i] + "</li>";
			}
		}
		
		return "<ul>" + str + "</ul>";
	},
	
	getRecordsGrouped: function() {
		//Get records grouped by date
		var max_key = 0;
		var min_key = 99999;
		var str = '';
		var date = '';
		
		for(key in window.localStorage){
			if (parseInt(key) > max_key) max_key = parseInt(key);
			if (parseInt(key) < min_key) min_key = parseInt(key);
		}
		
		if(min_key <= max_key){
			for(var i = min_key; i <= max_key;i++){
				var date_arr = localStorage[i].split(" ");
				
				if(i == min_key){
					str += "<ul><strong>" + date_arr[0] + ":</strong>";
					str += "<li style='margin-left:100px;'>" + date_arr[1] + 
						"<span style='display:inline-block;width:200px;text-align:center;'>";
					i++;
					str += window.localStorage[i] + "</span>";
					i++;
					str += window.localStorage[i] + "</li>";
				}
				else {
					if((date != '')&&(date != date_arr[0])){
						str += "</ul><hr/>";
						str += "<ul><strong>" + date_arr[0] + ":</strong>";						
					}
	
					str += "<li style='margin-left:100px;'>" + date_arr[1] + 
						"<span style='display:inline-block;width:200px;text-align:center;'>";
					i++;
					str += window.localStorage[i] + "</span>";
					i++;
					str += window.localStorage[i] + "</li>";

					if(i == max_key){
						str += "</ul><hr/>";
					}	
				}
				
				date = date_arr[0];
			}
		}
		
		return str;
	},

	getRecordsByRange: function(from, to){
		// Get records in a certain range
		
	}
}