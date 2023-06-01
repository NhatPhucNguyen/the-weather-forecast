import styled, { keyframes } from "styled-components";
import { CurrentWeather } from "../../App";
import DetailInfo from "./DetailInfo";
import GeneralInfo from "./GeneralInfo";
import { useEffect, useState } from "react";
import { moveDown } from "../Navbar";
import { WeatherConvert } from "./utilities";

//animation
const rotate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;
//style
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CurrentWeatherItem = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    background-color: #ffffff;
    width: 35em;
    border: #b4b4b4 3px solid;
    box-shadow: rgba(218, 218, 218, 0.35) 0px 5px 15px;
    animation: ${moveDown} 1s ease-in-out;
    @media screen and (max-width:530px){
        width: 23em;
    }
`;
const GeneralInfoWrapper = styled.div<{ isDay: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.isDay ? "#beff95" : "#414141")};
    color: ${(props) => (props.isDay ? "#000000" : "#ffffff")};
    gap: 0.2em;
    padding: 0.2em;
    text-align: center;
`;
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

const Loader = styled.div`
    width: 4em;
    height: 4em;
    border-radius: 50%;
    border: 10px rgb(255, 255, 255, 0) solid;
    border-top: 10px white solid;
    animation: ${rotate} 1s linear infinite;
`;

//types
export type WeatherDetail = {
    humidity: string;
    windSpeed: string;
    tempMax: string;
    tempMin: string;
    feelLike: string;
    visibility: string;
};
export type WeatherGeneralInfo = {
    dateTime: string;
    city: string;
    temp: string;
    condition: string;
    country: string;
};

export type Weather = {
    detail: WeatherDetail;
    general: WeatherGeneralInfo;
};

//functions
const isDayValid = (weather: Weather) => {
    let militaryHour = new Date(weather.general.dateTime).getHours();
    if (militaryHour > 19 || militaryHour < 7) {
        return false;
    } else {
        return true;
    }
};
//render
const WeatherContainer = (props: {
    isLoading: boolean;
    currentWeather: CurrentWeather;
}) => {
    const [weather, setWeather] = useState<Weather>();
    useEffect(() => {
        if (!props.isLoading) {
            setWeather(WeatherConvert(props.currentWeather));
        }
    }, [props]);

    return (
        <Container>
            {weather !== undefined && !props.isLoading ? (
                <CurrentWeatherItem>
                    <GeneralInfoWrapper isDay={isDayValid(weather)}>
                        <GeneralInfo generalInfo={weather.general} />
                    </GeneralInfoWrapper>
                    <DetailInfoWrapper isDay={isDayValid(weather)}>
                        <DetailInfo weatherDetail={weather.detail} />
                    </DetailInfoWrapper>
                </CurrentWeatherItem>
            ) : (
                <Loader />
            )}
        </Container>
    );
};

export default WeatherContainer;
