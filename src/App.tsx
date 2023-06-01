import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import SearchContainer from "./components/SearchContainer";
import WeatherContainer from "./components/WeatherContainer";
import { Options, PageContext } from "./context/PageContext";
import AlertContainer from "./components/AlertContainer";
import Footer from "./components/Footer";

const APIKey = "70884ed83caf40b60f6c5c64af7271c2";

export type CurrentWeather = {
    id: string;
    name: string;
    main: {
        temp: string;
        feels_like: string;
        humidity: string;
        temp_min: string;
        temp_max: string;
    };
    weather: [{ main: string }];
    visibility: string;
    wind: { speed: string };
    timezone: string;
    sys: {
        country?: string;
    };
};
const App = () => {
    const [currentWeather, setCurrentWeather] = useState({} as CurrentWeather);
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({ isError: false, message: "" });
    const getWeather = useCallback(
        (options: Options) => {
            setIsShow(true);
            setIsLoading(true);
            let API = "";
            if (options.city) {
                API = `https://api.openweathermap.org/data/2.5/weather?q=${options.city}&appid=${APIKey}&units=metric`;
            } else {
                API = `https://api.openweathermap.org/data/2.5/weather?lat=${options.lat}&lon=${options.long}&appid=${APIKey}&units=metric`;
            }
            fetch(API)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    setIsShow(false);
                    if (res.status === 404) {
                        setAlert({
                            isError: true,
                            message: "City not found, please try again !",
                        });
                    }
                    if (res.status === 400) {
                        setAlert({
                            isError: true,
                            message:
                                "Please enter name of city you want to check !",
                        });
                    }
                })
                .then((data: CurrentWeather) => {
                    setCurrentWeather(data);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [currentWeather]
    );

    const showContent = () => {
        if (isShow) {
            return (
                <WeatherContainer
                    isLoading={isLoading}
                    currentWeather={currentWeather}
                />
            );
        }
        if (alert.isError) {
            return <AlertContainer message={alert.message} />;
        }
    };
    return (
        <PageContext.Provider value={{ getWeather }}>
            <Navbar />
            <SearchContainer />
            {showContent()}
            <Footer />
        </PageContext.Provider>
    );
};

export default App;
