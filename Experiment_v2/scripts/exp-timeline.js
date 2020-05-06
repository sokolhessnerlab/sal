$(document).ready(function() {
    $('#templates').hide();
    
    //TO DO: Maybe fiddle with image preloading? Also definitely cut down on the length of the task!!
    
    // Main timeline
    exp_timeline = [];
    
    // Variables to hold data   
    exp = {};
    exp.recontact = []; // Store info re: whether participant wants to be recontacted.
    exp.image_names = [];
    exp.pract_names = ['Carl', 'Todd'];
    exp.names = [];
    exp.pract_sent = ['{0} ate a sandwich.', 'It was lunchtime.', 
                      '{0} opened a window.', 'The room was warm.']
    traj_data = trajectory_creator();
    exp.vignettes = traj_data[0];
    exp.sent_order = traj_data[1];
    
    // Grab subject ID from SONA URL
    var params = new URLSearchParams(location.search);
    exp.subjID = params.get('subjectID'); 
    
    // Load in images and names
    exp.image_names = image_loader(); 
    exp.names = name_loader();
    
    // Choose last image in shuffled image array and make it the practice image!
    exp.prac_img = _.last(exp.image_names);
    
    // Randomize practice names
    exp.pract_names = _.shuffle(exp.pract_names)
    
    // Timeline sub-parts
    var intro = {type: 'consent_plugin',
                text: '#Introduction'};
    
    exp_timeline.push(intro);
    
    // Run through instructions
    
    var instruct_trials = {
        timeline: [
            {type: 'text_display', text: '#Instructions', text_type: 'Instruct'},
            {type: 'text_display', text: '#Instructions_2', text_type: 'Instruct_2'},
            {type: 'text_display', text: '#Instructions_3', text_type: 'Instruct_3'},
            {type: 'text_display', text: '#Instructions_4', text_type: 'Instruct_4'},
            {type: 'text_display_img', text: '#Instructions_5', text_type: 'Instruct_5', img: exp.image_names[80]},
            {type: 'text_display', text: '#Instructions_6', text_type: 'Instruct_6'},
            {type: 'text_display', text: '#Instructions_7', text_type: 'Instruct_7'}
                          ]};
    
    exp_timeline.push(instruct_trials);
    
    var instruct_end = {type: 'instruct_end',
                       text: '#Instructions_End',
                       text_type:'Instruct_End'};
    
    exp_timeline.push(instruct_end);
    
    // End of instructions text, shown if instructions were repeated.
    var instruct_end_redux = {type: 'text_display',
                             text: '#instruct_end_redux',
                             text_type: '2nd_instruct_end'};
    
    // If participant clicks "Continue", skip instruct loop. Otherwise, cycle through again. 
        var repeat = {
    timeline: [instruct_trials, instruct_end_redux],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check which button was pressed
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.choice == 'continue'){
            return false;
        } else {
            return true;
        }
    }
}
    exp_timeline.push(repeat);
    
    // Practice Trial Section
    
    var pract_intro = {type: 'text_display',
                     text: '#Practice_Intro',
                     text_type: 'Practice_Intro'};
    
    exp_timeline.push(pract_intro);
    
    var practice_person_intro = {type: 'person_intro',
                                 text: '#Person_Intro',
                                 character: exp.pract_names[0],
                                 img: exp.prac_img,
                                 block: 0};
    
    exp_timeline.push(practice_person_intro);
    
    // Practice trial loop. 2 trials, random name and order. 0 indicates practice!
    var practice_procedure = {
        timeline: [
            {
                type: 'trial_plugin',
                img: exp.prac_img,
                sent1: jsPsych.timelineVariable('sent1'),
                sent2: jsPsych.timelineVariable('sent2'),
                block_type: 'PRAC',
                shift_type: 'PRAC',
                traj_start: 'PRAC',
                traj_end: 'PRAC',
                text_delay: 4000,
                fix_delay: 1000,
                trial_num: 0,
                block: 0
            },
            {
                type: 'slider_plugin',
                text: '#Liking_Question',
                question: 'Like',
                trial_num: jsPsych.timelineVariable('trial_num'),
                block: 0
            },
            {
                type: 'slider_plugin',
                text: '#Connect_Question',
                question: 'Connect',
                trial_num: jsPsych.timelineVariable('trial_num'),
                block: 0
            }
        ],
        timeline_variables: [
            {sent1: '<p>' + exp.pract_sent[0].format(exp.pract_names[0]) + '</p>', 
             sent2: '<p>' + exp.pract_sent[1] + '</p>',
            trial_num: 0},
            {sent1: '<p>' + exp.pract_sent[2].format(exp.pract_names[0]) + '</p>',
             sent2: '<p>' + exp.pract_sent[3] + '</p>',
             trial_num: 0}
        ],
        randomize_order: true // Is it worth it? Screws with trial_num.
    }
    
    exp_timeline.push(practice_procedure);
    
    var end_practice = {type: 'text_display',
                        text: '#End_Practice',
                        text_type: 'End_Practice'};
    
    exp_timeline.push(end_practice);
    
    // Experiment Block and Trials Loop. 12 Blocks, 120 trials in total.
    
    for (ii = 0; ii < 12; ii++) {
        // Person Introduction page
        var person_intro = {type: 'person_intro',
                           text: '#Person_Intro',
                           character: exp.names[ii][0],
                           img: exp.image_names[ii],
                           block: ii};
        exp_timeline.push(person_intro);
        
        // Main task trial
        for (i = 0; i < 10; i++) {     
            var task_procedure = {
                timeline: [
                    {
                        type: 'trial_plugin',
                        img: exp.image_names[ii],
                        sent1: '<p>' + exp.vignettes[ii][i][exp.sent_order[(ii * 10) + i ][0]].format(exp.names[ii][0]) + '</p>',
                        sent2: '<p>' + exp.vignettes[ii][i][exp.sent_order[(ii * 10) + i ][1]].format(exp.names[ii][0]) + '</p>',
                        block_type: exp.vignettes[ii][i]['block_type'],
                        shift_type: exp.vignettes[ii][i]['shift_type'],
                        traj_start: exp.vignettes[ii][i]['traj_start'],
                        traj_end: exp.vignettes[ii][i]['traj_end'],
                        text_delay: 4000,
                        fix_delay: 1000,
                        trial_num: i,
                        block: ii
                    },
                    {
                        type: 'slider_plugin',
                        text: '#Liking_Question',
                        question: 'Like',
                        trial_num: i,
                        block: ii
                    },
                    {
                        type: 'slider_plugin',
                        text: '#Connect_Question',
                        question: 'Connect',
                        trial_num: i,
                        block: ii
                    }
                ]
            }
            exp_timeline.push(task_procedure);
        }
        
        // Post-block intro
        var post_block_intro = {type: 'person_intro',
                               text: '#post_block_intro',
                               character: exp.names[ii][0],
                               img: exp.image_names[ii],
                               block: ii};
        exp_timeline.push(post_block_intro);
        
        // Post-block character questions
        var post_block_procedure = {type: 'block_questions',
                                    text: '#block_questions',
                                    block_num: ii,
                                    character: exp.names[ii]
                                   };
        
        exp_timeline.push(post_block_procedure);
    }
    
// Loop through post-task character-specific questions - Characters looped through in order to help with memory.
    
    // General post-task introduction
    var posttask_intro = {type: 'text_display',
                               text:'#post_task_intro',
                               text_type: 'posttask_intro'};
    
    exp_timeline.push(posttask_intro);
    
    // Loop through characters and ask post-task questions for each.
    for (j = 0; j < 12; j++) {
        var pt_char_questions = {
            timeline: [
                {
                    type: 'person_intro',
                    text: '#pt_person_intro',
                    character: exp.names[j],
                    img: exp.image_names[j],
                    block: j
                },
                {
                    type: 'post_task',
                    character: exp.names[j],
                    block: j
                }
            ]
        }
        
        exp_timeline.push(pt_char_questions);
    }
    
// Post-task general affiliation questions intro
    var pt_gen_intro = {type: 'text_display',
                       text: '#pt_gen_intro',
                       text_type: 'pt_gen_intro'};
    
    exp_timeline.push(pt_gen_intro);
    
// Post-task general affiliation questions. 
    var pt_general_questions = {type: 'pt_general_questions',
                               text: '#post_task_general'};
    
    exp_timeline.push(pt_general_questions);
 
// Final task comments
    var comments = {type: 'comments_plugin',
                   text: '#post_task_comments',
                   text_type: 'posttask_comments'};
    
    exp_timeline.push(comments);
    
// Debrief!!
    var debrief = {type: 'text_display',
                  text: '#debrief',
                  text_type: 'debrief'};
    
    exp_timeline.push(debrief);
    
// Recontact form (embedded Qualtrics link)
    var qualtrics = {type: 'text_display',
                text: '#qualtrics',
                text_type: 'recontact'};

// If participant clicked 'No' on consent, skip this. Otherwise, display recontact form.
    var recontact = {
        timeline: [qualtrics],
        conditional_function: function(){
        if(exp.recontact == 'No'){
            return false;
        } else {
            return true;
        }
    }
}
    exp_timeline.push(recontact);
    
    var thanks = {type: 'end_plugin',
                 text: '#Thanks',
                 text_type: 'Finish'};
    
    exp_timeline.push(thanks);
    
// Function to save data to server
    function saveData(name, data) {
        console.log('saveData running!');
        $.ajax({
            data: JSON.stringify({filename: name, filedata: data}),
            url: 'scripts/write_data.php',
            method: 'POST', 
            success: function() {
                console.log('Data saved.');
            }
        });  
    }
      
    // Run this sweet sweet timeline and get data              
    jsPsych.init({
        display_element: 'jspsych-target',
        timeline: exp_timeline,
        on_finish: function(){
            var data = jsPsych.data.get();

//             DEBUG: Show data on browser (comment out when no longer in debug mode!)
//            jsPsych.data.displayData();
            
            // Save data to server!
            saveData(exp.subjID, data.csv());
        }
    });
});
              