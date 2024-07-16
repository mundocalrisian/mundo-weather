import "./loading.css"
import loadingSpinner from "../../assets/loading-spinner.svg"

export default function Loading () {
    return (
        <div id="loading">
            <p>Fetching data...</p>
            <img src={loadingSpinner} alt="a spinning sun" />
        </div>
    )
}