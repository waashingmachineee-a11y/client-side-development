$(document).ready(function(){

    // Load cookies
    let cookies = document.cookie.split("; ");
    cookies.forEach(function(c){
        let [key, value] = c.split("=");
        if(key === "name") $("#name").val(value);
        if(key === "email") $("#email").val(value);
    });

    // Fix labels if pre-filled
    $(".form-control").each(function(){
        if($(this).val() !== ""){
            $(this).next("label").css({
                top: "-10px",
                fontSize: "12px",
                color: "#00f7ff"
            });
        }
    });

    $("#contactForm").submit(function(e){
        e.preventDefault();

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let subject = $("#subject").val().trim();
        let message = $("#message").val().trim();
        let errorMsg = "";

        if(name === "" || email === "" || subject === "" || message === "") {
            errorMsg = "All fields are required.";
        } else {
            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if(!email.match(emailPattern)) {
                errorMsg = "Enter a valid email.";
            }
        }

        if(errorMsg !== "") {
            $("#errorMsg").text(errorMsg);
            return;
        }

     
        document.cookie = "name=" + name + "; max-age=" + (7*24*60*60);
        document.cookie = "email=" + email + "; max-age=" + (7*24*60*60);

        $("#errorMsg").text("");
        alert("✅ Message sent!");
        $("#contactForm")[0].reset();
    });

});$(document).ready(function(){

    // Load cookies
    let cookies = document.cookie.split("; ");
    cookies.forEach(function(c){
        let [key, value] = c.split("=");
        if(key === "name") $("#name").val(value);
        if(key === "email") $("#email").val(value);
    });

    // Fix labels if pre-filled
    $(".form-control").each(function(){
        if($(this).val() !== ""){
            $(this).next("label").css({
                top: "-10px",
                fontSize: "12px",
                color: "#00f7ff"
            });
        }
    });

    $("#contactForm").submit(function(e){
        e.preventDefault();

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let subject = $("#subject").val().trim();
        let message = $("#message").val().trim();
        let errorMsg = "";

        if(name === "" || email === "" || subject === "" || message === "") {
            errorMsg = "All fields are required.";
        } else {
            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if(!email.match(emailPattern)) {
                errorMsg = "Enter a valid email.";
            }
        }

        if(errorMsg !== "") {
            $("#errorMsg").text(errorMsg);
            return;
        }

        // Save cookies
        document.cookie = "name=" + name + "; max-age=" + (7*24*60*60);
        document.cookie = "email=" + email + "; max-age=" + (7*24*60*60);

        $("#errorMsg").text("");
        alert("✅ Message sent!");
        $("#contactForm")[0].reset();
    });

});