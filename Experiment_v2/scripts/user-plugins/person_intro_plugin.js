/*
 * Character introduction plugin
 */

jsPsych.plugins["person_intro"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "person_intro",
    parameters: {
      text: {
        type: jsPsych.plugins.parameterType.HTML_STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
      block: {
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      },
      character: {
        type: jsPsych.plugins.parameterType.STRING,
        default: undefined
      },
      img: {
          type: jsPsych.plugins.parameterType.IMAGE,
          default: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {
      
    // Get text
      var text = $(trial.text).html();
      
    // Display text with image and name plugged in
      display_element.innerHTML = text.format(trial.character, trial.img);

    // data saving
    var trial_data = {
        block: trial.block,
        character: trial.character,
        image: trial.img
    };

    // End trial upon button press.
      $('#button').one('click',function() {
                  jsPsych.finishTrial(trial_data);
          });
  };

  return plugin;
})();
