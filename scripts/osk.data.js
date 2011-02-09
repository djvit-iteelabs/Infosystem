/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 */

/**
 * OSK Data definition
 */
var oskData = {
	"en": [
		{
			"mode": "norm",
			"lines": [
				{
					"buttons":[
						{ "text":"Q", "char":"Q", "type":"1" },
						{ "text":"W", "char":"W", "type":"1" },
						{ "text":"E", "char":"E", "type":"1" },
						{ "text":"R", "char":"R", "type":"1" },
						{ "text":"T", "char":"T", "type":"1" },
						{ "text":"Y", "char":"Y", "type":"1" },
						{ "text":"U", "char":"U", "type":"1" },
						{ "text":"I", "char":"I", "type":"1" },
						{ "text":"O", "char":"O", "type":"1" },
						{ "text":"P", "char":"P", "type":"1" },
						{ "text":"◄", "char":"", "type":"2", "command":"backspace" }
					]
				}, 
				{
					"buttons":[
						{ "text":"", "char":"", "type":"0" },
						{ "text":"A", "char":"A", "type":"1" },
						{ "text":"S", "char":"S", "type":"1" },
						{ "text":"D", "char":"D", "type":"1" },
						{ "text":"F", "char":"F", "type":"1" },
						{ "text":"G", "char":"G", "type":"1" },
						{ "text":"H", "char":"H", "type":"1" },
						{ "text":"J", "char":"J", "type":"1" },
						{ "text":"K", "char":"K", "type":"1" },
						{ "text":"L", "char":"L", "type":"1" },
						{ "text":"Submit", "char":"", "type":"2", "command":"enter" }
					]
				}, 
				{
					"buttons":[
						{ "text":"▲", "char":"", "type":"2", "command":"switchCase" },
						{ "text":"Z", "char":"Z", "type":"1" },
						{ "text":"X", "char":"X", "type":"1" },
						{ "text":"C", "char":"C", "type":"1" },
						{ "text":"V", "char":"V", "type":"1" },
						{ "text":"B", "char":"B", "type":"1" },
						{ "text":"N", "char":"N", "type":"1" },
						{ "text":"M", "char":"M", "type":"1" },
						{ "text":"!", "char":"!", "type":"1" },
						{ "text":"?", "char":"?", "type":"1" },
						{ "text":".", "char":".", "type":"1" }
					]
				},
				{
					"buttons":[
						{"text":"","char":"","type":"0"},
						{ "text":".123", "char":"", "type":"2", "command":"switchMode" },
						{ "text":"Space", "char":"", "type":"2", "command":"space" },
						{ "text":".123", "char":"", "type":"2", "command":"switchMode" }
					]
				}
			]
		}, 
		{
			"mode": "num",
			"lines": [
				{
					"buttons":[
						{ "text":"1", "char":"1", "type":"1" },
						{ "text":"2", "char":"2", "type":"1" },
						{ "text":"3", "char":"3", "type":"1" },
						{ "text":"4", "char":"4", "type":"1" },
						{ "text":"5", "char":"5", "type":"1" },
						{ "text":"6", "char":"6", "type":"1" },
						{ "text":"7", "char":"7", "type":"1" },
						{ "text":"8", "char":"8", "type":"1" },
						{ "text":"9", "char":"9", "type":"1" },
						{ "text":"0", "char":"0", "type":"1" },
						{ "text":"◄", "char":"", "type":"2", "command":"backspace" }
					]
				}, 
				{
					"buttons":[
						{ "text":"", "char":"", "type":"0" },
						{ "text":"-", "char":"-", "type":"1" },
						{ "text":"/", "char":"/", "type":"1" },
						{ "text":":", "char":":", "type":"1" },
						{ "text":";", "char":";", "type":"1" },
						{ "text":"(", "char":"(", "type":"1" },
						{ "text":")", "char":")", "type":"1" },
						{ "text":"$", "char":"$", "type":"1" },
						{ "text":"&", "char":"&", "type":"1" },
						{ "text":"@", "char":"@", "type":"1" },
						{ "text":"Submit", "char":"", "type":"2", "command":"enter" }
					]
				}, 
				{
					"buttons":[
						{ "text":"%", "char":"%", "type":"1" },
						{ "text":"*", "char":"*", "type":"1" },
						{ "text":"{", "char":"{", "type":"1" },
						{ "text":"}", "char":"}", "type":"1" },
						{ "text":".", "char":".", "type":"1" },
						{ "text":",", "char":",", "type":"1" },
						{ "text":"!", "char":"!", "type":"1" },
						{ "text":"?", "char":"?", "type":"1" },
						{ "text":"'", "char":"'", "type":"1" },
						{ "text":"\"", "char":"\"", "type":"1" }
					]
				},
				{
					"buttons":[
						{"text":"","char":"","type":"0"},
						{ "text":"ABC", "char":"", "type":"2", "command":"switchMode" },
						{ "text":"Space", "char":"", "type":"2", "command":"space" },
						{ "text":"ABC", "char":"", "type":"2", "command":"switchMode" }
					]
				}
			]
		}
	],
	"de": [
		{
			"mode": "norm",
			"lines": [
				{
					"buttons":[
						{ "text":"Q", "char":"Q", "type":"1" },
						{ "text":"W", "char":"W", "type":"1" },
						{ "text":"E", "char":"E", "type":"1" },
						{ "text":"R", "char":"R", "type":"1" },
						{ "text":"T", "char":"T", "type":"1" },
						{ "text":"Z", "char":"Z", "type":"1" },
						{ "text":"U", "char":"U", "type":"1" },
						{ "text":"I", "char":"I", "type":"1" },
						{ "text":"O", "char":"O", "type":"1" },
						{ "text":"P", "char":"P", "type":"1" },
						{ "text":"Ü", "char":"Ü", "type":"1" },
						{ "text":"◄", "char":"", "type":"2", "command":"backspace" }
					]
				}, 
				{
					"buttons":[
						{ "text":"A", "char":"A", "type":"1" },
						{ "text":"S", "char":"S", "type":"1" },
						{ "text":"D", "char":"D", "type":"1" },
						{ "text":"F", "char":"F", "type":"1" },
						{ "text":"G", "char":"G", "type":"1" },
						{ "text":"H", "char":"H", "type":"1" },
						{ "text":"J", "char":"J", "type":"1" },
						{ "text":"K", "char":"K", "type":"1" },
						{ "text":"L", "char":"L", "type":"1" },
						{ "text":"Ö", "char":"Ö", "type":"1" },
						{ "text":"Ä", "char":"Ä", "type":"1" },
						{ "text":"Submit", "char":"", "type":"2", "command":"enter" }
					]
				}, 
				{
					"buttons":[
						{ "text":"▲", "char":"", "type":"2", "command":"switchCase" },
						{ "text":"Z", "char":"Z", "type":"1" },
						{ "text":"X", "char":"X", "type":"1" },
						{ "text":"C", "char":"C", "type":"1" },
						{ "text":"V", "char":"V", "type":"1" },
						{ "text":"B", "char":"B", "type":"1" },
						{ "text":"N", "char":"N", "type":"1" },
						{ "text":"M", "char":"M", "type":"1" },
						{ "text":"!", "char":"!", "type":"1" },
						{ "text":"?", "char":"?", "type":"1" },
						{ "text":".", "char":".", "type":"1" }
					]
				},
				{
					"buttons":[
						{"text":"","char":"","type":"0"},
						{ "text":".123", "char":"", "type":"2", "command":"switchMode" },
						{ "text":"", "char":"", "type":"2", "command":"space" },
						{ "text":".123", "char":"", "type":"2", "command":"switchMode" }
					]
				}
			]
		}, 
		{
			"mode": "num",
			"lines": [
				{
					"buttons":[
						{ "text":"1", "char":"1", "type":"1" },
						{ "text":"2", "char":"2", "type":"1" },
						{ "text":"3", "char":"3", "type":"1" },
						{ "text":"4", "char":"4", "type":"1" },
						{ "text":"5", "char":"5", "type":"1" },
						{ "text":"6", "char":"6", "type":"1" },
						{ "text":"7", "char":"7", "type":"1" },
						{ "text":"8", "char":"8", "type":"1" },
						{ "text":"9", "char":"9", "type":"1" },
						{ "text":"0", "char":"0", "type":"1" },
						{ "text":"◄", "char":"", "type":"2", "command":"backspace" }
					]
				}, 
				{
					"buttons":[
						{ "text":"", "char":"", "type":"0" },
						{ "text":"-", "char":"-", "type":"1" },
						{ "text":"/", "char":"/", "type":"1" },
						{ "text":":", "char":":", "type":"1" },
						{ "text":";", "char":";", "type":"1" },
						{ "text":"(", "char":"(", "type":"1" },
						{ "text":")", "char":")", "type":"1" },
						{ "text":"$", "char":"$", "type":"1" },
						{ "text":"&", "char":"&", "type":"1" },
						{ "text":"@", "char":"@", "type":"1" },
						{ "text":"Submit", "char":"", "type":"2", "command":"enter" }
					]
				}, 
				{
					"buttons":[
						{ "text":"%", "char":"%", "type":"1" },
						{ "text":"*", "char":"*", "type":"1" },
						{ "text":"{", "char":"{", "type":"1" },
						{ "text":"{", "char":"}", "type":"1" },
						{ "text":".", "char":".", "type":"1" },
						{ "text":",", "char":",", "type":"1" },
						{ "text":"!", "char":"!", "type":"1" },
						{ "text":"?", "char":"?", "type":"1" },
						{ "text":"'", "char":"'", "type":"1" },
						{ "text":"\"", "char":"\"", "type":"1" }
					]
				},
				{
					"buttons":[
						{"text":"","char":"","type":"0"},
						{ "text":"ABC", "char":"", "type":"2", "command":"switchMode" },
						{ "text":"", "char":"", "type":"2", "command":"space" },
						{ "text":"ABC", "char":"", "type":"2", "command":"switchMode" }
					]
				}
			]
		}
	]
};
