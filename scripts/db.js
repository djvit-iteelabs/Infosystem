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
		/*
		this._db.transaction(function (t) {
			t.executeSql('INSERT INTO Stats(actionTime, page, detail) VALUES (?, ?, ?)', [time, page, detail]);
		});
		
		*/
	},
	
	getRecords: function(){
		// Get all records
		this._db.transaction(function (t) {
			t.executeSql('SELECT * FROM Stats', [], function (t, results) {
				var len = results.rows.length, i;
				for (i = 0; i < len; i++) {
					alert(results.rows.item(i).page);
				}
			});
		});
	},
	
	getRecordsGrouped: function() {
		
	},

	getRecordsByRange: function(from, to){
		// Get records in a certain range
		
	}
}