export default function WeatherHeader ({city}) {
    return <h2 className="forecast-header">{city.toUpperCase()} WEATHER</h2>
}
