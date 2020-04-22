// Text display plugin (now with image-displaying capabilities!!)

jsPsych.plugins["text_display_img"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "text_display_img",
    parameters: {
      text: {
        type: jsPsych.plugins.parameterType.HTML_STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
      text_type: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
          default: undefined
      },
      img: {
          type: jsPsych.plugins.parameterType.IMAGE,
          default: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {
      
      // Text (div) to display
      var text = $(trial.text).html();
      
      // display the relevant div, plugged into "text" param.
      display_element.innerHTML = text.format(trial.img);
      
      //display_element.querySelector('#Intro').className += 'Introduction';
      
    // data saving
    var trial_data = {
        text_type: trial.text_type,
        ex_img: trial.img
    };

            // End trial upon button press.
      $('#button').one('click',function() {
                  jsPsych.finishTrial(trial_data);
          });
  };

  return plugin;
})();
