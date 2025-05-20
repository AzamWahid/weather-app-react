import React, { useRef, useState } from 'react'
import axios from 'axios';



const Home = () => {

    const [weatherData, setweatherData] = useState(null)
    // const [CityName, setCityName] = useState('')
    const cityNameRef = useRef(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(cityNameRef.current.value, "===> CiyName")

        const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'
        let cityName = cityNameRef.current.value;
        // https://api.openweathermap.org/data/2.5/weather?q=London&appid=bd5e378503939ddaee76f12ad7a97608&units=metric

        try {
            const apiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            console.log(apiResponse, '=====> api respone')
            setweatherData(apiResponse.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="">City Name</label>
                <input ref={cityNameRef} type="text" id='cityNameInput' required minLength={2} maxLength={20} />
                <br />
                <button type='submit'>Get Weather</button>
            </form>

            <hr />
            {weatherData && (
                <div>
                    City Name : {weatherData?.name}
                    <br />
                    Country : {weatherData?.sys?.country}
                    <br />
                    Temp : {weatherData?.main?.temp}
                    <br />
                    humidity : {weatherData?.main?.humidity}
                    <br />
                    wind speed : {weatherData?.wind?.speed}
                    <br />
                    humidity : {weatherData?.weather[0].description}
                </div>
            )
            }
        </div>
    )
}

export default Home