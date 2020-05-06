/*
 * Post-task questionnaires plugin - character_specific questions
 */

jsPsych.plugins["post_task"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "post_task",
    parameters: {
      character: {
        type: jsPsych.plugins.parameterType.STRING,
        default: undefined
      },
      block: {
        type: jsPsych.plugins.parameterType.INT,
          default: undefined
        }
    }
  }

  plugin.trial = function(display_element, trial) {
      
    // Plug in character name and display questions
      character_questions = $('#post_task_questions').html();
      
      display_element.innerHTML = character_questions.format(trial.character);
      
    // Create var to hold question responses
      var responses = [];
      
    // Collect question responses
      $('.slider').on('click', function() {
          console.log('Clicked!');
          
          responses[this.name] = this.value;
          console.log(responses);
          
      });
      
      // Display dollar amount
      
      $('#dollar_slider').on('click', function() {
          $('#dollar_display').text('$' + this.value); 
      });
      
    // Collect radio responses!
      $('.radio_css').click(function() {
          console.log('Radio chosen!');
          responses[this.name] = this.value;
          console.log(this.name);
      });
      
      
    // end trial upon button press
      $('#button').on('click',function() {
          
          // Get number of responses
          var num_clicked = Object.keys(responses).length;
          
          // Check if all questions have been answered. If not, put up angry text!
          if (num_clicked != 9) {
              $('#angry_box').text('Please answer all questions before continuing. All sliders must be clicked at least once to activate, even if you do not intend to change its value.');
          } else {
                  // data saving
              var trial_data = {
                  block: trial.block,
                  character: trial.character,
                  memory: responses.memory,
                  memoryConfidence: responses.memoryConfidence,
                  friendDesire: responses.friendDesire,
                  similarity: responses.similarity,
                  teamDesire: responses.teamDesire,
                  projectDesire: responses.projectDesire,
                  friendChoice: responses.friend_choice,
                  joinTeam: responses.join_team,
                  restaurantCost: responses.restaurantCost
    };
              
           jsPsych.finishTrial(trial_data);   
          }
          });
  };

  return plugin;
})();
