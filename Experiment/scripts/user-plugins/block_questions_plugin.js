/*
 * End of block character questions.
 */

jsPsych.plugins["block_questions"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "block_questions",
    parameters: {
      text: {
        type: jsPsych.plugins.parameterType.HTML_STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
      block_num: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default: undefined
      },
      character: {
          type: jsPsych.plugins.parameterType.STRING,
          default: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {
      
    // Get div
      questions = $('#block_questions').html();
      
    // Display block questions div
      display_element.innerHTML = questions.format(trial.character);
      
    // Create variable to hold slider responses
      var clicked = [];
      
      
    // When slider is clicked, adds name (if not included) and sets value in clicked dictionary!  
      $('.slider').on('click', function() {
          console.log('Clicked');
          
          clicked[this.name] = this.value;
          console.log(clicked);
          
      });

    // end trial upon button press
      $('#button').on('click',function() {
          
          // Get length of dictionary
          var num_clicked = Object.keys(clicked).length;
          
          // Check if all questions have been answered. If not, put up angry text!
          if (num_clicked != 9) {
              $('#angry_box').text('Please answer all questions before continuing. All sliders must be clicked at least once to activate, even if you do not intend to change its value.');
          } else {
                  // data saving
              var trial_data = {
                    block: trial.block_num,
                    character: trial.character,
                    Int_1: clicked.Int_1,
                    Int_2: clicked.Int_2,
                    Int_3: clicked.Int_3,
                    Pow_1: clicked.Pow_1,
                    Pow_2: clicked.Pow_2,
                    Pow_3: clicked.Pow_3,
                    Val_1: clicked.Val_1,
                    Val_2: clicked.Val_2,
                    Val_3: clicked.Val_3
    };
              
           jsPsych.finishTrial(trial_data);   
          }
          });
  };

  return plugin;
})();
