import { useEffect, useState } from "react"
import { get5DayForecast } from "../../utils/api";
import { getDayMonthStamp, getHrMinTimeStamp, tempKelvinToCelsius } from "../../utils/utils";
import { ForecastCard, ForecastCardHeaders } from "./forecast-card";
import { CurrentDayForecast, ThreeDayForecast } from "./show-forecast-card";
import Loading from "../loading/loading";


function ShowForecast ({newLatitude, newLongitude, city,}) {
    const [forecastData, setForecastData] = useState("")
    const [isFetching, setIfFetching] = useState(true)
    const [newDayIndexes, setNewDayIndexes] = useState([])
    

    useEffect(() => {
        // console.log('hello from the forecast useEffect');
        setTimeout(() => {
            get5DayForecast(newLatitude, newLongitude)
            .then((data) => {
                setForecastData(data)
                setIfFetching(false)
                const forecastData = data.list
                const dayIndexes = []
                // console.log(forecastData, "-----forecastData");
                forecastData.forEach((entry, index) => {
                    if (getHrMinTimeStamp(entry.dt) === '00:00'){
                        dayIndexes.push(index)
                    }
                })
                setNewDayIndexes(dayIndexes)
            })
        }, 500)
    }, [city])
    // console.log(newDayIndexes, "-----newDayIndexes");

    const forecastArray = forecastData.list
    // console.log(forecastArray, "-----forecastArray");

    if (isFetching) {
        return <Loading/>
    } else {

        // if (newDayIndexes[0] === 0) {
            // return (
            // <section className="forecast-container">
            //     <ThreeDayForecast newDayIndexes = {newDayIndexes} forecastArray = {forecastArray}/>
            // </section>
            // )
        // } else {
            return (
                <section className="forecast-container">
                    <CurrentDayForecast newDayIndexes = {newDayIndexes} forecastArray = {forecastArray}/>
                </section>
            )
            
        // }

            // Need some conditional logic to check if day for first field is the same as the second and show if not
    // return (
    //     <section className="forecast-container">
    //         <CurrentDayForecast newDayIndexes = {newDayIndexes} forecastArray = {forecastArray}/>
    //         <ThreeDayForecast newDayIndexes = {newDayIndexes} forecastArray = {forecastArray}/>
    //     </section>
    // )

        
    // return (
    //     <section className="forecast-container">
    //         <h2 className="forecast-title">3 Day Forecast</h2>
    //         <div className="forecast-inner-container">
    //             <ul>
    //                 <h3>{`${getDayMonthStamp(forecastArray[0].dt)}`}</h3>
    //                 <div className="space-div"></div>
    //                 <div className="forecast-titles">Weather</div>
    //                 <div className="forecast-titles">Temperature</div>
    //                 <div className="forecast-titles">Wind Speed</div>
    //             </ul>
    //             <ul>
    //                 {forecastArray.map((element, index) => {
    //                     const date = new Date(element.dt)
    //                     if (index < 8) return (
    //                         <section key={element.dt} className="day-forecast">
    //                             <img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}.png`}/>
    //                             <div>{`${getHrMinTimeStamp(element.dt)}`}</div>
    //                             <div >{`${element.weather[0].main}`}</div>
    //                             <div >{`${tempKelvinToCelsius(element.main.temp)}ºC`}</div>
    //                             <div>{`${Math.round(element.wind.speed)} m/s`}</div>
    //                         </section>
    //                     )
    //                 })}
    //             </ul>
    //         </div>
    //         <div className="forecast-inner-container">
    //             <ul>
    //                 <h3>{`${getDayMonthStamp(forecastArray[8].dt)}`}</h3>
    //                 <div className="space-div"></div>
    //                 <div className="forecast-titles">Weather</div>
    //                 <div className="forecast-titles">Temperature</div>
    //                 <div className="forecast-titles">Wind Speed</div>
    //             </ul>
    //             <ul>
    //                 {forecastArray.map((element, index) => {
    //                     const date = new Date(element.dt)
    //                     if (index >= 8 && index < 16) return (
    //                         <section key={element.dt} className="day-forecast">
    //                             <img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}.png`}/>
    //                             <div>{`${getHrMinTimeStamp(element.dt)}`}</div>
    //                             <div >{`${element.weather[0].main}`}</div>
    //                             <div >{`${tempKelvinToCelsius(element.main.temp)}ºC`}</div>
    //                             <div>{`${Math.round(element.wind.speed)} m/s`}</div>
    //                         </section>
    //                     )
    //                 })}
    //             </ul>
    //         </div>
    //         <div className="forecast-inner-container">
    //             <ul>
    //                 <h3>{`${getDayMonthStamp(forecastArray[16].dt)}`}</h3>
    //                 <div className="space-div"></div>
    //                 <div className="forecast-titles">Weather</div>
    //                 <div className="forecast-titles">Temperature</div>
    //                 <div className="forecast-titles">Wind Speed</div>
    //             </ul>
    //             <ul>
    //                 {forecastArray.map((element, index) => {
    //                     const date = new Date(element.dt)
    //                     if (index >= 16 && index < 24) return (
    //                         <section key={element.dt} className="day-forecast">
    //                             <img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}.png`}/>
    //                             <div>{`${getHrMinTimeStamp(element.dt)}`}</div>
    //                             <div >{`${element.weather[0].main}`}</div>
    //                             <div >{`${tempKelvinToCelsius(element.main.temp)}ºC`}</div>
    //                             <div>{`${Math.round(element.wind.speed)} m/s`}</div>
    //                         </section>
    //                     )
    //                 })}
    //             </ul>
    //         </div>
    //     </section>
    // )
    }
}

export default ShowForecast