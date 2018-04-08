$(document).ready(function(){
    $(".delete-button").click(function(event) {
        if( !confirm('Are you sure?') )
            event.preventDefault();
    });
});

