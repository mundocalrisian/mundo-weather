import { useEffect } from 'react'
import { useMap } from 'react-leaflet'


export  function getHrMinTimeStamp(unixTimeStamp){
    const date = new Date(unixTimeStamp * 1000)
    // Need to add something for the British Summer Time shift other than the -1 below here - 
    const hours = "0"+ (date.getHours())
    const minutes = "0" + date.getMinutes()
    const formattedTime = `${hours.substr(-2)}:${minutes.substr(-2)}`
    return formattedTime

}

export function getDayMonthStamp(unixTimeStamp){
  const monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const weekdayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const completeDate = new Date(unixTimeStamp * 1000)
  const weekDay = weekdayArray[completeDate.getUTCDay()]
  const date = completeDate.getDate()
  const month = monthArray[completeDate.getMonth()]
  const formattedDate = `${weekDay} ${date} ${month}`
  return formattedDate

}

export function tempKelvinToCelsius (temp) {
  return Math.round((temp - 273.15))
}

export function capitaliseFirstLetter(phrase){
  return `${phrase.slice(0,1).toUpperCase()}${phrase.slice(1)}`
}

export const RecenterAutomatically = ({lat,lng}) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}

export function windDirection (deg) {
  if (deg < 22.5) { return "N" } else
  if (deg < 67.5) { return "NE" } else
  if (deg < 112.5) { return "E" } else
  if (deg < 157.5) { return "SE" } else
  if (deg < 202.5) { return "S" } else
  if (deg < 247.5) { return "SW" } else
  if (deg < 292.5) { return "W" } else
  if (deg < 337.5) { return "NW" } else
  if (deg < 360.0) { return "N" }
  
  // N -      0	    11.25
  // NNE -    11.25	33.75
  // NE -     33.75	56.25
  // ENE -    56.25	78.75
  // E -      78.75	101.25
  // ESE -    101.25	123.75
  // SE -     123.75	146.25
  // SSE -    146.25	168.75
  // S -      168.75	191.25
  // SSW -    191.25	213.75
  // SW -     213.75	236.25
  // WSW -    236.25	258.75
  // W -      258.75	281.25
  // WNW -    281.25	303.75
  // NW -     303.75	326.25
  // NNW -    326.25	348.75
  // N -      348.75	360
}

