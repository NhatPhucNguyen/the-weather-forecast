import { WeatherDetail } from "./index";
import { Fragment } from "react";

const DetailInfo = ({ weatherDetail }: { weatherDetail: WeatherDetail }) => {
    return (
        <Fragment>
            <span>Humidity: {weatherDetail.humidity}%</span>
            <span>
                Wind speed: {(Number(weatherDetail.windSpeed) * 3.6).toFixed(1)}{" "}
                km/h
            </span>
            <span>Temp max: {weatherDetail.tempMax}&deg;C</span>
            <span>Temp min: {weatherDetail.tempMin}&deg;C</span>
            <span>
                Feel like: {weatherDetail.feelLike}
                &deg;C
            </span>
            <span>
                Visibility: {Number(weatherDetail.visibility) / 1000} km
            </span>
        </Fragment>
    );
};

export default DetailInfo;
