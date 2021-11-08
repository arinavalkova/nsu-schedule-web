import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import ApplicationRouter from "./router/ApplicationRouter";
import {AuthContext} from "./context";
import axios from "axios";

function App() {

    const [name, setName] = useState("")
    const [group, setGroup] = useState("")
    const [isAuth, setIsAuth] = useState("")
    const [findGroup, setFindGroup] = useState("")

    useEffect(() => {
        setName(localStorage.getItem('name'))
        setGroup(localStorage.getItem('group'))
        setFindGroup(localStorage.getItem('findGroup'))
        setIsAuth(localStorage.getItem('isAuth'))
        axios.defaults.withCredentials = true
    }, [])

    return (
        <AuthContext.Provider
            value={{
                name: [name, setName],
                group: [group, setGroup],
                findGroup: [findGroup, setFindGroup],
                isAuth: [isAuth, setIsAuth]
            }}>
            <BrowserRouter>
                <ApplicationRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
