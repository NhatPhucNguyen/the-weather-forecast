import styled, { keyframes } from "styled-components";

export const moveDown = keyframes`
    from{
        opacity: 0;
        transform: translateY(-10px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
`;
//styling
const NavContainer = styled.nav`
    display: flex;
    flex-direction: row;
    width: 100%;
    color: #ffffff;
    justify-content: space-between;
    align-items: center;
    padding: 0.4em 1em;
    gap: 1em;
    font-weight: bold;
    animation: ${moveDown} 0.6s ease-in-out;
`;
const Title = styled.span`
    font-size: 2em;
`;
const Quote = styled.span`
    font-size: 0.8em;
    text-align: center;
`;

const Start = styled.img`
    width: 3em;
`;
const Mid = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;
const End = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5em;
`;
const IconWrapper = styled.div`
    text-decoration: none;
    color: #ffffff;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;
//Navbar render
const Navbar = () => {
    return (
        <NavContainer>
            <Start src="/logo-white.png"></Start>
            <Mid>
                <Title>The Weather Forecast</Title>
                <Quote>"In fair weather prepare for foul."</Quote>
            </Mid>
            <End>
                <IconWrapper
                    as="a"
                    title="Check my github profile"
                    href="https://github.com/NhatPhucNguyen"
                    target="_blank"
                >
                    <i className="fa-brands fa-github"></i>
                </IconWrapper>
                <IconWrapper as="a" title="Check the source code">
                    <i className="fa-solid fa-code"></i>
                </IconWrapper>
            </End>
        </NavContainer>
    );
};

export default Navbar;
