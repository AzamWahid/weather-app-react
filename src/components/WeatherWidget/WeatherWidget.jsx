import React, { useEffect, useState } from 'react'
import './WeatherWidget.css';

const WeatherCard = ({ weatherData }) => {

    const [background, setBackground] = useState('');

    useEffect(() => {
        if (weatherData) {
            const weatherId = weatherData.weather[0].id;
            if (weatherId === 800) {
                setBackground('/images/clearSky.jpg');
            } else if (weatherId >= 500 && weatherId <= 531) {
                setBackground('/images/rainy.gif');
            } else if (weatherId >= 200 && weatherId <= 232) {
                setBackground('/images/thunderstorm.gif');
            } else if (weatherId >= 600 && weatherId <= 622) {
                setBackground('/images/snow.gif');
            } else if (weatherId >= 701 && weatherId <= 781) {
                setBackground('/images/fog.gif');
            }
        }
    }, [weatherData]);

    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover',backgroundPosition: 'center', minHeight: '100vh'}}>

            <div className='card'>
                City Name : {weatherData?.name}
                <br />
                Country : {weatherData?.sys?.country}
                <br />
                <div className='temp'> {weatherData?.main?.temp}°C </div>
                <br />
                humidity : {weatherData?.main?.humidity}
                <br />
                wind speed : {weatherData?.wind?.speed}
                <br />
                humidity : {weatherData?.weather[0].description}
            </div>
        </div>
    )
}

export default WeatherCard