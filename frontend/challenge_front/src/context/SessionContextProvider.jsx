import { useEffect, useState } from "react";
import { userContext } from "./propContext";

import { getStorageData } from "../controllers/localStorageController";



const SessionContextProvider = ({children}) => {
    const [userData, setUserData] = useState({});
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const data = getStorageData();
        if (data) {
            setUserData(JSON.parse(data));
            setIsLogged(true);
        }else{
            console.log("There is no user")
        }
    }, []);
    return ( 
        <userContext.Provider value={{
            userData, 
            setUserData,
            isLogged,
            setIsLogged
            }}>
            {children}
        </userContext.Provider>
     );
}
 
export default SessionContextProvider;