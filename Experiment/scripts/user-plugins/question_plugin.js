/*
 * Displaying questionnaires and collecting data
 */

jsPsych.plugins["question_plugin"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "question_plugin",
    parameters: {
      text: {
        type: jsPsych.plugins.parameterType.HTML, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },

      inner_div: {
        type: jsPsych.plugins.parameterType.HTML_STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
        }
    }
  }

  plugin.trial = function(display_element, trial) {
      
      display_element.innerHTML = trial.text;

    // data saving
    var trial_data = {
      parameter_name: 'parameter value'
    };

    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
