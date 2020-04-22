// Basic text display plugin.

jsPsych.plugins["text_display"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "text_display",
    parameters: {
      text: {
        type: jsPsych.plugins.parameterType.HTML_STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
      text_type: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
          default: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {
      
      // display the relevant div, plugged into "text" param.
      display_element.innerHTML = $(trial.text).html();
      
      //display_element.querySelector('#Intro').className += 'Introduction';
      
    // data saving
    var trial_data = {
      text_type: trial.text_type
    };

            // End trial upon button press.
      $('#button').one('click',function() {
                  jsPsych.finishTrial(trial_data);
          });
  };

  return plugin;
})();
