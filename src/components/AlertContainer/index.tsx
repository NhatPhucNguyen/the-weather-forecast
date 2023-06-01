import styled, { keyframes } from "styled-components";

const scaleUp = keyframes`
    from{
        scale: 0;
        opacity: 0;
    }
    to{
        scale: 1;
        opacity: 1;
    }
`;
const shake = keyframes`
    0% { transform: translateX(0) }
    84%{transform:translateX(0)}
    85% { transform: translateX(5px) }
    90% { transform: translateX(-5px) }
    95% { transform: translateX(5px) }
    100% { transform: translateX(0) }
`;
const AlertWrapper = styled.div`
    background-color: #fc6868;
    font-size: 1em;
    padding: 0.8em;
    color: #ffffff;
    border-radius: 15px;
    animation: ${scaleUp} 0.6s ease-in-out, ${shake} 6s linear infinite;
`;

const AlertContainer = (props: { message: string }) => {
    return (
        <AlertWrapper>
            <span>{props.message}</span>
        </AlertWrapper>
    );
};

export default AlertContainer;
