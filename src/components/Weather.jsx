import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import { message } from "antd";

function Weather() {

    const [weatherData, setWeatherData] = useState(false);
    const [city, setCity] = useState("");
    const [messageApi, contextHolder] = message.useMessage()

    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    }


    const search = async (city) => {
        if (city == "") {
            messageApi.error("Enter the city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_KEY_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            console.log(data);
            if (!response.ok) {
                messageApi.error("city not found");
            }

            const icon = allIcons[data.weather[0].icon] || clear;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                feels: Math.floor(data.main.feels_like),
                location: data.name,
                icon: icon,
                description: data.weather[0].description,
            })
            messageApi.success("weather details fetched");
        }
        catch (error) {
            console.error("Error fetching weather data", error);
            // messageApi.error("Error fetching weather data", error);
            return;
        }
    }

    useEffect(() => {
        search("Kolhapur");
    }, [])
    return (
        <>
            {contextHolder}
            <div className="card">
                <h1>Weather App</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder='Search'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <img
                        src={search_icon}
                        alt="search-icon"
                        onClick={() => search(city)}
                    />

                </div>
                <img src={weatherData.icon} alt="clear" className='weather-icon' />
                <p className='temperature'>{weatherData.temperature}°c</p>
                <p className='location'>{weatherData.location}</p>
                <p className='description'>{weatherData.description}</p>
                <p className='feels'>Feels {weatherData.feels}°c</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity} alt="humidity" />
                        <div>
                            <p>{weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                            <img src={wind} alt="humidity" />
                            <div>
                                <p>{weatherData.windSpeed}m/s</p>
                                <span>Wind speed</span>
                            </div>
                        </div>            
                </div>
            </div>
        </>
    )
}

export default Weather
