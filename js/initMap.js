// BICYCLING or RUNNING

let calcRoute;

function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var saoPaulo = new google.maps.LatLng( -23.5503099, -46.6363896 );
    var mapOptions = {
        language: 'pt-BR',
        center: saoPaulo,
        zoom: 17,
        zoomControl: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        units: 'metric'
    }

    calcRoute = function(selectedMode) {
        document.getElementsByClassName('busca-wrapper')[0].classList.add('busca-hidden');
        document.getElementsByClassName('resultados')[0].classList.remove('resultados-hidden');

        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        if (start == '' || end == '') {
            alert('Por favor, preencha os dois campos.');
            return;
        } else if (start == end) {
            alert('Por favor, busque por endereços diferentes.');
            return;
        }
        var request = {
            origin: start,
            destination: end,
            travelMode: selectedMode,
            language: 'pt-BR'
        };
        directionsService.route(request, function(result, status) {
            if (status == 'OK') {
            directionsRenderer.setDirections(result);
            }
    
            let duracao = result.routes[0].legs[0].duration.text;
            
            let horasPos = duracao.indexOf("hour");
            let minPos = duracao.indexOf("min");
            let horas = duracao.slice(0, horasPos-1);
            let minutos;

            let distancia = parseFloat(result.routes[0].legs[0].distance.text.replace(' km', ''));
            
            document.getElementsByClassName('economia-gco2')[0].innerHTML = parseInt(distancia*200)+"gCO²";

            document.getElementsByClassName('economia-money')[0].innerHTML = 'R$'+ parseInt(parseInt(distancia)*5);

            if (horasPos != -1 && horasPos != 0 && horasPos != NaN) {
                minutos = duracao.slice(minPos-3, minPos-1);
                duracao = horas + "h e " + minutos + "min";
            } else {
                minutos = duracao.slice(0, minPos-1);
                duracao = minutos + "min";
            }
            
            if (selectedMode == 'WALKING') {
                document.getElementById('res-andando-texto').innerHTML = duracao;
                document.getElementById('res-bike-texto').innerHTML = '';

                document.getElementById('res-bike-texto').classList.add('res-hidden');
                document.getElementById('res-andando-texto').classList.remove('res-hidden');
                document.getElementById('bike-icon').classList.remove('res-icon-selected');
                document.getElementById('andando-icon').classList.add('res-icon-selected');
            } else {
                document.getElementById('res-bike-texto').innerHTML = duracao;
                document.getElementById('res-andando-texto').innerHTML = '';

                document.getElementById('res-bike-texto').classList.remove('res-hidden');
                document.getElementById('res-andando-texto').classList.add('res-hidden');
                document.getElementById('bike-icon').classList.add('res-icon-selected');
                document.getElementById('andando-icon').classList.remove('res-icon-selected');
            }
        });
    };
    
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    directionsRenderer.setMap(map);
}

