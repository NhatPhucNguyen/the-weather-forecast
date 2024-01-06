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
const Container = styled.div`
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
const showIcon = (condition: string, dateTime: string) => {
    const militaryTime = new Date(dateTime).getHours();
    if (militaryTime > 19 || militaryTime < 5) {
        //night time icon
        return nightTimeCondition[condition];
    } else {
        //daytime time icon
        return dayTimeCondition[condition];
    }
};

const IconDisplay = ({
    condition,
    dateTime,
}: {
    condition: string;
    dateTime: string;
}) => {
    return <Container>{showIcon(condition.toLowerCase(), dateTime)}</Container>;
};

export default IconDisplay;
