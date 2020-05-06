/*
 * End of task general affiliation questions.
 */

jsPsych.plugins["pt_general_questions"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "pt_general_questions",
    parameters: {
      text: {
        type: jsPsych.plugins.parameterType.HTML_STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {
      
    // Get div
      questions = $('#post_task_general').html();
      
    // Display block questions div
      display_element.innerHTML = questions;
      
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
          if (num_clicked != 11) {
              $('#angry_box').text('Please answer all questions before continuing. All sliders must be clicked at least once to activate, even if you do not intend to change its value.');
          } else {
                  // data saving
              var trial_data = {
                    block: trial.block_num,
                    character: trial.character,
                    FriendDesire_gen: clicked.friendDesire_gen,
                    FriendTime_gen: clicked.friendTime_gen,
                    Int_1: clicked.Int_1_gen,
                    Int_2: clicked.Int_2_gen,
                    Int_3: clicked.Int_3_gen,
                    Pow_1: clicked.Pow_1_gen,
                    Pow_2: clicked.Pow_2_gen,
                    Pow_3: clicked.Pow_3_gen,
                    Val_1: clicked.Val_1_gen,
                    Val_2: clicked.Val_2_gen,
                    Val_3: clicked.Val_3_gen
    };
              
           jsPsych.finishTrial(trial_data);   
          }
          });
  };

  return plugin;
})();
