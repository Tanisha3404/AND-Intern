const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const countryInfo = document.querySelector(".country");
const tempInfo = document.querySelector(".temp");

const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");
const conditionInfo = document.querySelector(".condition");
const humidityValue = document.querySelector(".humidity-value");
const windValue = document.querySelector(".wind-value");
const weatherSummary = document.querySelector(".weather-img");
const currentDate = document.querySelector(".current-date");
const forecastContainer = document.querySelector(".forecast-container");

const apiKey = 'ef0917d4ebe6a019ae30a1e2089fe33b';

searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != '') {
        if (cityInput.value.trim() != '') {
            updateWeatherInfo(cityInput.value)
            cityInput.value = '';
            cityInput.blur();
        }
    }
})

async function getFetchData(endpoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=ef0917d4ebe6a019ae30a1e2089fe33b&units=metric`;

    const response = await fetch(apiUrl);

    return response.json();
}

function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg';
    if (id <= 321) return 'drizzle.svg';
    if (id <= 531) return 'rain.svg';
    if (id <= 622) return 'snow.svg';
    if (id <= 781) return 'atmosphere.svg';  
    if (id === 800) return 'clear.svg';      
    if (id <= 804) return 'clouds.svg';      
    return 'default.svg';                    
}

function getCurrentDate() {
    const date = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }

    return date.toLocaleDateString('en-US', options);
}
async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);
    const {
        name: country,
        main: {temp, humidity},
        weather: [{id, main}],
        wind: {speed}
    } = weatherData

    countryInfo.textContent = country;
    tempInfo.textContent = `${Math.round(temp)} ℃`;
    conditionInfo.textContent = main;
    humidityValue.textContent = `${humidity}%`;
    windValue.textContent = `${speed} M/s`;
    weatherSummary.src = `images/weather/${getWeatherIcon(id)}`;
    currentDate.textContent = getCurrentDate();

    await updateForecastsInfo(city);

    showDisplay(weatherInfoSection);
}

async function updateForecastsInfo(city) {
    const forecastData = await getFetchData('forecast', city)

    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    forecastContainer.innerHTML = ''
    forecastData.list.forEach(forcastWeather => {
        if (forcastWeather.dt_txt.includes(timeTaken) && !forcastWeather.dt_txt.includes(todayDate)) {
            updateForecastsItems(forcastWeather)
        }
        
    })
}

function updateForecastsItems(weatherData) {
    const {
        dt_txt: date,
        weather: [{id}],
        main: {temp}
    } = weatherData;

    const dateTaken = new Date(date);
    const dateOption = {
        day: '2-digit',
        month: 'short'
    };

    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption);

    const forecastItem = `
        <div class="forecast-items">
            <h5 class="forecast-date regular-txt">${dateResult}</h5>
            <img src="images/weather/${getWeatherIcon(id)}" alt="" class="forecast-img">
            <h5 class="forecast-temp">${Math.round(temp)} ℃</h5>
        </div>
    `;

    forecastContainer.insertAdjacentHTML('beforeend', forecastItem);
}


function showDisplay(section) {
    [weatherInfoSection, searchCitySection].forEach(section => section.style.display = 'none');

    section.style.display = 'flex';
}