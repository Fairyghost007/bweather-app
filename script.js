const apiKey = "";
const baseUrl = "http://api.weatherapi.com/v1/current.json";

async function fetchWeatherData(city) {
    try {
        const url = `${baseUrl}?key=${apiKey}&q=${city}&aqi=yes`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("La Localisation n'existe pas");
        }

        const data = await response.json();
        const { location, current } = data;
        const temperature = current.temp_c;
        const vitesseVent = current.wind_kph;
        const description = current.condition.text;
        const humidity = current.humidity;
        const iconUrl = `https:${current.condition.icon}`;
        // const airQualityIndex = current.air_quality["us-epa-index"];

        document.getElementById("temperature").textContent = `${temperature}°C`;
        document.getElementById("description").textContent = `${description}`;
        document.getElementById("humidity").textContent = `${humidity}%`;
        document.getElementById("vitesseVent").textContent = `${vitesseVent} Km/h`;
        document.getElementById("icon").src = iconUrl;

        // document.getElementById("airQuality").textContent = `Air Quality Index: ${airQualityIndex}`;
        
        document.getElementById("weatherInfo").classList.remove("hidden");
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById("fetchWeather").addEventListener("click", function () {
    const city = document.getElementById("country").value;
    if (!city) {
        alert("Veuillez entrer une localisation");
        return;
    }
    
    fetchWeatherData(city);
});
