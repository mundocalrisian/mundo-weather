import { useEffect, useState } from "react"
import { get5DayForecast } from "../../utils/api";
import { getLocalDayString } from "../../utils/utils";
import { FourDayForecast } from "./show-forecast-card";
import Loading from "../loading/loading";

function ShowForecast ({newLatitude, newLongitude, city,}) {
    const [allForecastData, setAllForecastData] = useState({ list: [] })
    const [isFetching, setIsFetching] = useState(true)
    const [newDayIndexes, setNewDayIndexes] = useState([])
    
    useEffect(() => {

        setTimeout(() => {
            get5DayForecast(newLatitude, newLongitude)
            .then((data) => {
                const fetchedList = data.list
                const dayIndexes = []
                let lastDayText = null
                fetchedList.forEach((entry, index) => {
                    const localDay = getLocalDayString(entry.dt)

                    if (localDay !== lastDayText) {
                        dayIndexes.push(index)
                        lastDayText = localDay
                    }
                })
                setAllForecastData(data)
                setNewDayIndexes(dayIndexes)
                setIsFetching(false)
            })
        }, 500)
    }, [city])

    const fullForecastList = allForecastData?.list ?? []

    if (isFetching) {
        return <Loading/>
    } else {
        return (
            <section className="forecast-container">
                <FourDayForecast newDayIndexes = {newDayIndexes} fullForecastList = {fullForecastList}/>
            </section>
        )
    }
}

export default ShowForecast