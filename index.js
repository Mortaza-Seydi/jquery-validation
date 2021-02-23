"use strict"
$(function () {

    // user name tooltip
    new jBox("Tooltip", {
        attach: "#username",
        theme: "TooltipBorderThick",
        width: '500px',
        height: '50px',
        position: {
            x: "left",
            y: "center",
        },
        outside: "x",
        pointer: "top:15",
        content: "<div style='color: green;'>You can use letters, dots and underscore</div>",
        animation: "move",
    });

    // password tooltip
    new jBox("Tooltip", {
        attach: "#password",
        theme: "TooltipBorderThick",
        width: '400px',
        height: '60px',
        position: {
            x: "left",
            y: "center",
        },
        outside: "x",
        pointer: "top:15",
        content: "<div style='color: green;'>Use at least 8 characters. Don't use password from another site, or something to obvious</div>",
        animation: "move",
    });

    // dropdowns
    $("#month").select2({
        placeholder: {
            id: "-1",
            text: "Select an option",
        },
    });

    $("#gender").select2({
        placeholder: {
            id: "-1",
            text: "Select an option",
        },
    });

    // clear error label id data selected
    $('#month').on('select2:select', function (e) {
        $('#month-error').text('');
    });

    $('#gender').on('select2:select', function (e) {
        $('#gender-error').text('');
    });

    // check box
    $("#agree").iCheck({
        checkboxClass: "icheckbox_square-blue",
        radioClass: "iradio_square-blue",
        increaseArea: "20%", // optional
    });

    // disable or enable submit
    $('#agree').on('ifChecked', (event) => {
        $('#submit').prop('disabled', false);
    });

    $('#agree').on('ifUnchecked', (event) => {
        $('#submit').prop('disabled', true);
    });

    // custom validation methods
    $.validator.addMethod("username", function (value, element) {

        return this.optional(element) || value == value.match(/^[a-zA-Z._]+$/);

    }, "a-z, A-Z, ' . ' and ' _ ' only please");

    $.validator.addMethod("confirm_password", function (value, element) {

        return this.optional(element) || value === $('#password').val();

    }, "password does not match");

    // validate from
    $('#from').validate({
        // rule for every inout
        rules: {
            fname: "required",
            lname: "required",
            username: {
                required: true,
                username: true,
            },
            password: {
                required: true,
                minlength: 8,
            },
            c_password: {
                required: true,
                confirm_password: true
            },
            month: "required",

            day: {
                required: true,
                number: true,
                min: 1,
                max: 31
            },
            year: {
                required: true,
                number: true,
                min: 1800,
                max: 2020
            },
            gender: "required",
            agree: "required",
        },

        errorPlacement: function (error, element) {
            error.appendTo(`#${element.attr("name")}-error`);
        },

        errorClass: "error fail-alert",
        validClass: "valid success-alert",

        // error messages
        messages: {
            fname: {
                required: "First name is required<br>"
            },
            lname: {
                required: "Last name is required"
            },
            username: {
                required: "Username can't leave empty"
            },
            password: {
                required: "Please Enter a password",
                minlength: "password must be at least 8 characters"
            },
            c_password: {
                required: "Please confirm your password",
            },
            month: {
                required: "Select you birthday month<br>",
            },
            day: {
                required: "Day is required<br>",
                number: "Day must be integer<br>",
                min: "Day must be upper than 1<br>",
                max: "Day must be lower than 31<br>"
            },
            year: {
                required: "Year is required<br>",
                number: "Year must be integer<br>",
                min: "Year must be upper than 1800<br>",
                max: "Year must be lower than 2020<br>"
            },
            gender: {
                required: "Please select your Gender"
            }
        },

    });
});
