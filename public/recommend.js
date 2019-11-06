'use strict'

$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var key = urlParams.get('id');
    console.log(key);

    firebase.database().ref('images').orderByChild('id').equalTo(key).once('value').then(function(snapshot) {
        const content = snapshot.val()
        //console.log(content);
        //console.log(content);
        const main = Object.keys(content);
        //console.log(main[0]);
        //console.log(content[main[0]].similar);
        const neighbors = content[main[0]].similar;

        for (var i = 0; i < neighbors.nearest_neighbors.length; i++) {
            let code = neighbors.nearest_neighbors[i][0];
            let url = 'https://images.nga.gov/?service=asset&action=show_preview&asset=' + code;
            //let info = 'https://www.nga.gov/collection/art-object-page.' + code + '.html';
            $('<div>',{
                'class' : 'card',
                //'target' : '_blank',
                //'href' : info,
                'html': $('<img>',{
                  'class' : 'card-img-top',
                  'src' : url,
                })
            }).appendTo('.card-columns');
        }
    })
});

$(document).ready(function() {
    setTimeout(
        function() {
            $('.loader').toggle();
            $('.card-columns').toggle();
        }, 12000);
});