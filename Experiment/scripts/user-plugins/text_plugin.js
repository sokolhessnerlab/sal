jsPsych.plugins["trial_text"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "trial_text",
    parameters: {
      img: {
        type: jsPsych.plugins.parameterType.IMAGE, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
      text: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        default: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    // data saving
    var trial_data = {
      parameter_name: 'parameter value'
    };

    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
