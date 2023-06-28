/* eslint-disable react-refresh/only-export-components */
import React from "react"
import { createContext, useContext } from "react";
import { useSelector } from "react-redux";
export interface StatisticProps {
    children : React.ReactNode;
}
const StatisticContext = createContext({} as any);

export const useStatisticContext = () => {
    const Context = useContext(StatisticContext);
    if(!Context) new Error("There si not a context here");
    return Context; 
}
export function StatisticsProvider(props : StatisticProps) {
    const getAverage = ()  : void =>{
        console.log("dkdknd");
    }
    return (
        <StatisticContext.Provider value={{getAverage}}>
            {props.children}
        </StatisticContext.Provider>
    )
}