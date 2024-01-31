import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const apiKey = 'tu_api_key'; // Reemplaza con tu propia clave de API de OpenWeatherMap

  const getWeatherData = async () => {
    try {
      // Obtener datos actuales del clima
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      // Obtener pronóstico para los próximos 5 días
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <label>
        Ingresa el nombre de la ciudad:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <button onClick={getWeatherData}>Obtener Clima</button>

      {weather && (
  <div>
    <h2 className="text-xl font-semibold mb-2">Clima en {weather.name}, {weather.sys && weather.sys.country}</h2>
    <p>Temperatura: {weather.main.temp} °C</p>
    <p>Descripción: {weather.weather[0].description}</p>
  </div>
)}


      {forecast && (
        <div>
          <h2>Pronóstico para los próximos 5 días:</h2>
          <div>
            {forecast.list.map((item, index) => (
              <div key={index}>
                <p>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p>Temp: {item.main.temp} °C</p>
                <p>Desc: {item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
