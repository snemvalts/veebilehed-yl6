(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();

            var amPM = h >= 12 ? 'PM' : 'AM';

            if (h === 0 && amPM === 'AM') {
                h = 12;
            } else if (h > 12) {
                h = h % 12;
            }

            if (h < 10) {
                h = "0" + (h % 12);
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + amPM;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        var linn = document.getElementById("linn");
        var eesnimi = document.getElementById("fname");
        var perenimi = document.getElementById("lname");


        if (eesnimi.value === '') {
            alert('Palun sisestage eesnimi!');
            eesnimi.focus();
            return;
        }

        if (/\d/.test(eesnimi.value)){
            alert('Eesnimes ei tohi olla numbreid');
            eesnimi.focus();
            return;
        }

        if (perenimi.value === '') {
            alert('Palun sisestage perekonnanimi!');
            perenimi.focus();
            return;
        }

        if (/\d/.test(perenimi.value)){
            alert('Perekonnanimes ei tohi olla numbreid');
            perenimi.focus();
            return;
        }

        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {

            const linnaHinnad = {
                'tln': 0,
                'trt': 2.5,
                'nrv': 2.5,
                'prn': 3,
            }

            e.innerHTML = `${linnaHinnad[linn.value]} &euro;`;
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }


    document.getElementById("form2").addEventListener("submit", submitDeliveryForm);

    function submitDeliveryForm(event) {
        event.preventDefault();

        console.log(event);
        var aadress = document.getElementById("address");
        var linn = document.getElementById("city");
        var tarnetüüpElement = document.querySelector('#form2 input[name="shipping"]:checked')
        var tarnetüüp = tarnetüüpElement ? tarnetüüpElement.value : null;

        if (aadress.value === '') {
            alert('Palun sisestage aadress!');
            aadress.focus();
            return;
        }

        if (linn.value === '') {
            alert('Palun sisestage linn!');
            linn.focus();
            return;
        }

        if (/\d/.test(linn.value)){
            alert('Linna nimes ei tohi olla numbreid');
            perenimi.focus();
            return;
        }

        if (!tarnetüüp || (tarnetüüp !== 'express' && tarnetüüp !== 'normal')) {
            alert('Palun valige tarnetüüp!');
            return;
        }

    }
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;

function GetMap() {
    
    "use strict";


    var centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    var anotherLocation = new Microsoft.Maps.Location(
        59.399753, 24.686402
    );

    var centerOfTwoPoints = new Microsoft.Maps.Location(
        (centerPoint.latitude + anotherLocation.latitude)/2,
        (centerPoint.longitude + anotherLocation.longitude)/2
    )

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerOfTwoPoints,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    var pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });


    var anotherPin = new Microsoft.Maps.Pushpin(anotherLocation, {
        title: 'Mustamäe',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });

    var infobox = new Microsoft.Maps.Infobox(anotherLocation, {
        visible: false,
        title: 'Mustamäe',
        description: 'Väike tekst mustamäest'
    });
    infobox.setMap(map);

    const anotherPinClicked = (e) => {
        infobox.setOptions({
            visible: true
        });
    };

    Microsoft.Maps.Events.addHandler(anotherPin, 'click', anotherPinClicked);


    map.entities.push(pushpin);
    map.entities.push(anotherPin);
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

