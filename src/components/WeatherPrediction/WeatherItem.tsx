import { Fragment } from "react";
import { IPredictionWeather } from "./PredictionContainer";
import IconDisplay from "../IconDisplay";
import styled from "styled-components";

const WeatherItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    padding: 0.3em;
    background-color: #ffffff;
`;

const WeatherItem = ({weather}:{weather:IPredictionWeather}) => {
    return (
        <Fragment>
            <WeatherItemWrapper key={weather.dt_txt}>
                <span>{weather.time}</span>
                <IconDisplay
                    condition={weather.weather[0].main.toLowerCase()}
                    dateTime={weather.dt_txt}
                />
                <span>{weather.main.temp}&deg;C</span>
            </WeatherItemWrapper>
        </Fragment>
    );
};

export default WeatherItem;
