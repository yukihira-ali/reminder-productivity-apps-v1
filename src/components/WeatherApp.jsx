import { useState } from "react"

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function WeatherApp() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const getWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('No city in the database');
            }
            const data = await response.json();
            setWeather(data);
            setError('');
        } catch (error) {
            setError(error.message);
            setWeather(null);
        }
    };

    const handleCityChange = (e) => {
        e.preventDefault();
        getWeather();
    };

    return (
        <div>
            <h5>Weather Monitor</h5>
            <form onSubmit={handleCityChange}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Your City"
                    required
                />
                <button type="submit">Get Weather</button>
            </form>
            <hr />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weather && (
                <div>
                    <h6>{weather.name}</h6>
                    <p>
                        <h8>Current Weather</h8>
                        <br />
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt={weather.weather[0].description}
                        />
                        <span>{weather.weather[0].description}</span>
                    </p>
                    <p><i className="bi bi-crosshair2" /> Coordinates: Lat {weather.coord.lat} Long {weather.coord.lon}</p>

                    <p><i className="bi bi-thermometer-sun" /> Temperature: {weather.main.temp}°C</p>
                    <p>
                        <i className="bi bi-sun" /> Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                    </p>
                    <p>
                        <i className="bi bi-moon" /> Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                    </p>
                </div>
            )}
        </div>
    )
}
