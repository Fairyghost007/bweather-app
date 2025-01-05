async function fetchApiKey() {
    try {
        const response = await fetch('/api/key');
        const data = await response.json();
           
        return data.apiKey;
    } catch (error) {
        console.error('Failed to fetch the API key:', error);
    }
}

async function fetchWeatherData(city) {
    const loader = document.getElementById("loader");
    try {
        loader.classList.remove('hidden');

        const apiKey = await fetchApiKey();
        if (!apiKey) throw new Error('API key not found');

        const baseUrl = "https://api.weatherapi.com/v1/current.json";
        const url = `${baseUrl}?key=${apiKey}&q=${city}&aqi=yes`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("The location doesn't exist");
        }

        const data = await response.json();
        const {location, current } = data;

        document.getElementById("locationName").textContent = `${city}`;
        document.getElementById("region").textContent = `${location.region}, ${location.country}`;
        document.getElementById("temperature").textContent = `${current.temp_c}°C`;
        document.getElementById("description").textContent = `${current.condition.text}`;
        document.getElementById("humidity").textContent = `${current.humidity}%`;
        document.getElementById("vitesseVent").textContent = `${current.wind_kph} Km/h`;
        document.getElementById("icon").src = `https:${current.condition.icon}`;
        document.getElementById("uv").src = `https:${current.uv}`;

        document.getElementById("weatherInfo").classList.remove("hidden");
    } catch (error) {
        alert(error.message);
    } finally {
        loader.classList.add('hidden');
    }
}

document.getElementById("fetchWeather").addEventListener("click", () => {
    const city = document.getElementById("country").value;
    if (!city) {
        alert("Please enter a location");
        return;
    }
    fetchWeatherData(city);
});


