# SHLab_Pilot
Social Affiliation + Learning Study (Pilot)

## Study Design (07/2019 - 09/2019)
List of papers read:
- Brosch et al. (2013)
- Lapate et al (2013)
- Mann & Ferguson (2015)
- Mende-Siedlecki et al (2013)
- Siegel et al (2018)
- Tavares et al (2015)
- FeldmanHall (2017)

Current design of the study, including hard numbers:
- Design of study heavily borrows from Brosch (2013), and also looks pretty similar to Mende-Siedlecki (2013)
- Participants learn about 10 characters with random milquetoast masculine names (blocks)
- Each character has 10 vignettes about them (10 trials/block)
- 4 of them are "controls" (eg. Positive + Situational)
- 6 of them are "trajectory types" - Start at one Valence and one Attribution type, and one or both switch halfway through the task.
- At the end of each block, participants answer questions about their feelings toward the character.
- At the end of all 10 blocks, participants answer general questions about their feelings toward social affiliation + more questions about the characters in isolation/in relation to each other. Also ask a couple memory check questions, just to make sure they haven't completely forgotten. (But also, to see how interesting it would be to look at who is more memorable!)
- Each sentence of the vignette is intended to be presented one at a time in a counterbalanced order (half the time action comes first, other half context comes first).
- Each sentence is displayed for __ seconds.
- Then 2 analog scale questions, one at a time: How likable is this person? How much would you like to connect with this person? 10 seconds to respond for each - after 10 seconds of no response, the task skips to the next question/next trial. Otherwise, the task moves forward immediately upon receiving a response.
- Estimated time to complete: 1 hour.

Current Hypotheses:
- Liking ratings will be distinct from desire to connect.
- Evidence for 3 dimensions of social connection, affiliation, power, and value (the last one is mine, woop!)
- People will be sensitive to trajectories/changes in the info learned.
- Negativity bias in assessments


** Check out Pan NSF GRFP 2018 application materials for a general overview **

## Vignette Development + Norming (09/2019 - Present)
- Vignettes originally obtained from Tobias Brosch, previously used in his paper Brosch et al (2013)
- Edited to remove names, changed all to masculine pronouns. Other edits include slight changes to content in order to fit dimensions (Valence - Pos/Neg, Attribution - Sit/Disp). Additional vignettes were written up to fill out each dimension. 121 were written up in total.
- **Master norming folder: SAL_Norming_Task**

### Norming Vignettes Round 1 (10/2019)
- *Master folder of task: SAL_Norming_Internal*
- *Analysis file: SAL_Norming_R1.Rmd*
- *Vignette file: SAL_Coding.xlsx (scrambled for each person)*
- Initial norming was internal - 3 people within the department rated each vignette on Positive, Negative, Situational, Dispositional. Each was on a 1-7 scale (1 being not very, 7 being very much). Each person saw the full list of vignettes in a spreadsheet (order randomized for each). Names were replaced with {0} (Javascript placeholder). Coders had option to include comments for each vignette.
- Coders received no compensation.
- Action was presented first, while context was sentence 2.
- Vignettes with highest level of variance in each dimension (Pos, Neg, Sit, Disp) were isolated and edited to increase coder agreement. (For example, if 2 coders thought a vignette was very positive, but the 3rd person didn't, the vignette would be reworded/changed to increase positivity.)

### Norming Vignettes Round 2 (11/2019)
- *Master folder of task: SAL_Norming_SONAr1*
- *Analysis file: SAL_sonaR1_analysis.Rmd*
- *Vignette file: SAL_Vignettes_TP_Shuffled_NoMO.csv*
- Task was hosted on AWS EC2. Use CyberDuck to access server to replace the task on the site and to get the data off of the surver.
- Edited vignettes had name placeholders ({0}) replaced with "This person" to reduce confusion/awkwardness when observed by general coders.
- Norming task was designed as an online study placed on DU's SONA system. Participants were shown vignettes, 1 at a time (both sentences presented at the same time, action first situation/context second). Underneath were 3 analog scales (1-100, values not displayed to participants) which asked the extent to which the vignettes were Positive or Negative, Situational/Dispositional, and Useful. While the first two questions were intended to nail down dimensions for the vignettes, "usefulness" question was added as a way of getting some measures of "Value," our potential 3rd dimension of social connection. Participants are untimed, so they can take as long as they'd like to respond to each vignette and change each response until they're ready to move on (by pressing a Continue button at the bottom of each vignette page). At the very end, participants are asked to explain how they made their ratings and are provided an empty comment box for any additional comments/concerns.
- Participants were consented online using our previously approved IRB online consent form with relevant modules added. At the end of the task, participants were shown a short debrief describing the purpose of the task, which they could print out or screenshot as necessary/desired.
- Vignettes were initially randomized (when initially writing them, wrote and ordered such that 30 PosSit, then 30 PosDisp, etc - randomized to avoid having the vignette ID number correlate with vignette dimensions, and also to avoid participants seeing only a subset of available vignette types), and then participants observed either the first 60 or the second 61 depending on what second (ex. HH:MM:SS <-- last digit used) they accessed the task and whether it was even (1st 60 vignettes) or odd (second 61 vignettes).
- Participants received 1 chit in exchange for completing the task, and task duration was self-paced, but estimated to take no longer than 30 minutes.
- Raw n = 22
- Final n = 17 (2 files removed for 2 people taking the task a second time, 1 person removed for repeating their ratings across most of the task, 1 person removed for very low RT/confusion over task, 1 person removed for very low RT. Low RT = most trials took ~3-4 seconds.)

**Findings (12/2019)** 
- High correlation between Valence and Usefulness. Is this because there's genuinely a correlation between valence and usefulness, or does it have something to do with the wording of usefulness in our task? Additionally, something to do with the way participants are thinking about usefulness? For example, it may be extremely useful that a person knows how to scale a building, or hotwire a car, but it may not be useful to *me* because a person willing to steal cars may be untrustworthy/unlikely to help me. 
- Situational vignettes are overrepresented in comparison to dispositional vignettes.

**Next Steps**
- Tweak 5-10 pos and 5-10 neg vignettes to try and increase dispositionality.
- Revisit language used to describe usefulness. 
- Start preparing round 2 of SONA norming, to kick off in January!! (Maybe include some direct way to link SONA participant to ID numbers? put randomized ID in SONA html link? IDK.) Goal is 20 ratings of each dimension per vignette, which means a minimum of 40 participants.
- Start thinking about potential tweaks to pilot design!

### Norming Vignettes Round 3 (12/2019)
- *Master folder of the task: SAL_Norming_SONAr2*
- *Analysis file: Insert here*
-  *Vignette file: vignettes_v3.csv*
- Raw n = 40
- Final n = 40

**Changes**
- 9 vignettes were added, 1 pos/disp, 8 neg/disp. 11 vignettes were edited to be more strongly dispositional, 2 neg and 9 pos. The vignettes chosen to be edited were those that were close to the borderline in terms of avg_Att ratings (~40 score) and seemed easiest to tweak to become more dispositional. New total vignettes is 130.
    - Slightly more neg/disp vignettes because of the distribution 
    - Vignettes reshuffled to incorporate the new ones that had been written.
- Task tweaked to grab worker ID from URL.


## Pilot Details
- Built in jsPsych (Summer/Fall 2019)
- Intended to be piloted on mTurk
- See "Study Design" for details about the design!
- 


