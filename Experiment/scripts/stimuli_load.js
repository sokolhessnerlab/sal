/*
* Separate Javscript script for loading in stimuli - images and sentences
*/

var preload = 'images/Cat_{0}.jpg';

    for (i = 1; i < 3; i++) {
//        images[i] = new Image();
//        images[i].src = preload.format(i);
        //exp.image_names = ['images/face_{0}.jpg'.format(i)];
        exp.image_names.push('images/Cat_{0}.jpg'.format(i))
       }