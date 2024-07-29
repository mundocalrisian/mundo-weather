import { useEffect, useState } from "react";
import {capitaliseFirstLetter, getHrMinTimeStamp, RecenterAutomatically, tempKelvinToCelsius, windDirection} from "../../utils/utils";
import { getCurrentWeather, postcodeFromCoordinates } from "../../utils/api";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import {Icon} from "leaflet"
// import pointer from "../../assets/location-marker-orange2.png"
import pointer from "../../assets/location-marker.svg"
import Loading from "../loading/loading";

const mapPointer = new Icon ({
    iconUrl: pointer, 
    iconSize: [65, 65]
})

function ShowWeather ({newLatitude, newLongitude, city, setCity}) {
    const [weatherData, setWeatherData] = useState("")
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        // console.log("hello from the weather useEffect");
        setTimeout(()=>{
            getCurrentWeather(newLatitude, newLongitude)
            .then((data) =>{
                // console.log(data);
                setCity(data.name)
                setWeatherData(data)
                setIsFetching(false) 
            })
        }, 500)
    }, [newLatitude])

    if (isFetching) {
        return <Loading/>
    } else {       
        
        return(
            <section className="container">
                <div className="weather-detail">
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="a dipiction of the current weather" id="weather-icon"/>
                    <p id="main-weather">{weatherData.weather[0].main}</p>
                    <p id="description">{`${capitaliseFirstLetter(weatherData.weather[0].description)}`}</p>
                    <p>Temperature: {`${tempKelvinToCelsius(weatherData.main.temp)}ºC`}</p>
                    <p>Feels like: {`${tempKelvinToCelsius(weatherData.main.feels_like)}ºC`}</p>
                    <p>Wind: {`${Math.round((weatherData.wind.speed))} m/s, ${windDirection(weatherData.wind.deg)}`}</p>
                    {weatherData.wind.gust ? <p>{`Wind gust: ${Math.round(weatherData.wind.gust)} m/s`} </p> : <></>}
                    <p>Cloud cover: {`${weatherData.clouds.all}%`}</p>
                    <p>Humidity:  {`${weatherData.main.humidity}%`}</p>
                    <p>Sunrise: {`${getHrMinTimeStamp(weatherData.sys.sunrise + 3600)}`}</p>
                    <p>Sunset: {`${getHrMinTimeStamp(weatherData.sys.sunset + 3600)}`} </p>
                </div>

                <div className="weather-detail">
                <MapContainer center={[newLatitude, newLongitude]} zoom={14} scrollWheelZoom={false}>
                    {/* <ChangeView center={[newLatitude, newLongitude]} zoom={13} />  */}
                    <RecenterAutomatically lat={newLatitude} lng={newLongitude} />
                    <TileLayer
                        url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=fb646034-4607-4dde-87bc-a00e101ba48f'
                        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        // url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="https://www.stadiamaps.com/">Stadia Maps <a href="https://www.stamen.com/" target="_blank">Stamen Design <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>'
                        // attribution='&copy; OpenStreetMap France | {attribution.OpenStreetMap}'
                        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    <Marker position={[newLatitude, newLongitude]} icon={mapPointer} >
                        <Popup className="map-popup">
                            <h3>
                            {city} <br />{`${newLatitude}, ${newLongitude}`}
                            </h3>
                        </Popup>
                    </Marker>
                </MapContainer>
                </div>
            </section>
        )
    }
}

export default ShowWeather