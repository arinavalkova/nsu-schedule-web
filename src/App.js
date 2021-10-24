import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import ApplicationRouter from "./router/ApplicationRouter";
import {AuthContext} from "./context";

function App() {

    const [name, setName] = useState("")
    const [group, setGroup] = useState("")
    const [findGroup, setFindGroup] = useState("")

    useEffect(() => {
        setName(localStorage.getItem('name'))
        setGroup(localStorage.getItem('group'))
        setFindGroup(localStorage.getItem('findGroup'))
    }, [])

    return (
        <AuthContext.Provider
            value={{name: [name, setName], group: [group, setGroup], findGroup: [findGroup, setFindGroup]}}>
            <BrowserRouter>
                <ApplicationRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
