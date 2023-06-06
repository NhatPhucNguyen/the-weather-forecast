import styled from "styled-components";
import { PageContext } from "../../context/PageContext";
import { useContext } from "react";

export const Button = styled.button`
    background-color: #e3cc00;
    font-size: inherit;
    font-weight: bold;
    padding: 0.5em 1em;
    border-radius: 50px;
    color: white;
    border: none;
    outline: none;
    &:hover {
        cursor: pointer;
        background-color: #d2bd00;
    }
    &:active {
        background-color: #ffe400;
    }
`;

const LocationButton = () => {
    const pageContext = useContext(PageContext);
    return (
        <Button
            onClick={() => {
                navigator.geolocation.getCurrentPosition((pos) => {
                    let lat = pos.coords.latitude.toFixed(5);
                    let long = pos.coords.longitude.toFixed(5);
                    pageContext.getWeather({ lat, long });
                });
            }}
        >
            Your current city
        </Button>
    );
};

export default LocationButton;
