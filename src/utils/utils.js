import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function formatDateTime(unixTimeStamp, options, locale = 'en-GB', timeZone) {
    const date = new Date(unixTimeStamp * 1000)
    return new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(date)
}

export function getLocalDayString(unixTimeStamp, locale = 'en-GB', timeZone = 'Europe/London'){
    return formatDateTime(unixTimeStamp, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }, locale, timeZone)
}

export function getHrMinTimeStamp(unixTimeStamp, locale = 'en-GB', timeZone = 'UTC'){
    return formatDateTime(unixTimeStamp, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }, locale, timeZone)
}

export function getDayMonthStamp(unixTimeStamp, locale = 'en-GB', timeZone = 'Europe/London'){
    return formatDateTime(unixTimeStamp, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    }, locale, timeZone)
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

