import { AlertContext } from "../contexts/AlertContext"
import { useContext, useEffect } from "react"

import BasicAlert from "./BasicAlert"

const AlertList = () => {
  const {alerts} = useContext(AlertContext)


  return (
    <div className="alert-list">
      {alerts.map((alert, index) => {
        return (<BasicAlert key={index} alertSeverity={alert.severity} alertContent={alert.content}/>)
      })}
    </div>
  )

}

export default AlertList