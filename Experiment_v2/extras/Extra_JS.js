//Random Javascript scraps I'd like to keep.

//Maping to create empty array
 var clicked = Array.apply(null, Array(9)).map(function () {});

// Serialize array and fill it in with values using key-value pairs. Very cool stuff!!
                var values = {};
$.each($('#post_block_questions').serializeArray(), function(i, field) {
    values[field.name] = field.value;
});
          console.log(document.forms[0].elements[0].value);
          console.log(values);