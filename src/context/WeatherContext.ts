import { createContext } from "react";

type defaultValue = {
    coord: { lat: string; long: string };
};

export const WeatherContext = createContext({} as defaultValue);
