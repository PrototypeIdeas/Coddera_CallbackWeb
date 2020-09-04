//const host = "http://ec2-18-228-171-32.sa-east-1.compute.amazonaws.com:3000";
const host = "http://localhost:3004";

function callback() {
    $('#purecloud-callback').load(host + "/coddera-callback-widget", function () {
        $("#card_callback_logo_img").attr("src", host + "/img/gympass-logo.png");
        // $("#remove-callback-card-btn").css('background-image', 'url("' + host + '/img/X.png' + '")');

        var submitButton = document.getElementById('submit-callback');
        var tryAgainButton = document.getElementById('try-again-callback');
        // var openFormButton = document.getElementById('open-form-callback-button');
        var firstName = document.getElementById('first-name');
        var phoneNumber = document.getElementById('phone-number');
        // var removeBtn = document.getElementById('remove-callback-card-btn');
    
        // $('#callback-card').slideToggle("fast");
    
        // removeBtn.onclick = function () {
        //     $('#callback-card').slideToggle("fast");
        //     $('#open-form-callback-button').show();
        // }
    
        // openFormButton.onclick = function (){
        //     $('#callback-card').slideToggle("fast");
        //     $('#open-form-callback-button').hide();
        // }
    
        firstName.oninput = function (){
            if(firstName.value != "" && phoneNumber.value != ""){
                $('#submit-callback').prop("disabled", false);
            }
    
            if(firstName.value == "" || phoneNumber.value == ""){
                $('#submit-callback').prop("disabled", true);
            }
        }
        
        phoneNumber.oninput = function (){
            if(firstName.value != "" && phoneNumber.value != ""){
                $('#submit-callback').prop("disabled", false);
            }
    
            if(firstName.value == "" || phoneNumber.value == ""){
                $('#submit-callback').prop("disabled", true);
            }
        }

        tryAgainButton.onclick = function () {
            $('#phrase-nok').hide();
            $('#phrase').show();
            $('#form-callback').show();
            $('#description-nok').hide();
            firstName.value = "";
            phoneNumber.value = "";
            var data = {
                name: "",
                phone: ""
            };
        };
    
        submitButton.onclick = function () {
            $('#form-callback').hide();
            $('#phrase').hide();
            $('.callback_loader').show();
            var data = {
                name: firstName.value,
                phone: phoneNumber.value.replace(/ /g, '')
            };
            

            var xhttp = new XMLHttpRequest();
            xhttp.onloadend = function() {
                 if (this.readyState == 4 && this.status == 201) {
                    $('#phrase').hide();
                    $('.callback_loader').hide();
                    $('#description-ok').show();
                    $('#phrase-ok').show();
                 }else{
                    $('#phrase').hide();
                    $('.callback_loader').hide();
                    $('#description-nok').show();
                    $('#phrase-nok').show();
                 }
            };
            xhttp.open("POST", host + "/coddera-callback-widget/create", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            // console.log('Data: ' + JSON.stringify(data))	
            xhttp.send(JSON.stringify(data));    
        };
    });
};

callback();
