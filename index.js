const appId = '348ed86e6e87ace7571afcc665b9b4c2';
const geoAPICall = 'http://api.openweathermap.org/geo/1.0/direct?';
const airAPICall = 'http://api.openweathermap.org/data/2.5/air_pollution?'
var lat;
var lon;
var city; 

function searchCity(){
    city = document.getElementById('searchInput').value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${appId}`).then(result=>{
        return result.json();
    }).then(result=>{
        getLat(result);
        calculatePollution();
    });
}

function getLat(result){
    lat = result[0].lat;
    lon = result[0].lon;
}

function calculatePollution(){
    fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${appId}`).then(result=>{
        return result.json();
    }).then(result=>{
        getPollution(result);
    })
}

function getPollution(result){

    document.getElementById('cityHeader').innerText = city;
    const pollutionContents = document.getElementById('contents');
    const quality = document.getElementById('quality');

    var co = result.list[0].components.co;
    var no = result.list[0].components.no;
    var no2 = result.list[0].components.no2;
    var o3 = result.list[0].components.o3;
    var so2 = result.list[0].components.so2;
    var pm2_5 = result.list[0].components.pm2_5;
    var pm10 = result.list[0].components.pm10;
    var nh3 = result.list[0].components.nh3;

    pollutionContents.innerHTML = 
    `<ul>
        <li>CO: ${co} μg/m<sup>3</sup></li>
        <li>NO: ${no} μg/m<sup>3</sup></li>
        <li>NO2: ${no2} μg/m<sup>3</sup></li>
        <li>O3: ${o3} μg/m<sup>3</sup></li>
        <li>SO2: ${so2} μg/m<sup>3</sup></li>
        <li>PM2.5: ${pm2_5} μg/m<sup>3</sup></li>
        <li>PM10: ${pm10} μg/m<sup>3</sup></li>
        <li>NH3: ${nh3} μg/m<sup>3</sup></li>
    </ul>`;

    quality.innerText = `Air Quality Index: ${result.list[0].main.aqi}`;

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
    let pollutionContainer = document.getElementById('pollutionContainer');
    let pollutionContainerH = pollutionContainer.clientHeight;
    let pollutionContainerW = pollutionContainer.clientWidth;

    pollutionContainer.style.left = `calc(50% - ${pollutionContainerW / 2}px)`;
    pollutionContainer.style.top = `calc(50% - ${pollutionContainerH / 2}px)`;

    pollutionContainer.style.visibility = 'visible';

}

document.getElementById('searchButton').addEventListener('click', () => {
    searchCity();
})