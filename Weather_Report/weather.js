// Put your Last.fm API key here
/*var api_key = "5efaee31dcaafe6e44f84619398c3749";

function sendRequest () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
        }
    };
    xhr.send(null);
}*/


var api_key = "98f453b22fb8e2d7cc313779de835b38";

function sendRequest () {
    var xhr = new XMLHttpRequest();
   // var method = "artist.getinfo";
    var city = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?q="+city+"&appid="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            document.getElementById("container").className = 'container';
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            var sunrise = new Date(json.sys.sunrise * 1000);
            document.getElementById("name").innerHTML = json.name ;
            document.getElementById("geo_coordinate").innerHTML = '[ '+json.coord.lon+","+json.coord.lat+' ]' ;
            document.getElementById("sun_rise").innerHTML = new Date(json.sys.sunrise * 1000) ;
            document.getElementById("sun_set").innerHTML = new Date(json.sys.sunset * 1000) ;
            document.getElementById("pressure").innerHTML = json.main.pressure ;
            document.getElementById("humidity").innerHTML = json.main.humidity + '&#37' ;
            document.getElementById("temperature").innerHTML = (json.main.temp * (9/5) - 459.67).toFixed(1) + ' &#8457';
            document.getElementById("temperature_min").innerHTML = (json.main.temp_min * (9/5) - 459.67).toFixed(1) + ' &#8457' ;
            document.getElementById("temperature_max").innerHTML = (json.main.temp_max * (9/5) - 459.67).toFixed(1) + ' &#8457';
            document.getElementById("cloud").innerHTML = json.clouds.all + '&#37' ;
            var weather = json.weather[0].icon;
            var visibility = 'Good'
            var suggestion = 'No suggestion'
            var symbol = '';
            if(weather.match('.*n')) 
                document.getElementById("container").style.backgroundImage="url(images/night.jpg)";
            else
                document.getElementById("container").style.backgroundImage="url(images/blue_sky.jpg)";          
            if(weather.match('01.*')){
                if(weather.match('.*d')){
                    suggestion = 'Look forward for a bright sunny day !!'
                    visibility = 'Good'
                    symbol = '&#9728';

                }
                else{
                    suggestion = 'Its a pleasant night !!'
                    visibility = 'Good'
                    symbol = '&#9789'
                }
            }
            else if(weather.match('0[2-4].*')){
                suggestion = 'It will be a gloomy weather !!'
                visibility = 'Normal'
                symbol = '&#9729'
            }
            else if(weather.match('09.*') || weather.match('10.*')){
                suggestion = 'Take your umbrella !!'
                visibility = 'Bad'
                symbol = '&#9748'
            }
            else if(weather.match('13.*') || weather.match('50.*')){
                suggestion = 'Put on your jacket !!'
                visibility = 'Very Bad'
                symbol = '&#9924'
            }
            document.getElementById("visibility").innerHTML = visibility ;
            document.getElementById("suggestion").innerHTML = suggestion ;
            document.getElementById("symbol").innerHTML = symbol ;


        }
    };
    xhr.send(null);
}
