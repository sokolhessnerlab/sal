/*
 * Consent form plugin. Collects recontact question response and pushes it to exp.
 */

jsPsych.plugins["consent_plugin"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "consent_plugin",
    parameters: {
      text: {
        type: jsPsych.plugins.parameterType.HTML_STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {
      
      display_element.innerHTML = $(trial.text).html();
      
      //Setup automatic response to clicking continue
      $('#button').one('click', function() {
          $('#angry_box').text('Please answer all the questions before continuing.');
          $('button').unbind();
                })
      
      var active = 0;
      
    // Create helper function to activate continue button when all questions are answered.     
    var activate_continue = function () {
        $('#button').unbind('click');
        console.log('Activated!');
        
        // Save the recontact response and push it into exp.
        var recontact = $('input[name = recontact]:checked').val();     
        exp.recontact.push(recontact);
        console.log(recontact);
          
    // data saving
    var trial_data = {
      recontact: recontact
    };

    // end trial
    jsPsych.finishTrial(trial_data);
    }
      

// Check if radio button has been checked. If so, activate the continue button.
    $('.radio_css').click(function() {
        console.log('Activating!');
        $('#button').unbind('click');
        $('#button').one('click', function() {activate_continue()});
    });
    
        };

  return plugin;
})();
