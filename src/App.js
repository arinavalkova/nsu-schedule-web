import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import ApplicationRouter from "./router/ApplicationRouter";
import {GroupContext} from "./context";

function App() {

    const [group, setGroup] = useState("")

    useEffect(() => {
        setGroup(localStorage.getItem('auth'))
    }, [])

    return (
        <GroupContext.Provider value={{group, setGroup}}>
            <BrowserRouter>
                <ApplicationRouter/>
            </BrowserRouter>
        </GroupContext.Provider>
    );
}

export default App;
