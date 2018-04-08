// clicking edit beside each field will show paired edit_class to let the user edit the field
$(document).ready(function(){

    $("span").click(function(){
        var edit_class = this.className;
        $('.'+edit_class).show();
        $("#edit-submit-button").show();
    });

});