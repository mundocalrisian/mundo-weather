import { useState } from "react";
import { coordinatesFromPostcode, postcodeFromCoordinates } from "../utils/api";
import loadingSpinner from "../assets/loading-spinner.svg"
import errorIcon from "../assets/alert-error.svg"
import currentLocationIcon from "../assets/current-location.svg"
import checkIcon from "../assets/check.svg"


function Search ({setNewLatitude, setNewLongitude, setPostCode, setCity}) {
    const [tempLatitude, setTempLatitude] = useState("");
    const [tempLongitude, setTempLongitude] = useState("");
    const [tempPostCode, setTempPostCode] = useState("");
    const [retreivingUserLocation, setRetreivingUserLocation] = useState(false);
    const [calcualtingLocation, setCalcualtingLocation] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault()

        if (tempPostCode){
        setCalcualtingLocation(true);
        coordinatesFromPostcode(tempPostCode)
        .then((response) => {
            const latitude = response.data.results[0].lat
            const longitude = response.data.results[0].lon
            setNewLatitude(latitude)
            setNewLongitude(longitude)
            setPostCode(tempPostCode)
            // postcodeFromCoordinates(latitude, longitude)
            // .then((result) => setCity(result.data.results[0].city))
            setTempPostCode("");
            setError("");
            setCalcualtingLocation(false);
        })
        } 
        if (tempLatitude && tempLongitude){
            setCalcualtingLocation(true);
            setNewLatitude(tempLatitude);
            setNewLongitude(tempLongitude);
            postcodeFromCoordinates(tempLatitude, tempLongitude)
            .then((result) => {
                // setCity(result.data.results[0].city)
                setPostCode(result.data.results[0].postcode)
                });
            setTempLatitude("");
            setTempLongitude("");
            setTempPostCode("");
            setError("");
            setCalcualtingLocation(false);
        }
    }

    const getLocation = () => {
        setRetreivingUserLocation(true);
        
        if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        setRetreivingUserLocation(false);
        return;
        }

        navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError, options);
    }

    function getLocationSuccess(position) {
        setNewLatitude(position.coords.latitude);
        setNewLongitude(position.coords.longitude);
        setError("");
        setRetreivingUserLocation(false);
    }

    function getLocationError(error) {
        setError(error.message);
        setRetreivingUserLocation(false);
        console.log('Whoops, an error occurred - ', error);
    }

    const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
    };

    return(
        <form onSubmit={(event)=>{handleSubmit(event)}}>
            <div className="form-header">
                <h2>Welcome to Mundo Weather!</h2>
                <p>To receive the weather for your location, please click the button below:</p>
            </div>
            <div>
                <button onClick={getLocation} id="get-location-button">
                    Use My Location 
                    {retreivingUserLocation? 
                    <img src={loadingSpinner} alt="a spinning sun" className="location-loading"/>:
                    <img src={currentLocationIcon} className="current-location-icon"/>
                    }
                </button>
            </div>
                {error ? <div id="location-error" className="location-error">
                <img src={errorIcon} className="location-error-icon"/>
                <p className="location-error-text">
                    Whoops! Something went wrong when trying to find your location. 
                </p>
                <p className="location-error-text">
                    Please try again or use a different option below.
                </p>
            </div>: <></>}
            <div>
                <p>Alternatively, please enter either a UK post code or a latitude and longitude:</p>
                <label htmlFor="postcode-input">Postcode</label>
                <input value={tempPostCode} type="text" id="postcode-input" onChange={(event) => {
                setTempPostCode(event.target.value)
                }}/>
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
            <div id="search-submit-button">
                <button type="submit" id="submit-button">
                    Submit
                    {calcualtingLocation? 
                    <img src={loadingSpinner} alt="a spinning sun" className="location-loading"/>: 
                    <img src={checkIcon} className="check-icon"/>}
                </button>
            </div>
        </form>
    )
}

export default Search