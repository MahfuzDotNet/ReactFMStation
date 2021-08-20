import React, { createContext, useEffect, useState, ReactNode, FC } from 'react';
import { isJSDocNamepathType } from 'typescript';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import IStation from '../interfaces/Station';

export type ContextState = {
    sortedStations: IStation[];
    addNewStation: (station: IStation) => any;
    displayStation: any[];
};

const contextDefaultValues: ContextState = {
    sortedStations: [],
    addNewStation: () => false,
    displayStation: [],
};

export const StationContext = createContext<ContextState>(
    contextDefaultValues
);

const StationProvider: FC = ({ children }) => {

    const stationList: IStation[] = [];
    const dis: any[] = [];

    const [stations, setStations] = useState<IStation[]>(stationList);
    const [display, setDisplay] = useState(dis);

    useEffect(() => {
        const getData = async () => {
            let i: number = 0;
            await axios.get('http://localhost:4000/stations').then((result: any) => {
                setStations(result.data);
                console.log("result.data--" + JSON.stringify(result.data));

                while (i < result.data.length) {
                    display.push(i);
                    i++;
                }

                setDisplay(display);

            })
        };

        getData();

    }, []);

    const sortedStations = stations.sort((a, b) => (a.stationName > b.stationName ? -1 : 1));

    const displayStation = display;

    const addNewStation = (newStation: IStation) => {
        setStations([...stations, newStation]);
        return appendStation(newStation);
    }

    const appendStation = async (addStation: IStation) => {
        let response = await axios.post('http://localhost:4000/createstation', addStation)
            .then((response: any) => {
                console.log(response);
                console.log(response.data);
                return true;
            });
        return response;
    }

    return (
        <StationContext.Provider value={{ sortedStations, addNewStation, displayStation }}>
            {children}
        </StationContext.Provider>

    )
}

export default StationProvider;
