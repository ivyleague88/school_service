$(document).ready(function() {
    $(".login-btn").click(function(){
        $("#modal-login").modal("show");
        // Ideally show the person from SSL and prepopulate
    });

    function centerModal() {
        $(this).css("display", "block");
        var $dialog = $(this).find(".modal-dialog");
        var offset = ($(window).height() - $dialog.height()) / 4;
        // Center modal vertically in window
        $dialog.css("margin-top", offset);
    }

    $(".modal").on("show.bs.modal", centerModal);
    $(".home").each(function(){
        $(this).click(function(){
            window.location.href = "./index.html";
        });
    });
    $("#editProfile").click(function(){
        window.location.href = "./profileEdit.html";
    });
    $("#editProfileDone").click(function(){
        window.location.href = "./profile.html";
    });
   
    

    $(window).on("resize", function () {
        $(".modal:visible").each(centerModal);
    });
});