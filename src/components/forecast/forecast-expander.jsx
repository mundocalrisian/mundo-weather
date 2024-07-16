import { useState } from "react"
import ForecastHeader from "../weather/weather-header"


export default function Expander ({children}) {
    const [isVisible, setIsVisible] = useState(true)
    const city = children.props.city

    function handleClick() {
        setIsVisible((currentVis) => {
            return !currentVis
        })
    }

    function toggleContent () {
        if(isVisible){
            return children
        } else {
            return null
        }
    }


    return (
        <div>
            <h2 className="forecast-header" onClick = {() => handleClick()} >{city.toUpperCase()} FORECAST {isVisible ? '(HIDE)' : '(SHOW)'}</h2>
            {toggleContent()}
        </div>
    )
}