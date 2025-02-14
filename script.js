const apiKey = 'c0545b0a64755969f84dff3654cc9484';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherType = document.getElementById('weather-type');
const themeToggle = document.getElementById('theme-toggle');
const weatherContainer = document.getElementById('weather-container');

// Fetch weather data with error handling
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    
    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    alert(`Error: ${error.message}`);
    return null;
  }
}

// Display weather data
function displayWeather(data) {
  if (!data) return;
  
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherType.textContent = data.weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherInfo.classList.remove('hidden');
}

// Search button event listener
searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (city) {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
  } else {
    alert("Please enter a city name.");
  }
});

// Dark/Light mode toggle using Tailwind classes
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('bg-blue-900');  // Dark Blue Background
  document.body.classList.toggle('text-white');
  
  weatherContainer.classList.toggle('bg-blue-800'); // Dark Blue Container
  
  // Change the moon symbol to a sun symbol based on theme
  if (document.body.classList.contains('bg-blue-900')) {
    themeToggle.innerHTML = '🌞';  // Sun symbol for light mode
  } else {
    themeToggle.innerHTML = '🌙';  // Moon symbol for dark mode
  }

  localStorage.setItem('theme', document.body.classList.contains('bg-blue-900') ? 'dark' : 'light');
});

// Load theme preference
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('bg-blue-900', 'text-white');
    weatherContainer.classList.add('bg-blue-800', 'text-white');
    themeToggle.innerHTML = '🌞';  // Show sun symbol in dark mode
  }
});
