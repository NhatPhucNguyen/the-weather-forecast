import { Weather, WeatherGeneralInfo, WeatherDetail } from ".";
import { CurrentWeather } from "../../App";

//convert country code to country name
const getCountryName = (code: string|undefined): string => {
    let countryName = new Intl.DisplayNames(["en"], { type: "region" });
    if (code !== undefined) {
        return countryName.of(code) || ""
    }
    return "Unknown"
};

//get current local time
const getLocalTime = (timezone: string): string => {
    let utcTime =
        new Date().getTime() / 1000 + new Date().getTimezoneOffset() * 60;
    //to milliseconds
    let timeZoneOffset = Number(timezone);

    let localTime = (utcTime + timeZoneOffset) * 1000;

    const dateTime = new Date(localTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    return dateTime;
};
//return the weather info in type Weather format
export const WeatherConvert = (currentWeather: CurrentWeather): Weather => {
    //get weather general info for General Info component
    let generalInfo: WeatherGeneralInfo = {
        dateTime: getLocalTime(currentWeather.timezone),
        city: currentWeather.name,
        country: getCountryName(currentWeather.sys.country),
        temp: Math.round(Number(currentWeather.main.temp)).toString(),
        condition: currentWeather.weather[0].main,
    };
    //get weather details for Detail Info component
    let weatherDetail: WeatherDetail = {
        humidity: currentWeather.main.humidity,
        windSpeed: currentWeather.wind.speed,
        tempMax: Math.round(Number(currentWeather.main.temp_max)).toString(),
        tempMin: Math.round(Number(currentWeather.main.temp_min)).toString(),
        feelLike: Math.round(Number(currentWeather.main.feels_like)).toString(),
        visibility: currentWeather.visibility,
    };
    return { general: generalInfo, detail: weatherDetail };
};
