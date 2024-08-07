document.getElementById('searchCityButton').addEventListener('click', searchCities);

function searchCities() {
    const query = document.getElementById('locationInput').value;
    fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/places?namePrefix=${query}&limit=5&offset=0&sort=-population`)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                displayCityList(data.data);
            } else {
                // If no cities found, directly fetch weather for the entered query
                fetchWeatherByName(query);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // If there's an error with GeoDB, try fetching weather directly
            fetchWeatherByName(query);
        });
}

function displayCityList(cities) {
    const cityList = document.getElementById('cityList');
    cityList.innerHTML = '';
    cities.forEach(city => {
        const cityItem = document.createElement('div');
        cityItem.className = 'city-item';
        cityItem.textContent = `${city.name}, ${city.region}, ${city.country}`;
        cityItem.addEventListener('click', () => fetchWeather(city));
        cityList.appendChild(cityItem);
    });
    cityList.classList.remove('hidden');
}

function fetchWeatherByName(cityName) {
    fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${encodeURIComponent(cityName)}&units=imperial&apikey=xV8P9TWf5qgKXx6fU1V6qtOr4v4Q972y`)
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                updateWidget(data.data, cityName);
            } else {
                showError("City not found or weather data unavailable.");
            }
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            showError("An error occurred while fetching the weather data.");
        });
}

function fetchWeather(city) {
    const location = `${city.latitude},${city.longitude}`;
    fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${encodeURIComponent(location)}&units=imperial&apikey=xV8P9TWf5qgKXx6fU1V6qtOr4v4Q972y`)
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                updateWidget(data.data, `${city.name}, ${city.region}, ${city.country}`);
            } else {
                showError("Weather data unavailable for this location.");
            }
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            showError("An error occurred while fetching the weather data.");
        });
}

function updateWidget(data, location) {
    const widget = document.getElementById('customWidget');
    let weatherClass = '';
    let weatherAnimation = '';

    if (data.values.temperature > 80) {
        weatherClass = 'sunny';
        weatherAnimation = '<div class="sun"></div>';
    } else if (data.values.humidity > 70) {
        weatherClass = 'rainy';
        weatherAnimation = '<div class="cloud"></div>';
    } else {
        weatherClass = 'cloudy';
        weatherAnimation = '<div class="cloud"></div>';
    }

    widget.className = `widget ${weatherClass}`; // Reset classes and add weather class
    widget.innerHTML = `
        <div class="widget-title">Searched City Weather</div>
        ${weatherAnimation}
        <div class="widget-header">
            <h2 id="locationName">${location}</h2>
            <p id="currentDate">${new Date().toLocaleDateString()}</p>
        </div>
        <div class="widget-body">
            <div class="temperature">
                <i class="fas fa-temperature-high"></i>
                <span id="temperature">${data.values.temperature}°F</span>
                <span class="label">Temperature</span>
            </div>
            <div class="humidity">
                <i class="fas fa-tint"></i>
                <span id="humidity">${data.values.humidity}%</span>
                <span class="label">Humidity</span>
            </div>
            <div class="wind">
                <i class="fas fa-wind"></i>
                <span id="windSpeed">${data.values.windSpeed} mph</span>
                <span class="label">Wind Speed</span>
            </div>
            <div class="wind-direction">
                <i class="fas fa-compass"></i>
                <span id="windDirection">${data.values.windDirection}°</span>
                <span class="label">Wind Direction</span>
            </div>
            <div class="wind-gust">
                <i class="fas fa-wind"></i>
                <span id="windGust">${data.values.windGust} mph</span>
                <span class="label">Wind Gust</span>
            </div>
            <div class="rain-intensity">
                <i class="fas fa-cloud-rain"></i>
                <span id="rainIntensity">${data.values.rainIntensity} in/hr</span>
                <span class="label">Rain Intensity</span>
            </div>
            <div class="visibility">
                <i class="fas fa-eye"></i>
                <span id="visibility">${data.values.visibility} mi</span>
                <span class="label">Visibility</span>
            </div>
            <div class="uv-index">
                <i class="fas fa-sun"></i>
                <span id="uvIndex">${data.values.uvIndex}</span>
                <span class="label">UV Index</span>
            </div>
        </div>
    `;
    widget.classList.remove('hidden');
}

function showError(message) {
    const widget = document.getElementById('customWidget');
    widget.innerHTML = `<p class="error-message">${message}</p>`;
    widget.classList.remove('hidden');
}

// Function to refresh all Tomorrow.io widgets
function refreshWidgets() {
    if (window.__TOMORROW__ && window.__TOMORROW__.renderWidget) {
        window.__TOMORROW__.renderWidget();
    }
}
function updateRefreshTimestamp() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const timestampElement = document.getElementById('lastRefreshTimestamp');
    timestampElement.textContent = `Last refresh: ${formattedDate} ${formattedTime}`;
}

function refreshWidgets() {
    if (window.__TOMORROW__ && window.__TOMORROW__.renderWidget) {
        window.__TOMORROW__.renderWidget();
    }
    updateRefreshTimestamp();
}

// Initialize widgets
window.addEventListener('load', function() {
    if (window.__TOMORROW__ && window.__TOMORROW__.renderWidget) {
        window.__TOMORROW__.renderWidget();
    }

    // Set up periodic refresh of widgets
    setInterval(refreshWidgets, 240000); // Refresh every 4 minutes (240000 milliseconds)
});
