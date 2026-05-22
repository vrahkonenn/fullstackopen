import { useState, useEffect } from "react"
import countryService from './services/countryService'
import weatherService from "./services/weatherService"
import CountryList from "./components/CountryList"
import Country from "./components/Country"

const App = () => {

  // Statet
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState('')

  const searchedCountries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))

  // Effect hook
  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    if (country) {
      fetchWeatherData()
    }
  }, [country])

  useEffect(() => {
    if(!searchedCountries) return

    if (searchedCountries.length === 1) {
        setCountry(searchedCountries[0])
      } else {
        setCountry(null)
        setWeather(null)
      }
  }, [searchedCountries])

  const API_KEY = import.meta.env.VITE_API_KEY

  const fetchWeatherData = () => {
    console.log(`Haetaan maan ${country.name.common} säätiedot...`);
    weatherService
      .getWeather(country.latlng[0], country.latlng[1], API_KEY)
      .then(response => {
        console.log(response)
        setWeather(response)
      })
  }

  const fetchCountries = () => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
        console.log('Countries fetched succesfully')
      })
      .catch(err => {
        console.log(`Error with fetching countries: ${err}`)
      })
  }

  const onSearchChange = (event) => {
    setSearch(event.target.value)
  }

  

  return(
    <div>
      <p>find countries <input value={search} onChange={onSearchChange} type="text"></input></p>
      {searchedCountries.length >1 && <CountryList searchedCountries={searchedCountries} search={search} setSearch={setSearch}/>}
      {country && <Country country={country} weather={weather}/>}
    </div>
  )
}

export default App