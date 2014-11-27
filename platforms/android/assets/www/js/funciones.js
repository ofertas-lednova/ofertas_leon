function register(pushNotification) {
	
	console.log("Llamada funcion register");

    if (isAndroidDevice()) {
		
		console.log("Es Android");

		//PushNotification.prototype.register = function(successCallback, errorCallback, options)
        pushNotification.register(function(result) {   
		
            console.log('Status: ' + result);
			
        }, function(result) {
		
            //alert('Error handler ' + result);
			//handle error
			
        }, {
		
            "senderID": "494276173425", /* Google developers project number */
            "ecb" : "onNotificationGCM" /* Function name to handle notifications */
        });
		
    } else {
	
        alert('El dispositivo no es Android!');
    }   
}

function onNotificationGCM(e) {
	
    switch (e.event) {
	
        case 'registered':
			
			console.log("Registered");

            if (e.regid.length > 0) {
			
                console.log("Regid > 0 " + e.regid);

				var registrationId = e.regid; //GCM Registration ID
                registerOn3rdPartyServer(registrationId);
            }
			
            break;
 
        case 'message':
		
			console.log("Message");

            if (e.foreground) {
			
                //alert('FOREGROUND MSG:' + JSON.stringify(e));
                //alert(e.message);
				
				$( "#dialog" ).dialog("open");
				
            } else if (e.coldstart) {
			
                //alert('COLDSTART MSG:' + JSON.stringify(e));
				alert(e.message);
				
            } else {
			
                alert('BACKGROUND:' + JSON.stringify(e));
            }
			
            break;
 
        case 'error':
		
			console.log("Error");
            // handle error
            break;
 
        default:
			
			console.log("Default");
            // handle default
            break;
    }
}

function registerOn3rdPartyServer(registrationId) {
	
	console.log("Llamada funcion registerOn3rdPartyServer");

    $.ajax({
        type: "POST",
        url: "http://192.168.0.44:8080/ofertas_leon/servicio.php", /* Your gcm-rest registration endpoint */
        data: {
		
            "gcm": registrationId
        },
        headers : {
		
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        success: function() {
		
            //statusElement.html('READY FOR NOTIFICATIONS');
        },
        error: function(e) {
		
            alert("Unable to register " + JSON.stringify(e));
        }
    });
}

function isAndroidDevice() {
	
	var ua = navigator.userAgent.toLowerCase();
	
	if (ua.indexOf("android") > -1) {
	
		return true;
	}
	
}