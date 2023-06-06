import styled, { keyframes } from "styled-components";
import { CurrentWeather } from "../../App";
import DetailInfo from "./DetailInfo";
import GeneralInfo from "./GeneralInfo";
import { useEffect, useState, Fragment } from "react";
import { moveDown } from "../Navbar";
import { WeatherConvert } from "./utilities";
import WeatherPrediction from "../WeatherPrediction";
import { WeatherContext } from "../../context/WeatherContext";
import { Button } from "../SearchContainer/LocationButton";

//animation
const rotate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;
//styles
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    animation: ${moveDown} 1s ease-in-out;
`;

const CurrentWeatherItem = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    background-color: #ffffff;
    width: 35em;
    border: #b4b4b4 3px solid;
    box-shadow: rgba(218, 218, 218, 0.35) 0px 5px 15px;
    @media screen and (max-width: 530px) {
        width: 23em;
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

const ShowButton = styled(Button)`
    background-color: #e79600;
    &:hover {
        background-color: #b97900;
    }
    &:active {
        background-color: #e79600;
    }
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
    coord: { lat: string; long: string };
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
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        if (!props.isLoading) {
            setWeather(WeatherConvert(props.currentWeather));
            setIsShow(false);
        }
    }, [props]);

    return (
        <Fragment>
            {weather !== undefined && !props.isLoading ? (
                <Container>
                    <CurrentWeatherItem>
                        <GeneralInfo
                            generalInfo={weather.general}
                            isDay={isDayValid(weather)}
                        />
                        <DetailInfo
                            weatherDetail={weather.detail}
                            isDay={isDayValid(weather)}
                        />
                    </CurrentWeatherItem>
                    <ShowButton
                        onClick={() => {
                            setIsShow(!isShow);
                        }}
                    >
                        {isShow ? "Hide" : "Show"} next 5 days
                    </ShowButton>
                    {isShow && (
                        <WeatherContext.Provider
                            value={{ coord: weather.general.coord }}
                        >
                            <WeatherPrediction />
                        </WeatherContext.Provider>
                    )}
                </Container>
            ) : (
                <Loader />
            )}
        </Fragment>
    );
};

export default WeatherContainer;
