import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [userInfo, setUserInfo] = useState({});
    const [ready, setReady] = useState(false);
    
    useEffect(()=>{
        const fetchProfile = async ()=>{
            const {data} = await axios.get('/profile');
            setUserInfo(data);
            setReady(true);
        }
        fetchProfile();
    },[]);

    return (
    <UserContext.Provider value={{userInfo, setUserInfo, ready}}>
        {children}
    </UserContext.Provider>
    );
}