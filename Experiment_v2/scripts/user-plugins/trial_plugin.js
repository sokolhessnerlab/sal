/*
* Plugin to create each individual trial displaying action and situation text.
* Time between display of action and situation defaults to 8000 (8 seconds) if no text_delay parameter is defined.
*/

jsPsych.plugins["trial_plugin"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "trial_plugin",
    parameters: {
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
      text_delay: {
          type: jsPsych.plugins.parameterType.INT,
          default: 8000
      },
      fix_delay: {
          type: jsPsych.plugins.parameterType.INT,
          default: 2000
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
      
    // Grab face div and load in image path string
      var face =  $('#face_box').html().format(trial.img);
      
    // Display first fixation cross
      display_element.innerHTML = $('#fixation').html();
    
    // Sentence 1 + Image
      jsPsych.pluginAPI.setTimeout(function() {var htmlString = $(trial.sent1).html();
                                              display_element.innerHTML = [face + '<br></br>' + htmlString];}, trial.fix_delay);
      
    // Time interval for fix 2
      var cross2_delay = trial.fix_delay + trial.text_delay;
      
    // Replace and display fixation cross  
      jsPsych.pluginAPI.setTimeout(function() {var fixation = $('#fixation').html(); display_element.innerHTML = fixation;}, cross2_delay);
      
    // Time interval for second sentence
      var text2_delay = cross2_delay + trial.fix_delay;
      
    // Replace and display second sentence
      jsPsych.pluginAPI.setTimeout(function() {var htmlString = $(trial.sent2).html();
                                              display_element.innerHTML = [face + '<br></br>' + htmlString];}, text2_delay);
      
    // Set time interval for final fixation cross
      var cross3_delay = text2_delay + trial.text_delay;
      
    // Replace and display final fixation cross
      jsPsych.pluginAPI.setTimeout(function() {var fixation = $('#fixation').html(); display_element.innerHTML = fixation;}, cross3_delay);
      
      
    // End trial time interval  
      var end_time = cross3_delay + trial.fix_delay;
    
    // Finish trial after end_time has been reached
      jsPsych.pluginAPI.setTimeout(function() {
          
        // Save data
          var trial_data = {
              trial_num: trial.trial_num,
              block: trial.block,
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
              text_time: trial.text_delay,
              fix_time: trial.fix_delay
        };
          
        // Write to the console that the trial is over.
          console.log('trial finished');
          console.log(trial.sent1);
          
    // end trial
    jsPsych.finishTrial(trial_data);
      }, end_time);
      
  };
    
//  )};

  return plugin;
})();
