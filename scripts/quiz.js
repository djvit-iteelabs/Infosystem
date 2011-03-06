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
		$('#quizNextQuestion').click(function() {
			_this.moveNext();
		});
		
		$('#quizPrevQuestion').click(function() {
			$('#quizPopupFail').hide('clip', null, 500);
		});
		
		// Bind answer clicks
		$('.quizNormal ul').click(function(e) {
			var answer = $(e.target).attr('answer');
			
			// Check if answer is correct
			var options = {};
			if (answer == 'true') {
				// Show description box and move to the next question
				$('#quizPopupOk').show('clip', options, 500);
			} else {
				// Show incorrect answer message
				$('#quizPopupFail').show('clip', options, 500);
			}
		});
	},
	
	resetQuiz: function() {
		this.currentStep = 0;
		this.moveToStep(this.currentStep);
	},
	
	moveNext: function() {
		this.currentStep += 1;
		this.moveToStep(this.currentStep);
	},
	
	moveToStep: function(idx) {
		var quizItem = QUIZ.quizData[this.currentStep];
		$('#quizQuestion').html(quizItem.question);
		$('#quizAnswers').html(quizItem.answers);
		$('#quizAnswerDescription').html(quizItem.description);
	}
}
