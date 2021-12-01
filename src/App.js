import "./App.css"

import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import ApplicationRouter from "./router/ApplicationRouter";
import { AuthContext } from "./context";
import axios from "axios";
import Cookies from 'js-cookie';
import { isAuthenticated } from "./ServerApi";


function App() {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        (async () => {
            console.log("Setting up credentials")
            axios.defaults.withCredentials = true
            const serverIsAuth = await isAuthenticated()
            axios.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
            setIsAuth(serverIsAuth.data)
        })()
    }, [])

    return <AuthContext.Provider
        value={{
            isAuth: [isAuth, setIsAuth]
        }}>

        <BrowserRouter>
            <ApplicationRouter/>
        </BrowserRouter>
    </AuthContext.Provider>
}

export default App;
