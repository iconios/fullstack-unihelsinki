/* eslint-disable react/prop-types */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';


export default function FoundCountries({ countries, onClick }) {
    const [temp, setTemp] = useState(0.0);
    const [wind, setWind] = useState(0.0);

    console.log('Countries data length: ', countries.length);
    console.log('Data received ', countries)

    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const weatherApiUrl = import.meta.env.VITE_WEATHER_API_URL;

    function getWeatherInfo(country) {
        const weatherLink = `${weatherApiUrl}${country}&APPID=${weatherApiKey}`;
        console.log('The complete weather link: ', weatherLink);
        axios
            .get(weatherLink)
            .then(response => response.data)
            .then(weatherData => {
                setTemp(weatherData.main.temp);
                setWind(weatherData.wind.speed);
            });        
    }

    const listStyle = {
        listStyle: 'none',
    }

    if (countries.length === 0) {
        return <p>No matches found</p>
    }

    if (countries.length > 10) {
        return <p>Too many entries. Specify another filter</p>
    }

    if (countries.length > 1 && countries.length <= 10) {
        return (
            <ul>
                {countries.map(country=> (
                    <li key={uuidv4()} style={listStyle}>
                    {country.name.common} <button type='button' onClick={()=> onClick(country.id)}>Show</button>
                </li>
                ))}
            </ul>
        )
    }

    return (
        <>
            {countries.map(country=> (
                <div key={uuidv4()}>
                    <h1>{country.name.common}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Area: {country.area}</p>
                    <h3>Languages:</h3>
                    <ul>
                        {Object.values(country.languages).map(language =>
                            <li key={uuidv4()}>{language}</li>
                        )}
                    </ul>
                    <img src={country.flags.png} />
                    <h2>Weather in {country.capital}</h2>
                    {(getWeatherInfo(country.capital))}
                    <p>Temperature: {temp} Celsius</p>
                    <p>Wind speed: {wind} m/s</p>
                </div>
            ))}
        </>
    )

}