import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeatherApp.css';

const API_KEY = '21c5b1f3b813169020cf4ab58cef179a';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}?q=${city}&appid=${API_KEY}`);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setError('City not found. Please enter a valid city name.');
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-app">
      <div className="weather-card">
        <h1 className="text-center">Weather App</h1>
        <form onSubmit={handleSubmit} className="text-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="form-control"
          />
          <button type="submit" className="btn btn-primary mt-2">
            Get Weather
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {weatherData && (
          <div className="weather-details">
            <h2 className="mt-4">{weatherData.name}</h2>
            <p className="weather-description">
              {weatherData.weather[0].description}
              <i className={`fa fa-${weatherData.weather[0].icon} ml-2`} />
            </p>
            <p className="temperature">
              Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C
            </p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
