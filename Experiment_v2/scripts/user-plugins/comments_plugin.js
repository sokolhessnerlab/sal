// Plugin to grab comments at the end of the task.

jsPsych.plugins["comments_plugin"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "comments_plugin",
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
      
            // End trial upon button press.
      $('#button').one('click',function() {
          var trial_com = $('#comments').val();
          
            // data saving
          var trial_data = {
              text_type: trial.text_type,
              comments: trial_com
          };
          // Finish trial
                  jsPsych.finishTrial(trial_data);
          });
  };

  return plugin;
})();