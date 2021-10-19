import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import ApplicationRouter from "./router/ApplicationRouter";
import {AuthContext} from "./context";

function App() {

    const [isAuth, setIsAuth] = useState("")

    useEffect(() => {
        //localStorage.setItem('auth', '')
        console.log(localStorage.getItem('auth'))
        setIsAuth(localStorage.getItem('auth'))
    }, [])

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            <BrowserRouter>
                <ApplicationRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
