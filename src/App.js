
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const App = () => {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedRecentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedRecentSearches);
  }, []);

  const getWeather = async () => {
    const apiKey = 'b7b9a117c50de42fd5929641559e4661';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      setWeatherData(data);
      saveRecentSearch(cityInput);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const saveRecentSearch = (city) => {
    const updatedRecentSearches = [city, ...recentSearches.slice(0, 2)];
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
  };

  return (
    <Container>
      <WeatherContainer>
        <h1>Weather App</h1>
        <Label htmlFor="cityInput">Enter City:</Label>
        <Input
          type="text"
          id="cityInput"
          placeholder="Enter city name"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <Button onClick={getWeather}>Get Weather</Button>
        {weatherData && <WeatherReport data={weatherData} />}
      </WeatherContainer>
      <RecentSearches>
        <h2>Recent Searches</h2>
        <RecentList>
          {recentSearches.map((city, index) => (
            <li key={index} onClick={() => setCityInput(city)}>
              {city}
            </li>
          ))}
        </RecentList>
      </RecentSearches>
    </Container>
  );
};

const WeatherReport = ({ data }) => {
  return (
    <WeatherReportContainer>
      {data.list.slice(0, 5).map((weatherItem, index) => (
        <WeatherCard key={index}>
          <p>{new Date(weatherItem.dt_txt).toLocaleString()}</p>
          <p>Temperature: {Math.round(weatherItem.main.temp - 273.15)}°C</p>
          <p>{weatherItem.weather[0].description}</p>
        </WeatherCard>
      ))}
    </WeatherReportContainer>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #8e44ad; /* Morado */
`;

const WeatherContainer = styled.div`
  text-align: center;
  background-color: #3498db; /* Azul */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  color: #ecf0f1;
`;

const Label = styled.label`
  display: block;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #2ecc71; /* Verde */
  color: #ecf0f1;
  border: none;
  border-radius: 5px;
`;

const WeatherReportContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const WeatherCard = styled.div`
  background-color: #3498db; /* Azul */
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
`;

const RecentSearches = styled.div`
  margin-top: 20px;
`;

const RecentList = styled.ul`
  list-style: none;
  padding: 0;
`;
export default App;
