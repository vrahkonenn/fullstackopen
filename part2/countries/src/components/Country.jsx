const Country = ({ country, weather }) => {
    console.log("weather: ", weather);
    
    const languages = Object.values(country.languages).map(l => <li key={l}>{l}</li>)
    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {languages}
            </ul>
            <img src={country.flags.png}/>

            <h2>Weather in {country.capital}</h2>
            
            {weather && (
                <div>
                    <p>Temperature {weather.main.temp} Celsius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}%402x.png`}/>
                    <p>Wind {weather.wind.speed} m/s</p>
                </div>
                )}

        </div>
    )
}

export default Country