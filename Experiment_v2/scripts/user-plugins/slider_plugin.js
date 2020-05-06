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
      character: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        default: undefined
      },
      img: {
        type: jsPsych.plugins.parameterType.IMAGE, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
      vignette_ID: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        default: undefined       
      },
      val: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        default: undefined       
      },
      att: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        default: undefined
      },
      sent1: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        default: undefined
      },
      sent2: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        default: undefined
      },
      senttype1: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
        default: undefined
      },
      senttype2: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
        default: undefined
      },
      block_type: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
          default: undefined
      },
      shift_type: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
          default: undefined
      },
      ts_val: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
          default: undefined
      },
      ts_att: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
          default: undefined
      },
      te_val: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
          default: undefined
      },
      te_att: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
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
        character: trial.character,
        image: trial.img,
        vignette_ID: trial.vignette_ID,
        val: trial.val,
        att: trial.att,
        sent1: trial.sent1,
        sent2: trial.sent2,
        senttype1: trial.senttype1,
        senttype2: trial.senttype2,
        block_type: trial.block_type,
        shift_type: trial.shift_type,
        ts_val: trial.ts_val,
        ts_att: trial.ts_att,
        te_val: trial.te_val,
        te_att: trial.te_att,
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
