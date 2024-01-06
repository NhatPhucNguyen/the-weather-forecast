import { useContext, useState, useEffect, Fragment } from "react";
import styled, { keyframes } from "styled-components";

import { APIKey, CurrentWeather } from "../../App";
import { WeatherContext } from "../../context/WeatherContext";
import WeatherItem from "./WeatherItem";

const leftToRight = keyframes`
    from{
        opacity: 0;
        transform: translateX(-30px);
    }
    to{
        opacity: 1;
        transform: translateX(0);
    }
`;

const PredictionItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
`;

const PredictionItem = styled.div<{ duration: number }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 23em;
    gap: 1em;
    border: #b4b4b4 3px solid;
    box-shadow: rgba(218, 218, 218, 0.35) 0px 5px 15px;
    animation: ${leftToRight}
        ${(props) => {
            return `${props.duration * 0.5}s`;
        }}
        ease-in-out;
    h3 {
        background-color: #beff95;
        width: 100%;
        text-align: center;
        padding: 0.3em 0;
    }
    @media screen and (max-width:425px){
        width:100%;
    }
`;
const WeatherListWrapper = styled(PredictionItemsContainer)`
    flex-direction: row;
`;

export interface IPredictionWeather extends CurrentWeather {
    date: string;
    time: string;
}

const convertToPrediction = (predictionArray: Array<CurrentWeather>) => {
    const numberOfDays = 5;
    let sortPreArray = new Array<Array<IPredictionWeather>>(numberOfDays);
    for (let i = 0; i < numberOfDays; i++) {
        sortPreArray.push([] as Array<IPredictionWeather>);
    }
    sortPreArray = [[], [], [], [], []];
    let index = 0;
    predictionArray.forEach((item) => {
        const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "2-digit",
        });
        const time = new Date(item.dt_txt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
        const newItem: IPredictionWeather = {
            ...item,
            date: date,
            time: time,
            main: {
                ...item.main,
                temp: Math.round(Number(item.main.temp)).toString(),
            },
        };
        if (sortPreArray[index].length === 0) {
            sortPreArray[index].push(newItem);
        } else if (sortPreArray[index][0].date !== date) {
            if (index < sortPreArray.length - 1) {
                sortPreArray[index + 1].push(newItem);
                index++;
            }
        } else if (index < sortPreArray.length) {
            sortPreArray[index].push(newItem);
        }
    });
    return sortPreArray;
};

const showPrediction = (predictionArray: Array<CurrentWeather>) => {
    const preConvertedArr = convertToPrediction(predictionArray);
    return (
        <PredictionItemsContainer>
            {preConvertedArr.map((predictionItems) => {
                return (
                    <PredictionItem
                        key={preConvertedArr.indexOf(predictionItems)}
                        duration={preConvertedArr.indexOf(predictionItems) + 1}
                    >
                        <h3>{predictionItems[0].date}</h3>
                        <WeatherListWrapper>
                            {predictionItems.map((item) => {
                                return <WeatherItem weather={item} />;
                            })}
                        </WeatherListWrapper>
                    </PredictionItem>
                );
            })}
        </PredictionItemsContainer>
    );
};

const PredictionContainer = () => {
    const weatherContext = useContext(WeatherContext);
    const [predictionArray, setPredictionArray] =
        useState<Array<CurrentWeather>>();
    useEffect(() => {
        const API = `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherContext.coord.lat}&lon=${weatherContext.coord.long}&appid=${APIKey}&units=metric`;
        fetch(API)
            .then((res) => res.json())
            .then((data: CurrentWeather) => setPredictionArray(data.list));
    }, [weatherContext]);
    return (
        <Fragment>
            {predictionArray && showPrediction(predictionArray)}
        </Fragment>
    );
};

export default PredictionContainer;
