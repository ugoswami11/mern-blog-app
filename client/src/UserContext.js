import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [userInfo, setUserInfo] = useState({});
    const [ready, setReady] = useState(false);

    useEffect(()=>{
        async function fetchProfile(){
            const response = await fetch('http://localhost:5000/profile',{
                credentials: 'include',
            });
            // console.log(response.json());
            const profileData = await response.json();
            setUserInfo(profileData);
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