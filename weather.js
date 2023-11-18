const apikey = "7ded80d91f2b280ec979100cc8bbba94";

const button = document.getElementById("weatherCheck");

const results = document.getElementById("weatherResults")

button.addEventListener("click", () => {
    const query = document.getElementById("weatherLocation").value;
    WeatherCheck(apikey, query)
});

function WeatherCheck(key, query)
{
    const current = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units=metric&lang=pl";
    const forecast5 = "https://api.openweathermap.org/data/2.5/forecast?q="+query+"&appid="+key+"&units=metric&lang=pl";
    results.innerHTML='';
    getCurrentWeather(current);
    getForecast5(forecast5);
}

function getCurrentWeather(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.addEventListener("load", () => {
        let currentWeather = JSON.parse(xhttp.responseText);
        console.log("current:")
        console.log(currentWeather);
        drawWeather(currentWeather, 1);
    });
    xhttp.send();
}

async function getForecast5(url) {
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log("forecast:")
        console.log(data);
        let forecast = data.list;
        drawWeather(forecast, 2);
    });
}

function drawWeather(data, number)
{
    // add current weather block
    if (number===1) {
        const date = new Date(data.dt * 1000);
        const dateTimeString = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`;

        const temperature = data.main.temp;
        const feelsLikeTemperature = data.main.feels_like;
        const weatherPressure = data.main.pressure;
        const iconName = data.weather[0].icon;

        const weatherBlock = createWeatherBlock(dateTimeString, temperature, feelsLikeTemperature, weatherPressure, iconName);
        results.appendChild(weatherBlock)
    }

    // add forecast weather blocks
    if (number===2 && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let weather = data[i];
            const date = new Date(weather.dt * 1000);
            const dateTimeString = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`;

            const temperature = weather.main.temp;
            const feelsLikeTemperature = weather.main.feels_like;
            const weatherPressure = weather.main.pressure;
            const iconName = weather.weather[0].icon;


            const weatherBlock = createWeatherBlock(dateTimeString, temperature, feelsLikeTemperature, weatherPressure, iconName);
            results.appendChild(weatherBlock)
        }
    }
}

function createWeatherBlock(dateString, temperature, feelsLikeTemperature, weatherPressure, iconName) {
    let weatherBlock = document.createElement("div");
    weatherBlock.className = "weather-block";

    let dateBlock = document.createElement("div");
    dateBlock.className = "weather-date";
    dateBlock.innerText = dateString;
    weatherBlock.appendChild(dateBlock);

    let temperatureBlock = document.createElement("div");
    temperatureBlock.className = "weather-temperature";
    temperatureBlock.innerHTML = `${temperature} &deg;C`;
    weatherBlock.appendChild(temperatureBlock);

    let feelsLikeBlock = document.createElement("div");
    feelsLikeBlock.className = "weather-temperature-feels-like";
    feelsLikeBlock.innerHTML = `Odczuwalna: ${feelsLikeTemperature} &deg;C`;
    weatherBlock.appendChild(feelsLikeBlock);

    let PressureBlock = document.createElement("div");
    PressureBlock.className = "weather-pressure";
    PressureBlock.innerHTML = `Ciśnienie: ${weatherPressure} Ph`;
    weatherBlock.appendChild(PressureBlock);

    let weatherIcon = document.createElement("img");
    weatherIcon.className = "weather-icon";
    weatherIcon.src = "https://openweathermap.org/img/wn/"+iconName+"@2x.png"
    weatherBlock.appendChild(weatherIcon);

    return weatherBlock;
}