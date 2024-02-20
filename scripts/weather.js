const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("windSpeed");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const locationSelect = document.getElementById("location");
const place = document.getElementById("place");
const humidityData = document.getElementById("humidity");
const sunriseData = document.getElementById("sunrise");
const sunsetData = document.getElementById("sunset");
const countryData = document.getElementById("country");
const feelLike = document.getElementById("feel-like");
const minData = document.getElementById("min");
const maxData = document.getElementById("max");

const apiKey = "8858983065863e23c3d5a33999223d4c";

// Function to fetch weather data for a specific location
async function fetchWeatherData(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayWeatherData(data);
    } else {
      throw new Error("Failed to fetch weather data");
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to display weather data
function displayWeatherData(weatherData) {
  temperature.textContent = `${weatherData.main.temp.toFixed(0)}`;
  windSpeed.textContent = `${weatherData.wind.speed.toFixed(1)}`;
  description.textContent = weatherData.weather[0].description;
  place.textContent = `${weatherData.name}`;
  minData.textContent = `${weatherData.main.temp_min.toFixed(0)}`;
  maxData.textContent = `${weatherData.main.temp_max.toFixed(0)}`;
  humidityData.textContent = `${weatherData.main.humidity}`;

  const sunriseTime = new Date(weatherData.sys.sunrise * 1000);
  const sunsetTime = new Date(weatherData.sys.sunset * 1000);
  const timeOptions = { hour: 'numeric', minute: 'numeric' };
  sunriseData.textContent = `${sunriseTime.toLocaleTimeString('en-US', timeOptions)}`;
  sunsetData.textContent = `${sunsetTime.toLocaleTimeString('en-US', timeOptions)}`;

  countryData.textContent = `${weatherData.sys.country}`;
  feelLike.textContent = `${weatherData.main.feels_like.toFixed(0)}`;
  const iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  weatherIcon.src = iconUrl;
}

// Function to get user's current location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser");
  }
}

// Populate select dropdown with nearby locations
function populateLocationDropdown() {
  const locations = [
    {
      name: "Playa El Laucho",
      latitude: -18.48654,
      longitude: -70.32662,
    },
    {
      name: "Playa Cavancha",
      latitude: -20.23303,
      longitude: -70.14667,
    },
    {
      name: "Playa La Virgen",
      latitude: -27.057895,
      longitude: -70.806866,
    },
    {
      name: "Bahía Inglesa",
      latitude: -27.102286,
      longitude: -70.855096,
    },
    {
      name: "Guanaqueros",
      latitude: -30.196272,
      longitude: -71.418334,
    },
    {
      name: "Anakena",
      latitude: -27.073327,
      longitude: -109.322965,
    },
    {
      name: "Quintay",
      latitude: -33.20429,
      longitude: -71.69877,
    },
    {
      name: "Totoralillo",
      latitude: -30.07288,
      longitude: -71.37431,
    },
    {
      name: "Buchupureo",
      latitude: -36.07072,
      longitude: -72.78157,
    },
    {
      name: "Playa de Cole Cole",
      latitude: -42.51108,
      longitude: -74.18475,
    },
    {
      name: "Canelillo",
      latitude: -33.36717,
      longitude: -71.68808,
    },
    {
      name: "Rapel de Navidad",
      latitude: -33.94365,
      longitude: -71.73417,
    },
  ];

  locations.forEach((location) => {
    const option = document.createElement("option");
    option.textContent = location.name;
    option.value = `${location.latitude},${location.longitude}`;

    locationSelect.appendChild(option);
  });

  // Fetch weather data for the default selected location
  const defaultLocation =
    locationSelect.options[locationSelect.selectedIndex].value.split(",");
  fetchWeatherData(defaultLocation[0], defaultLocation[1]);

  // Add event listener to handle location change
  locationSelect.addEventListener("change", (event) => {
    const [latitude, longitude] = event.target.value.split(",");
    fetchWeatherData(latitude, longitude);
  });
}

// Initialize the app
populateLocationDropdown();
