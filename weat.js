document.addEventListener("DOMContentLoaded", () => {
    const apiKey = '519e3989ff4dcc923308b9003aced590'; // Replace with your actual API key from a weather service like OpenWeatherMap
    const weatherInfo = document.getElementById('weatherInfo');
    const locationInput = document.getElementById('locationInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');

    getWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeatherData(location);
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherDataByCoords(lat, lon);
        });
    }

    function fetchWeatherData(location) {
        fetch(https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function fetchWeatherDataByCoords(lat, lon) {
        fetch(https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayWeatherData(data) {
        if (data.cod === 200) {
            const weatherDetails = `
                <h2>${data.name}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            weatherInfo.innerHTML = weatherDetails;
        } else {
            weatherInfo.innerHTML = '<p>Location not found. Please try again.</p>';
        }
    }
});