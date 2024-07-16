import { getDayMonthStamp, getHrMinTimeStamp } from "../../utils/utils"
import { ForecastCard, ForecastCardHeaders } from "./forecast-card"


export function CurrentDayForecast ({newDayIndexes, forecastArray}){
    return (
    <>
        <div>
                <h3 className="forecast-title">{`${getDayMonthStamp(forecastArray[0].dt)}`}</h3>
                <ul className="forecast-list">
                <ForecastCardHeaders/>
                {forecastArray.map((element, index)=>{
                    if (index < newDayIndexes[0]) 
                    return <ForecastCard key={element.dt} element={element}/>
                })}
                </ul>
        </div>
        <div>   
            <h3 className="forecast-title">{`${getDayMonthStamp(forecastArray[newDayIndexes[0]].dt)}`}</h3>
            <ul className="forecast-list">
            <ForecastCardHeaders/>
            {forecastArray.map((element, index)=>{
                if (index >= newDayIndexes[0] && index < newDayIndexes[1]) 
                return <ForecastCard key={element.dt} element={element}/>
            })}
            </ul>
        </div>
        <div>
            <h3 className="forecast-title">{`${getDayMonthStamp(forecastArray[newDayIndexes[1]].dt)}`}</h3>
            <ul className="forecast-list">
            <ForecastCardHeaders/>
            {forecastArray.map((element, index)=>{
                if (index >= newDayIndexes[1] && index < newDayIndexes[2]) 
                return <ForecastCard key={element.dt} element={element}/>
            })}
            </ul>
        </div>
    </>
    )
}

export function ThreeDayForecast ({newDayIndexes, forecastArray}) {
return (
    <>
        <div>   
            <h3 className="forecast-title">{`${getDayMonthStamp(forecastArray[newDayIndexes[0]].dt)}`}</h3>
            <ul className="forecast-list">
            <ForecastCardHeaders/>
            {forecastArray.map((element, index)=>{
                if (index >= newDayIndexes[0] && index < newDayIndexes[1]) 
                return <ForecastCard key={element.dt} element={element}/>
            })}
            </ul>
        </div>
        <div>
            <h3 className="forecast-title">{`${getDayMonthStamp(forecastArray[newDayIndexes[1]].dt)}`}</h3>
            <ul className="forecast-list">
            <ForecastCardHeaders/>
            {forecastArray.map((element, index)=>{
                if (index >= newDayIndexes[1] && index < newDayIndexes[2]) 
                return <ForecastCard key={element.dt} element={element}/>
            })}
            </ul>
        </div>
        <div>
            <h3 className="forecast-title">{`${getDayMonthStamp(forecastArray[newDayIndexes[2]].dt)}`}</h3>
            <ul className="forecast-list">
            <ForecastCardHeaders/>
            {forecastArray.map((element, index)=>{
                if (index >= newDayIndexes[2] && index < newDayIndexes[3]) 
                return <ForecastCard key={element.dt} element={element}/>
            })}
            </ul>
        </div>
    </>
)
}