import axios from 'axios'

const getWeather = (lat, lon, API_KEY) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    return request.then(response => response.data)
}

export default { getWeather }