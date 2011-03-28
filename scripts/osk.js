/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 * @uses jQuery 1.4.2
 */

/**
 * OSK (On Screen Keyboard) class constructor
 */
function OSK(){
};

/**
 * InfoSystem class definition
 */
OSK.prototype = {
	oskMode: null,  	//  norm num
	oskUpperCase: null,		//  upper lower
	oskTarget: null,	//	textbox
	oskContainer: null,	//	keyboard div
	oskABC: null,		//  ABC modeContainer
	oskNum: null,		//  Num modeContainer
	oskCallback: null,	// Callback function invoked on submit
	oskShown: null,		//Keyboard status
	
	/**
	 * Function to initialize OSK component
	 */
	init: function(callback, language){
		var _this = this;
		if ( (typeof(language) === 'undefined') || (language == null) || (language.length == 0) )
			language = 'en';
		
		if (this.oskMode == null)
			this.oskMode = 'norm';
		
		this.oskUpperCase = false;
		this.oskShown = true;
		
		if (typeof(callback) === 'function')
			this.oskCallback = callback; 

		// Create and add OSK DOM
		// 1. Container + modes (normal and num)
		// 2. lines
		// 3. buttons
		this.oskContainer = document.createElement("div");
		$(this.oskContainer).attr('id', 'oskContainer');
		
		// Iterate over modes
		for (var i = 0; i < oskData[language].length; i++) {
			var currMode = oskData[language][i];
			
			// Create and Add mode DIV
			var modeContainer = document.createElement("div");
			$(modeContainer).attr('id', 'oskMode' + currMode.mode);
			
			if((currMode.mode != this.oskMode) ){
				$(modeContainer).css('display','none');
				this.oskNum = modeContainer;	
			} else {
				this.oskABC = modeContainer;
			}
			
			$(this.oskContainer).append(modeContainer);
			
			// Iterate over lines
			for (var j = 0; j < currMode.lines.length; j++ ) {
				var currLine = currMode.lines[j];
				
				// Add Line DIV
				var lineContainer = document.createElement("div");
				$(lineContainer).attr('id', 'oskLine_' + currMode.mode + '_' + j);
				$(lineContainer).attr('class', 'oskLine');
				$(modeContainer).append(lineContainer);
				
				// Iterate over	buttons
				for (var k = 0; k < currLine.buttons.length; k++) {
					var button = currLine.buttons[k]
					
					// Add Button SPAN
					var oskButton = document.createElement("span");
								
					$(oskButton).html(button.text);
					$(oskButton).attr('class', 'oskButton shadow');
					$(lineContainer).append(oskButton);
					
					// Bind SPAN Events depending on the type and char properties

					if(button.command != "switchCase"){						
						$(oskButton).mousedown(function(){
							$(this).attr("class","oskButton");;
						});
						
						$(oskButton).mouseup(function(){
							$(this).attr("class","oskButton shadow");
						});
					}
						

					switch(button.type) {
						case "0":
		    				$(oskButton).attr('class','separator');
						break;
						case "1":
							$(oskButton).click(function(){
								var s = $(this).text();
								
								if (_this.oskUpperCase) {
									$(_this.oskTarget).val($(_this.oskTarget).val() + s);
								}
								else {
									$(_this.oskTarget).val($(_this.oskTarget).val() + s.toLowerCase());
								}
							});
						break;
						case "2":
							switch (button.command) {
								case "enter":
									$(oskButton).attr('id', 'enter');
									
									$(oskButton).click(function(){
										if (typeof(_this.oskCallback) === 'function') {
											_this.oskCallback($(_this.oskTarget).val());
											$(_this.oskTarget).val('');
										}
										_this.hideKeyboard();

									});

									break;
								case "space":
									$(oskButton).attr('id', 'space');
									
									$(oskButton).click(function(){
										$(_this.oskTarget).val($(_this.oskTarget).val() + ' ');
									});
									break;
								case "switchMode":
									$(oskButton).attr('id', 'switchMode');
									
									$(oskButton).click(function() {										 
										if (_this.oskMode == 'norm') {
											//$(_this.oskABC).css('display', 'none');
											//$(_this.oskNum).css('display','block');
											$(_this.oskABC).fadeOut('fast', function(){
												$(_this.oskNum).fadeIn();	
											});
											
											_this.oskMode = 'num';
										}
										else {
											//$(_this.oskNum).css('display','none');
											//$(_this.oskABC).css('display','block');
											$(_this.oskNum).fadeOut('fast', function(){
												$(_this.oskABC).fadeIn();	
											});
											
											_this.oskMode = 'norm';
										}
									});										
									break;
								case "switchCase":
									$(oskButton).attr('id', 'switchCase');
									$(oskButton).click(function(){
										_this.oskUpperCase = !_this.oskUpperCase;
										
										if(_this.oskUpperCase){
											$(this).attr("class","oskButton blueHighlight");
										} else{
											$(this).attr("class","oskButton shadow");	
										}
									});
									break;
								case "backspace":
									$(oskButton).attr('id', 'backspace');
									
									$(oskButton).click(function(){
										var str = $(_this.oskTarget).val();
										$(_this.oskTarget).val(str.substr(0,str.length - 1));
									});
									break;
								default:
									$(oskButton).attr('id', 'oskBtn_' + j + '_' + k);
									
							}
						break;
						
					}
					
				}
			}
		}
		
		// Add OSK to the HTML DOM
		$('body').append(this.oskContainer);
		
		// Hide OSK by default
		_this.hideKeyboard();
		
		// Bind OSK events
		$('input[type="text"]').focus(function(){
			_this.showKeyboard($(this));
		});
		
		// Bind hiding of the keyboard on click outside of it
		$(document).click(function(e){
			var clickedOn = $(e.target);
			if ((typeof(_this.oskTarget) === 'undefined') || (_this.oskTarget == null)) return;

			if ((clickedOn.parents().andSelf().is('#oskContainer')) || (clickedOn.attr('id') == _this.oskTarget.attr('id'))) {
				// do nothing
			} 
			else {
				_this.hideKeyboard();
			}
		});
	},
	
	/**
	 * Show OSK
	 * @param {Object} textbox which should be a target of the button events
	 */
	showKeyboard: function(textbox) {
		// Set the target textbox
		this.oskTarget = textbox;
		
		// Show the keyboard
		var options = {};
		if (!this.oskShown) {
			$(this.oskContainer).show('slide', options, 500);
			this.oskShown = true;
		}
	},
	
	/**
	 * Hide OSK
	 */
	hideKeyboard: function() {
		// Empty the target textbox
		this.oskTarget = null;
		
		// Show the keyboard
		var options = {};
		if (this.oskShown) {
			$(this.oskContainer).hide('slide', options, 500);
			this.oskShown = false;
		}
	}	
	
}