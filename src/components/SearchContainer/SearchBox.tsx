import { useContext, useState } from "react";
import styled from "styled-components";
import { PageContext } from "../../context/PageContext";

const SearchForm = styled.form`
    width: 20em;
    display: grid;
    grid-template-columns: 80% 20%;
    background-color: #ffffff;
    border-radius: 50px;
`;

const SearchInput = styled.input`
    width: 100%;
    font-family: inherit;
    padding: 0.5em 0 0.5em 1em;
    font-size: 1em;
    border-radius: inherit;
    border: none;
    outline: none;
`;

const SearchButton = styled.button`
    width: 100%;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border: none;
    outline: none;
    background-color: #21aafa;
    &:hover {
        cursor: pointer;
        background-color: #659dbd;
    }
    &:active {
        background-color: #21aafa;
    }
`;

const SearchBox = () => {
    const pageContext = useContext(PageContext);
    const [cityName, setCityName] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(e.currentTarget.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        pageContext.getWeather({ city: cityName });
    };
    return (
        <SearchForm onSubmit={handleSubmit}>
            <SearchInput
                type="text"
                placeholder="Search by location"
                value={cityName}
                onChange={handleChange}
            />
            <SearchButton>
                <i className="fa-solid fa-magnifying-glass fa-lg"></i>
            </SearchButton>
        </SearchForm>
    );
};

export default SearchBox;
