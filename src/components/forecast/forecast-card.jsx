import { getHrMinTimeStamp, tempKelvinToCelsius, windDirection } from "../../utils/utils";

export function ForecastCard ({forecastDetail}) {
    return (
    <div className="forecast-inner-container">
        <div className="day-forecast">{getHrMinTimeStamp(forecastDetail.dt)}</div>
        <img  className="day-forecast-img" src={`https://openweathermap.org/img/wn/${forecastDetail.weather[0].icon}.png`} alt="" />
        <div className="day-forecast-main">{forecastDetail.weather[0].main}</div>
        <div className="day-forecast">{`${tempKelvinToCelsius(forecastDetail.main.temp)}ºC`}</div>
        <div className="day-forecast">{`${Math.round(forecastDetail.wind.speed)}, ${windDirection(forecastDetail.wind.deg)}`}</div>
    </div>)
}

export function ForecastCardHeaders (){
    return (
        <div  className="forecast-inner-container">
            <div className="space-div"></div>
            <div className="forecast-titles-time">Time</div>
            <div className="forecast-titles">Main</div>
            <div className="forecast-titles">Temp</div>
            <div className="forecast-titles">Wind m/s</div>
        </div>
    )
}