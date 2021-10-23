import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import ApplicationRouter from "./router/ApplicationRouter";
import {AuthContext} from "./context";

function App() {

    const [name, setName] = useState("")
    const [group, setGroup] = useState("")

    useEffect(() => {
        setName(localStorage.getItem('name'))
        setGroup(localStorage.getItem('group'))
    }, [])

    return (
        <AuthContext.Provider value={{name: [name, setName], group: [group, setGroup]}}>
            <BrowserRouter>
                <ApplicationRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
