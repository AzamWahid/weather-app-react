import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import WeatherCard from '../WeatherWidget/WeatherWidget';
import './Home.css'



const Home = () => {

    const [weatherData, setweatherData] = useState({})
    const [userLocation, setUserLocation] = useState("")
    const [icon, setIcon] = useState('');


    // const [CityName, setCityName] = useState('')
    const cityNameRef = useRef(null);

    const submitHandler = async (e) => {
        if (e) e.preventDefault();
        console.log(cityNameRef.current.value, "===> CiyName")

        const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'
        let cityName = cityNameRef.current.value;
        // https://api.openweathermap.org/data/2.5/weather?q=London&appid=bd5e378503939ddaee76f12ad7a97608&units=metric

        try {
            const apiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName || "lahore"}&appid=${API_KEY}&units=metric`)
            console.log(apiResponse, '=====> api respone')
            setweatherData(apiResponse.data)
            setIcon(apiResponse.data.weather[0].icon)

        }
        catch (err) {
            console.log(err)
        }
    }

    const getDataByUserLoc = async () => {

        const lat = userLocation.latitude
        const lon = userLocation.longitude
        console.log("lat", lat)
        console.log("lon", lon)


        const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'
        // https://api.openweathermap.org/data/2.5/weather?q=London&appid=bd5e378503939ddaee76f12ad7a97608&units=metric

        try {
            const apiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            console.log(apiResponse, '=====> api respone')
            setweatherData(apiResponse.data)
            setIcon(apiResponse.data.weather[0].icon)

        }
        catch (err) {
            console.log(err)
        }
    }

    const getUserLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function success(position) {
        console.log("position", position)
        setUserLocation(position.coords)
    }

    function error() {
        //   alert("Sorry, no position available.");
        submitHandler();

    }

    useEffect(() => {
        getUserLocation();
    }, [])

    useEffect(() => {
        if (userLocation) {
            getDataByUserLoc()
        }
    }, [userLocation])


    return (
        <div className='container'>
            <div className="iphone-frame">
                <div className="iphone-notch"></div> {/* Optional notch */}
                <form onSubmit={submitHandler}>
                    <label htmlFor="cityNameInput">City Name</label>
                    <input ref={cityNameRef} type="text" id='cityNameInput' required minLength={2} maxLength={20} />
                    <br />
                    <button type='submit'>Get Weather</button>
                </form>

                <hr />
                {weatherData ? (
                    <WeatherCard weatherData={weatherData} icon={icon} />
                ) : (
                    <div style={{ backgroundImage: `url('/images/default.gif')`, width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
                        No data</div>
                )}
            </div>
        </div>
    )
}

export default Home