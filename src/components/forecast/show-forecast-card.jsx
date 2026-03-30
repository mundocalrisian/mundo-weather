import { getDayMonthStamp } from "../../utils/utils"
import { ForecastCard, ForecastCardHeaders } from "./forecast-card"

function getDayBoundaries(newDayIndexes) {
    if (!Array.isArray(newDayIndexes) || newDayIndexes.length === 0) {
        return [0]
    }

    const dayIndexes = [...newDayIndexes]
    if (dayIndexes[0] !== 0) {
        dayIndexes.unshift(0)
    }
    return dayIndexes
}

function renderDayForecast(dayIndexGroup, fullForecastList) {
    const { dayStart, dayEnd, dayIndex } = dayIndexGroup
    
    if (dayStart == null || dayStart >= fullForecastList.length) return null

    const endIndex = dayEnd != null ? Math.min(dayEnd, fullForecastList.length) : fullForecastList.length
    const dayForecastDetail = fullForecastList.slice(dayStart, endIndex)

    if (dayForecastDetail.length === 0) return null

    return (
        <div key={`day-${dayIndex}`}>
            <h3 className="forecast-title">{`${getDayMonthStamp(fullForecastList[dayStart].dt)}`}</h3>
            <ul className="forecast-list">
                <ForecastCardHeaders/>
                {dayForecastDetail.map((forecastDetail)=> <ForecastCard key={forecastDetail.dt} forecastDetail={forecastDetail}/>)}
            </ul>
        </div>
    )
}

export function FourDayForecast ({newDayIndexes, fullForecastList}) {
    if (!Array.isArray(fullForecastList) || fullForecastList.length === 0) {
        return <div className="forecast-empty">Sorry, no forecast available</div>
    }

    const dayBoundaries = getDayBoundaries(newDayIndexes)
    const fourDayIndexGroups = dayBoundaries.slice(0, 4).map((dayStart, dayIndex) => ({ dayStart, dayEnd: dayBoundaries[dayIndex + 1], dayIndex }))

    return (
        <>
            {fourDayIndexGroups.map((dayIndexGroup) => renderDayForecast(dayIndexGroup, fullForecastList))}
        </>
    )
}