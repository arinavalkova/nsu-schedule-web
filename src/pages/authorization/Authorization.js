import React, {useContext, useState} from 'react';
import './authorization.css'
import {AuthContext} from "../../context";

const Authorization = () => {

    const  [setIsAuth] = useContext(AuthContext)
    const [schedule, setSchedule] = useState("")

    const login = event => {
        event.preventDefault()
        setIsAuth(schedule)
    }

    return (
        <div className="parent">
            <div className="authForm">
                <h1 className="child">Авторизация</h1>
                <form>
                    <input className="child" type="text" placeholder="Введите ФИО"/>
                    <input value={schedule} onChange={(e) => setSchedule(e.target.value)}
                           className="child" type="text" placeholder="Введите группу"/>
                    <button className="child" onClick={login}>Авторизоваться</button>
                </form>
            </div>
        </div>
    );
};

export default Authorization;