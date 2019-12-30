$(document).ready(()=> {

    let idUser = localStorage.getItem('id');

    const geolocation = navigator.geolocation;

    const location = new Promise((resolve, reject) => {
        geolocation.watchPosition(posicao => {
            resolve(posicao.coords);
        }, err => {
            reject();
        });
    });

    location.then(resp => {
        let lat = 0, lng = 0;
        lat = resp.latitude;
        lng = resp.longitude;
        setMap(lat, lng);
    }).catch(() => {
        setMap();
    });


    function setMap(lat = 0, lng = 0) {

        map = L.map('map', {zoomControl: false}).setView([lat, lng], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 2, maxZoom: 19 }).addTo(map);

        if(lat && lng) {
    
            var Location = L.icon({
                iconUrl: 'http://icon-park.com/imagefiles/location_map_pin_pink7.png',
                iconSize: [60, 70],
            });
    
            L.marker([lat, lng], { icon: Location }).addTo(map)
                .bindPopup('<img src="http://hinodenaparaiba.com.br/wp-content/uploads/2017/07/rede.png" class="img-responsive img-rounded detailimage" style=" width: 100%; height: 100%; border-radius:0px"><br><img style="display: inline;" src="https://www.finurabyricha.com/wp-content/uploads/2019/01/ShyCautiousAfricanpiedkingfisher-max-1mb.gif" width="40px" height="40px"><p style="display: inline; margin-left: 10px; color: #27ae60;">Sua geolocalização</p>');
    
            var Icon = L.icon({
                iconUrl: 'https://icon-library.net/images/ptz-icon/ptz-icon-21.jpg',
                iconSize: [50, 50],
            });
        }


                $.get(`http://localhost:8080/cameras/${idUser}`).done(res => {

                listcamMap = '';

                res.map(res => {

                const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
                const API_KEY = 'AIzaSyCjYhQMkyHX5zElBnaglrn8_6eDEBf3e3E';

                const doRequest = url => {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: url,
                            type: 'GET',
                            success: resolve,
                            error: reject
                     });
                });
       }

                const getApiUrl = address => {
                return `${API_URL}?key=${API_KEY}&address=${encodeURI(address)}`;
        }

                const address = res.localidade;

            (async () => {
                const apiUrl = getApiUrl(address);
                const data = await doRequest(apiUrl);
    
            if (!data || data.error_message) {
                const message = (data && data.error_message) ? data.error_message : 'Api Error';
                console.log(message);
                return;
            }
    
            if(data.results.length > 0) {
                console.log('latitude:'+data.results[0].geometry.location.lat);
                console.log('longitude'+data.results[0].geometry.location.lng);
                
                L.marker([data.results[0].geometry.location.lat, data.results[0].geometry.location.lng], { icon: Icon }).addTo(map).bindPopup(`
                <a href="viewCameras.html"><img style="cursor: pointer;" src="http://www.itacarepesca.com.br/application/webroot/images/thumb-hover-play-two.png" width="100%" height="auto"></a><p style="color: gray; font-family: "Arial;">Localização da <strong style="text-align: center;"><b style="font-family: "nunito", sans serif; font-weight: 900;" color: black;>${res.nome}</b></strong>: ${res.localidade}</p>`).on('click', onClick);

                function onClick() {

                  let idCam = res.id;

                  localStorage.setItem('idCam', idCam);
                    
                }
            }

        })();

        });
      })
      .fail(() => {
        console.log("Erro listar cameras")
      });
    }
  });