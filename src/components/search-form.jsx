import { useState } from "react";
import { coordinatesFromPostcode, postcodeFromCoordinates } from "../utils/api";


function Search ({setNewLatitude, setNewLongitude, setPostCode, setCity}) {
    const [tempLatitude, setTempLatitude] = useState("")
    const [tempLongitude, setTempLongitude] = useState("")
    const [tempPostCode, setTempPostCode] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        if (tempPostCode){
        coordinatesFromPostcode(tempPostCode)
        .then((response) => {
            const latitude = response.data.results[0].lat
            const longitude = response.data.results[0].lon
            setNewLatitude(latitude)
            setNewLongitude(longitude)
            setPostCode(tempPostCode)
            // postcodeFromCoordinates(latitude, longitude)
            // .then((result) => setCity(result.data.results[0].city))
            setTempPostCode("")
        })
        } 
        if (tempLatitude && tempLongitude){
            setNewLatitude(tempLatitude)
            setNewLongitude(tempLongitude)
            postcodeFromCoordinates(tempLatitude, tempLongitude)
            .then((result) => {
                // setCity(result.data.results[0].city)
                setPostCode(result.data.results[0].postcode)
                })
            setTempLatitude("")
            setTempLongitude("")
            setTempPostCode("")
        }
    }

    return(
        <form onSubmit={(event)=>{handleSubmit(event)}}>
            <div className="form-header">
                <h2>Welcome to Mundo Weather!</h2>
                <p>Please input the latitude and longitude below to receive the current weather for that location</p>
            </div>
            <div className="form-block">
                <label htmlFor="latitude-input" id="latitude-label">Latitude</label>
                <input value={tempLatitude} type="number" id="latitude-input" onChange={(event) => {
                    setTempLatitude(event.target.value)
                }} />
                <label htmlFor="longitude-input" id="logitude-label">Longitude</label>
                <input value={tempLongitude} type="number" id="longitude-input" onChange={(event) => {
                    setTempLongitude(event.target.value);
                }}/>
            </div>
            <div>
                <p>Alternatively, please enter a UK postcode </p>
                <label htmlFor="postcode-input">Postcode</label>
                <input value={tempPostCode} type="text" id="postcode-input" onChange={(event) => {
                setTempPostCode(event.target.value)
                }}/>
            </div>
            <div id="search-submit-button">
                <button type="submit" id="submit-button">Submit</button>
            </div>
        </form>
    )
}

export default Search