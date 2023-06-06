import styled from "styled-components";
import { GeneralInfoWrapper } from "./GeneralInfo";
import { WeatherDetail } from "./index";
const DetailInfoWrapper = styled(GeneralInfoWrapper)`
    background-color: ${(props) => (props.isDay ? "#ffffff" : "#222222")};
    color: ${(props) => (props.isDay ? "#000000" : "#ffffff")};
    font-size: 1em;
    text-align: center;
    font-size: 0.9em;
    span {
        width: 100%;
        padding: 0.1em;
        border-bottom: 1px solid gray;
    }
    span:last-child {
        border-bottom: none;
    }
`;

const DetailInfo = ({ weatherDetail,isDay }: { weatherDetail: WeatherDetail,isDay:boolean }) => {
    return (
        <DetailInfoWrapper isDay={isDay}>
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
        </DetailInfoWrapper>
    );
};

export default DetailInfo;
