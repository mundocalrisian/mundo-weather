import axios from 'axios'

const openWeatherApiKey = import.meta.env.VITE_OW_API_KEY
const geoCodingApiKey = import.meta.env.VITE_GC_API_KEY


const openWeatherApi = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/"
})

export const getCurrentWeather = (latitude, longitude) => {
    return openWeatherApi.get('/weather', {params: {lat: `${latitude}`, lon: `${longitude}`, appid: `${openWeatherApiKey}`}})
    .then((response) => {
        return response.data
    })
}

export const get5DayForecast = (latitude, longitude) => {
    return openWeatherApi.get('/forecast', {params: {lat: `${latitude}`, lon: `${longitude}`, appid: `${openWeatherApiKey}`}})
    .then((response) => {
        return response.data
    })
}

const geoCodingApi = axios.create({
    baseURL: "https://api.geoapify.com/v1/geocode"
})

export const coordinatesFromPostcode = (postcode) => {
    return geoCodingApi.get('/search', {params: {postcode: `${postcode}`, format: "json", apiKey: `${geoCodingApiKey}`}})
}

export const postcodeFromCoordinates = (latitude, longitude) => {
    return geoCodingApi.get('/reverse', {params: {lat: `${latitude}`, lon: `${longitude}`, type: "postcode", format: "json", apiKey: `${geoCodingApiKey}`}})
}


// 65.6833306 -18.0999996