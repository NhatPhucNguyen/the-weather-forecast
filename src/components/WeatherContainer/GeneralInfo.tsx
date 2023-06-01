import { Fragment } from "react";
import { WeatherGeneralInfo } from "./index";
import styled from "styled-components";
import Lottie from "lottie-react";
import clearDay from "../../assets/clear-day.json";
import clearNight from "../../assets/clear-night.json";
import cloudsDay from "../../assets/clouds-day.json";
import cloudsNight from "../../assets/clouds-night.json";
import rainDay from "../../assets/rain-day.json";
import rainNight from "../../assets/rain-night.json";
import snowDay from "../../assets/snow-day.json";
import snowNight from "../../assets/snow-night.json";
const IconContainer = styled.div`
    width: 3em;
`;

const dayTimeCondition: { [key: string]: JSX.Element } = {
    clear: <Lottie animationData={clearDay} />,
    clouds: <Lottie animationData={cloudsDay} />,
    rain: <Lottie animationData={rainDay} />,
    snow: <Lottie animationData={snowDay} />,
};
const nightTimeCondition: { [key: string]: JSX.Element } = {
    clear: <Lottie animationData={clearNight} />,
    clouds: <Lottie animationData={cloudsNight} />,
    rain: <Lottie animationData={rainNight} />,
    snow: <Lottie animationData={snowNight} />,
};
const showIcon = (condition: string, time: string) => {
    let militaryTime = new Date(time).getHours();
    if (militaryTime > 19 || militaryTime < 7) {
        //night time icon
        return nightTimeCondition[condition];
    } else {
        //daytime time icon
        return dayTimeCondition[condition];
    }
};

const GeneralInfo = ({ generalInfo }: { generalInfo: WeatherGeneralInfo }) => {
    return (
        <Fragment>
            <span>{generalInfo.dateTime}</span>
            <span>{`${generalInfo.city}, ${generalInfo.country}`}</span>
            {/* <Image src="https://embed.lottiefiles.com/animation/50649" alt="" /> */}
            <IconContainer>
                {showIcon(
                    generalInfo.condition.toLowerCase(),
                    generalInfo.dateTime
                )}
            </IconContainer>
            <span>{generalInfo.temp}&deg;C</span>
            <span>{generalInfo.condition}</span>
        </Fragment>
    );
};

export default GeneralInfo;
