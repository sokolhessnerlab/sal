function image_loader() {

    // Load (and preload!) images from folder - tweak for actual CFD images soon!!
    // Images preloaded so there isn't a delay in presentation. Probably not a significant issue for a task like this, where images are shown before the trials get underway, but nevertheless.
    var folder = "images"; // Folder to grab images. 
    var images = [];
    
    $.ajax({
        url : folder,
        async: false,
        success: function (data) {
            // Function to find image files in folder, preload them, and add them into exp.image_names
            $(data).find("a").attr("href", function (i, val) {
                if( val.match(/\.(jpe?g|png|gif)$/) ) {
                    //AWS specific. Adds folder name to string. Not necessary in Brackets, for some reason. Lol.
                    combo = 'images/' + val;
                    images[i] = new Image();
                    images[i].src = combo;
                    exp.image_names.push(combo);
                }
            });
        },
        complete: function () {
            // After all images are loaded in, shuffle image names so no one gets the same images in the same order.
            exp.image_names = _.shuffle(exp.image_names);
            console.log('Images loaded!');
        }
    });
    
    return exp.image_names
}