/**
 * @author Vitaly Yatsunyck
 * Copyringt (c) 2011 MARZ Touch InfoSystem 
 * 
 * @version 0.0.1
 * @uses jQuery 1.4.2
 * @uses quiz.data.js
 */

function QUIZ(){
};

/**
 * RSS parser global singleton object
 * @param {Object} rssUrl
 */
QUIZ.prototype  = {
	currentStep: null,
	
	/**
	 * Initializes QUIZ functionality
	 * @param {Object} list
	 */
	init: function(){
		this.currentStep = 0;
		var _this = this;
		
		// Bind next click
		var options = {};
		$('#quizNextQuestion').click(function() {
			$(this).children().hide("puff",{},500, function() {
				$('#quizPopupOk').hide('clip', options, 500, function(){
					$('#quizContent').fadeOut(500, function(){
						_this.moveNext();
						if (_this.currentStep < QUIZ.quizData.length) 
							$('#quizContent').fadeIn(500);
					});
				});
				
			});
		});
		
		$('#quizPrevQuestion').click(function() {
			$(this).children().hide("puff",{},500, function(){
				$('#quizPopupFail').hide('clip', options, 500);
			});
			
		});
		
		// Bind answer clicks
		$('.quizNormal ul').click(function(e) {
			var answer = $(e.target).attr('answer');
			if (typeof(answer) === 'undefined') {
				answer = $(e.target).parent().attr('answer');
			}
			if (typeof(answer) === 'undefined')  return;
			
			$(e.target).css('-webkit-box-shadow', '0px 0px 0px #000000').delay(500).css('-webkit-box-shadow', '10px 10px 10px #444444');
			
			// Check if answer is correct
			if (answer == 'true') {
				// Show description box and move to the next question
				$('#quizPopupFail').css('display', 'none');
				$('#quizPopupOk').show('clip', options, 500);
				$('#quizNextQuestion').children().show();
			} else {
				// Show incorrect answer message
				$('#quizPopupOk').css('display', 'none');
				$('#quizPopupFail').show('clip', options, 500);
				$('#quizPrevQuestion').children().show();
			}
		});
	},
	
	resetQuiz: function() {
		this.currentStep = 0;
		$('#quizPopupOk').css('display', 'none');
		$('#quizPopupFail').css('display', 'none');
		$('#quizContent').css('display', 'block');
		$('#quizMessage').css('display', 'none');
		
		this.moveToStep(this.currentStep);
	},
	
	moveNext: function() {
		this.currentStep += 1;
		this.moveToStep(this.currentStep);
	},
	
	moveToStep: function(idx) {
		var quizItem = QUIZ.quizData[this.currentStep];
		
		if ((typeof(quizItem) !== 'undefined') && (quizItem != null)) {
			$('#quizQuestion').html(quizItem.question);
			$('#quizAnswers').html(quizItem.answers);
			$('#quizAnswerDescription').html(quizItem.description);
		} else {
			$('#quizContent').css('display', 'none');
			$('#quizMessage').css('display', 'block');
			$('#quizMessage').html('Vielen Dank für die Beantwortung der Quizfragen. Wir wünschen Ihnen viel Spass in Altstätten!');
		}
	}
}
