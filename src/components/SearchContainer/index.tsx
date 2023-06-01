import styled from "styled-components";
import SearchBox from "./SearchBox";
import LocationButton from "./LocationButton";
import { moveDown } from "../Navbar";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
    color: #ffffff;
    animation: ${moveDown} 0.8s ease-in-out;
    @media screen and (max-width:530px){
        flex-direction: column;
        gap: 0.5em;
    }
`;

const SearchContainer = () => {
    return (
        <Container>
            <SearchBox />
            <span>or</span>
            <LocationButton />
        </Container>
    );
};

export default SearchContainer;
