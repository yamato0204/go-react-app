
import React, {  createContext, useContext, useState } from "react";


export const UserContext = createContext<any>(null);
export const UserUpdateContext = createContext<any>(null);


export const UserProvider = ({ children }:any)  => { 
    const[stateContent, setContent] = useState("");

    return (

        <UserContext.Provider value={stateContent}>
            <UserUpdateContext.Provider value={setContent}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>


    )



}

export const useUser = () => useContext(UserContext);

export const useUpdateUser = () => useContext(UserUpdateContext);



