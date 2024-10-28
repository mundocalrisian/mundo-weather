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

        setTimeout(() => {
            get5DayForecast(newLatitude, newLongitude)
            .then((data) => {
                setForecastData(data)
                setIfFetching(false)
                const forecastData = data.list
                const dayIndexes = []
                forecastData.forEach((entry, index) => {
                    if (getHrMinTimeStamp(entry.dt) === '00:00'){
                        dayIndexes.push(index)
                    }
                })
                setNewDayIndexes(dayIndexes)
            })
        }, 500)
    }, [city])

    const forecastArray = forecastData.list

    if (isFetching) {
        return <Loading/>
    } else {
        return (
            <section className="forecast-container">
                <CurrentDayForecast newDayIndexes = {newDayIndexes} forecastArray = {forecastArray}/>
            </section>
        )
    }
}

export default ShowForecast