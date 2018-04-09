$(document).ready(function(){
    $(".delete-button").click(function(event) {
        if( !confirm('This will delete this entire bird page.-- Are you sure?') )
            event.preventDefault();
    });
});

