import styled from "styled-components";
import PredictionContainer from "./PredictionContainer";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
`;

const WeatherPrediction = () => {
    return (
        <Container>
            <PredictionContainer />
        </Container>
    );
};

export default WeatherPrediction;
