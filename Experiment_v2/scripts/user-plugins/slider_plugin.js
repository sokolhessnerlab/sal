/*
 * Slider plugin to display the awesome slider.
 */

jsPsych.plugins["slider_plugin"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "slider_plugin",
    parameters: {
      text: {
        type: jsPsych.plugins.parameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
    question: {
        type: jsPsych.plugins.parameterType.STRING,
        default: undefined
    },
    trial_num: {
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
    },
        block: {
            type: jsPsych.plugins.parameterType.INT,
            default: undefined
        }
    }
  }

  plugin.trial = function(display_element, trial) {
      
     // Display trial-by-trial slider questions
     var liking_text = $(trial.text).html();
  display_element.innerHTML = liking_text;
      var start_time = performance.now();
   
      
    // Timeout after 10 secs.
  var slider_timeout = jsPsych.pluginAPI.setTimeout(function() {
      console.log('No response!');
        
        var nan_end_time = performance.now();
            var trial_data = {
        trial_num: trial.trial_num,
        block: trial.block,
        rating: NaN,
        question: trial.question,
        rt: NaN,
        start_time: start_time,
        end_time: nan_end_time
    };
        
        jsPsych.finishTrial(trial_data);

    }, 10000);
      
    // Get slider values
      slider = document.getElementById('liking_slider');
    
    // When slider is activated, finish trial.  
      $('.slider').one('click', function(e) {
          clearTimeout(slider_timeout);
          var end_time = performance.now();
          var rt = end_time - start_time;
          
    var trial_data = {
        trial_num: trial.trial_num,
        block: trial.block,
        rating: slider.value,
        question: trial.question,
        rt: rt,
        start_time: start_time,
        end_time: end_time
    };

          console.log('trial finished');
          console.log(trial_data.rating);
          
    // end trial, with a 1 second delay
    jsPsych.pluginAPI.setTimeout(function() {
            jsPsych.finishTrial(trial_data);
    }, 1000)
      });
  };
      
  return plugin;
})();
