import { useState } from 'react'
import Header from './components/header'
import Search from './components/search-form'
import ShowWeather from './components/weather/show-weather'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import ShowForecast from './components/forecast/show-forecast'
import WeatherHeader from './components/weather/weather-header'
import Expander from './components/forecast/forecast-expander'

function App() {
  const [newLatitude, setNewLatitude] = useState(53.79705955)
  const [newLongitude, setNewLongitude] = useState(-1.5563763)
  const [postCode, setPostCode] = useState("LS1 1BA")
  const [city, setCity] = useState("Leeds")

  return (
    <section id="App">
      <Header />
      <Search setNewLatitude={setNewLatitude} setNewLongitude={setNewLongitude} setPostCode= {setPostCode} setCity={setCity}/>
      <WeatherHeader city={city}/>
      <ShowWeather newLatitude={newLatitude} newLongitude={newLongitude} city={city} setCity={setCity}/>
      <Expander>
        <ShowForecast newLatitude={newLatitude} newLongitude={newLongitude} city={city}/>
      </Expander>
    </section>
  )
}

export default App
