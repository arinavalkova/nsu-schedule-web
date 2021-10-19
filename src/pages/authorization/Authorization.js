import React, {useContext, useState} from 'react';
import './authorization.css'
import {AuthContext} from "../../context";
import {getGroupsFromServer} from "../../ServerApi";
import {useHistory} from "react-router-dom";

const Authorization = () => {

    const router = useHistory()

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [schedule, setSchedule] = useState("")

    async function isScheduleCorrect() {
        const response = await getGroupsFromServer()
        console.log(response.data)
        for (const group of response.data) {
            if (group == schedule)
                return true
        }
        return false
    }

    const login = async event => {
        event.preventDefault()
        if (await isScheduleCorrect()){
            setIsAuth(schedule)
            localStorage.setItem('auth', schedule)
            router.push('/main')
        }
        else alert("Некорректные данные!")
    }

    return (
        <div className="parent">
            <div className="authForm">
                <h1 className="child">Поиск расписания</h1>
                <form onSubmit={login}>
                    <input className="child" type="text" placeholder="Введите ФИО"/>
                    <input value={schedule} onChange={(e) => setSchedule(e.target.value)}
                           className="child" type="text" placeholder="Введите группу"/>
                    <button className="child">Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default Authorization;