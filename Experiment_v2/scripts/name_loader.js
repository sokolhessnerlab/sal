function name_loader() {

    // Load in trial masculine names.
    $.ajax({
        url: "stimuli/CharacterNames.csv",
        async: false,
        success: function (csvd) {
            names = $.csv.toArrays(csvd);
        },
        dataType: "text",
        complete: function () {
            console.log('Names loaded.');
            // Shuffle up those sweet masculine names.
            exp.names = _.shuffle(names);
            console.log(exp.names);
        }
    })
    
    return exp.names
}