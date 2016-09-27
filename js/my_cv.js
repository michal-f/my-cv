/**
 * Created by M.Frackowiak on 01.07.2016.
 */

$(document).ready(function () {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
        var div_list = ["#home", "#resume", "#profile", "#portfolio", "#blog", "#contact", "#my-profile", "#blog-section"];
        var animation_class_pairs = [
            ["vanishIn", "vanishOut"]
            //["slideDownRetourn", "vanishOut"],
            //["puffIn", "puffOut"],
            //["vanishIn", "vanishOut"],
            //["spaceInUp", "spaceOutUp"],
            //["spaceInRight", "spaceOutRight"],
            //["spaceInDown", "spaceOutDown"],
            //["spaceInLeft", "spaceOutLeft"],
            //["boingInUp", "boingOutDown"],
            //["foolishIn", "foolishOut"],
            //["perspectiveDownRetourn", "perspectiveDown"],
            //["perspectiveLeftRetourn", "perspectiveLeft"],
            //["perspectiveRightRetourn", "perspectiveRight"],
            //["slideDownRetourn", "slideDown"],
            //["slideUpRetourn", "slideUp"],
            //["openDownLeftRetourn", "openDownLeft"],
            //["openDownRightRetourn", "openDownRight"],
            //["openUpLeftRetourn", "openUpLeft"],
            //["openUpRightRetourn", "openUpRight"],
        ];

        /*#### MENU ITEM LIST #####*/
        var currentDiv = "home";
        var currentMenuItem = $("#menu-menu-1 > li > a:nth-child(7)");
        var clickedMenuItem;
        var blockChanging = false;

        function change_div(clicked) {
            blockChanging = true;
            $("#menu-menu-1 > li > a").addClass("btntextgrey");
            $("#mfstart").addClass("btntextgrey");
            var menu_clicked = clicked;
            currentDiv = menu_clicked;

            /*RANDOMIZE ANIMATION*/
            var random_int = Math.floor((Math.random() * animation_class_pairs.length));
            var animation_in = animation_class_pairs[random_int][0];
            var animation_out = animation_class_pairs[random_int][1];

            /*CHECK VISIBLE AND CLICKED DIV */
            var visible_div, visible_div_animate_out_class;
            var clicked_div, clicked_div_animate_in_class;
            for (i in div_list) {
                if ($(div_list[i]).is(":visible")) {
                    visible_div = $(div_list[i]);
                    visible_div_animate_out_class = "magictime " + animation_out;
                }
                if (div_list[i].toLowerCase().substring(1) == menu_clicked) {
                    clicked_div = $(div_list[i]);
                    clicked_div_animate_in_class = "magictime " + animation_in;
                }
            }

            /* TRANSFORM*/
            visible_div.addClass(visible_div_animate_out_class);

            /*TIMEOUT WAIT FUNCTION FOR DIV HIDING*/
            setTimeout(function () {
                for (i in div_list) {
                    $(div_list[i]).hide();
                }
                visible_div.removeClass(visible_div_animate_out_class);
                clicked_div.addClass(clicked_div_animate_in_class);
                clicked_div.show();
            }, 800);
            setTimeout(function () {
                clicked_div.removeClass(clicked_div_animate_in_class);
                blockChanging = false;
                $("#menu-menu-1 > li > a").removeClass("btntextgrey");
                $("#mfstart").removeClass("btntextgrey");
                if (clicked_div.hasClass("contact"))
                    myMap();
            }, 1700);
        }
        
        $("#menu-menu-1 > li > a").click(function () {
            if (currentDiv != $(this).text().toLowerCase() && blockChanging == false) {
                clickedMenuItem = $(this);
                clickedMenuItem.addClass("btn-primary");
                if (currentMenuItem.hasClass("btn-primary")) {
                    currentMenuItem.removeClass("btn-primary");
                }
                change_div(clickedMenuItem.text().toLowerCase());
                currentMenuItem = clickedMenuItem;

            }
        });
        /*NAME CLICK EVENT -> HOME PAGE*/
        $("#mfstart").click(function () {
            if (blockChanging == false) {
                change_div("home");
                currentMenuItem.removeClass("btn-primary");
            }
        });


        /*PROFILE CLICK EVENT -> PROFILE PAGE*/
        function addClickIfVisible() {
            var viewprofilebtn = $("#viewprofile");
            var viewprofilenavbtn = $("#menu-menu-1 > li:nth-child(1) > a:nth-child(1)");
            if (viewprofilebtn.is(":visible")) {
                viewprofilebtn.click(function () {
                    if (blockChanging == false) {
                        change_div("profile");
                        currentMenuItem.removeClass("btn-primary");
                        viewprofilenavbtn.addClass("btn-primary");
                        currentMenuItem = viewprofilenavbtn;
                    }
                });
            }
            else {
                setTimeout(addClickIfVisible, 500);
            }
        }
        addClickIfVisible();


    /*CONTACT FORM HANDLER*/
        alert("hello");
    $("#submit").click(function () {
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var contact = $("#contact2").val();
        $("#returnmessage").empty(); // To empty previous error/success message.
// Checking for blank fields.
        if (name == '' || email == '' || contact == '') {
            alert("Please Fill Required Fields");
        } else {
// Returns successful data submission message when the entered information is stored in database.
            $.post("./php/contact_form.php", {
                name1: name,
                email1: email,
                message1: message,
                contact1: contact
            }, function (data) {
                $("#returnmessage").append(data); // Append returned message to message paragraph.
                if (data == "Your Query has been received, We will contact you soon.") {
                    $("#form")[0].reset(); // To reset form fields on success.
                }
            });
        }
    });





});