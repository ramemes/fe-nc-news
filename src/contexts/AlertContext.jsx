import { createContext } from "react";
import { useState, useEffect } from "react";

export const AlertContext = createContext()


export const AlertProvider =({children}) => {
    const [alerts, setAlerts] = useState([])
    const [alertsWereChanged, setAlertsWereChanged] = useState(false)
    useEffect(() => {
        if (alerts) {
            setTimeout(() => {
                setAlerts([])
            }, 1000)  
        }

      },[alertsWereChanged])
    
    return (
        <AlertContext.Provider value={{alerts, setAlerts, setAlertsWereChanged}}>
            { children }
        </AlertContext.Provider>
    )
}