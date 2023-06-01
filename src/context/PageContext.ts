import { createContext } from "react";

export type Options = {
    lat?: string;
    long?: string;
    city?: string;
};

type defaultValue = {
    getWeather: (options: Options) => void;
};
export const PageContext = createContext({} as defaultValue);
