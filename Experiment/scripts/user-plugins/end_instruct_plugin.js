/*
 * End Instructions plugin. Give participants the option to continue or review the instructions from the beginning.
 */

jsPsych.plugins["instruct_end"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "instruct_end",
    parameters: {
      text: {
        type: jsPsych.plugins.parameterType.HTML_STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
      text_type: {
        type: jsPsych.plugins.parameterType.STRING,
        default: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {
      
      display_element.innerHTML = $(trial.text).html();
      
      $('#continue, #repeat').one('click', function(){
          
          console.log(this.id);
          
        // data saving
          var trial_data = {
              text_type: trial.text_type,
              choice: this.id
          };

        // end trial
          jsPsych.finishTrial(trial_data);
      });
            };

  return plugin;
})();
