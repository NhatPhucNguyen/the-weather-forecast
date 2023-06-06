import { WeatherGeneralInfo } from "./index";
import styled from "styled-components";
import IconDisplay from "../IconDisplay";

export const GeneralInfoWrapper = styled.div<{ isDay: boolean }>`
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

const GeneralInfo = ({
    generalInfo,
    isDay,
}: {
    generalInfo: WeatherGeneralInfo;
    isDay: boolean;
}) => {
    return (
        <GeneralInfoWrapper isDay={isDay}>
            <span>{generalInfo.dateTime}</span>
            <span>{`${generalInfo.city}, ${generalInfo.country}`}</span>
            <IconDisplay condition={generalInfo.condition} dateTime={generalInfo.dateTime}/>
            <span>{generalInfo.temp}&deg;C</span>
            <span>{generalInfo.condition}</span>
        </GeneralInfoWrapper>
    );
};

export default GeneralInfo;
