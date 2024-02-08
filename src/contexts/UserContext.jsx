import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext()


export const UserProvider =({children}) => {
    const [loggedInUser, setLoggedInUser] = useState({
        "username": "tickle122",
        "name": "Tom Tickle",
        "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
    })
    const [defaultImageUrl, setDefaultImageUrl] = useState(`https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg`)


    return (
        <UserContext.Provider value={{loggedInUser, setLoggedInUser, defaultImageUrl}}>
            { children }
        </UserContext.Provider>
    )
}