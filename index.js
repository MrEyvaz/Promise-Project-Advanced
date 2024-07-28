const cityInput = document.querySelector('.text')
const btn = document.querySelector('.btn')
const forecastContainer = document.querySelector('.forecast-container')

const api_key = '727793ca47485e3e04b167dfda3caf48'

async function fetchApi(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}`);
        const data = await response.json()
        console.log(data);
        displayForecastData(cityName, data)
    } catch (error) {
        console.log(error);
    }
}

async function hourlyForecastApi(cityName) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=5a84d0232a21457b87553816242807&q=${cityName}&days=1&aqi=no&alerts=no`);
        const data = await response.json()
        console.log(data);
        displayHourlyForecastData(cityName, data)
    } catch (error) {
        console.log(error);
    }
}

function cityData() {
    const cityName = cityInput.value
    fetchApi(cityName)
    hourlyForecastApi(cityName);
    cityInput.value = ''
}

function displayForecastData(cityName, data) {
    forecastContainer.innerHTML = ''
    data.list.forEach((forecast, index) => {
        if (index % 8 === 0) {
            const forecastDate = new Date(forecast.dt_txt)
            const forecastDay = forecastDate.toLocaleDateString()
            const forecastTime = forecastDate.toLocaleTimeString()
            const iconCode = forecast.weather[0].icon
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
            const temperature = Math.round(forecast.main.temp - 273.15)
            const humidity = forecast.main.humidity
            const windSpeed = forecast.wind.speed

            const forecastHTML = `
                <div class="forecast">
                    <h2>${forecastDay} ${forecastTime}</h2>
                    <img src="${iconUrl}" alt="Weather icon for ${cityName}">
                    <p style="font-size: 20px;">Temperature: ${temperature}°C</p>
                    <p style="font-size: 20px; margin-top: 10px;">Humidity: ${humidity}%</p>
                    <p style="font-size: 20px; margin-top: 10px;">Wind Speed: ${windSpeed} km/h</p>
                </div>
            `
            forecastContainer.insertAdjacentHTML('beforeend', forecastHTML)
        }
    })
    const forecast_empty_h2 = document.querySelector('.forecast-empty-h2')
    forecast_empty_h2.textContent = `${cityName} in 5 days forecast`
}

function displayHourlyForecastData(cityName, data) {
    const hourlyForecastContainer = document.querySelector('.hourly-forecast-container');
    const hourly_forecast = document.querySelector('.hourly-forecast');

    data.forecast.forecastday[0].hour.forEach((forecast) => {
        console.log(forecast);
        const forecastDate = new Date(forecast.time);
        const forecastDay = forecastDate.toLocaleDateString()
        const forecastTime = forecastDate.toLocaleTimeString()
        const iconUrl = forecast.condition.icon
        const temperature = forecast.temp_c
        const humidity = forecast.humidity
        const windSpeed = forecast.wind_kph

        const forecastHTML = `
                <div class="forecast"  style="margin-top: 38px;">
                    <h2>${forecastDay} ${forecastTime}</h2>
                    <img src="${iconUrl}" alt="Weather icon for ${cityName}">
                    <p style="font-size: 20px;">Temperature: ${temperature}°C</p>
                    <p style="font-size: 20px; margin-top: 10px;">Humidity: ${humidity}%</p>
                    <p style="font-size: 20px; margin-top: 10px;">Wind Speed: ${windSpeed} km/h</p>
                </div>
            `;
        hourly_forecast.insertAdjacentHTML('beforeend', forecastHTML)
    })
    const hourly_forecast_text = document.querySelector('.hourly-forecast-text');
    hourly_forecast_text.textContent = `${cityName} in hourly forecast`;
}

btn.addEventListener('click', cityData)