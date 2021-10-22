import React, {useContext, useState} from 'react';
import './authorization.css'
import {GroupContext} from "../../context";
import {getGroupsFromServer} from "../../ServerApi";
import {useHistory} from "react-router-dom";
import {MainPath} from "../../Consts";

const Authorization = () => {

    const router = useHistory()

    const {group, setGroup} = useContext(GroupContext)
    const [groupState, setGroupState] = useState("")

    async function isScheduleCorrect() {
        const response = await getGroupsFromServer()
        for (const group of response.data) {
            if (group == groupState)
                return true
        }
        return false
    }

    const login = async event => {
        event.preventDefault()
        if (await isScheduleCorrect()) {
            setGroup(groupState)
            localStorage.setItem('auth', groupState)
            router.push(MainPath)
        } else alert("Некорректные данные!")
    }

    return (
        <div className="parent">
            <div className="authForm">
                <h1 className="child">Поиск расписания</h1>
                <form onSubmit={login}>
                    <input className="child" type="text" placeholder="Введите ФИО"/>
                    <input value={groupState} onChange={(e) => setGroupState(e.target.value)}
                           className="child" type="text" placeholder="Введите группу"/>
                    <button className="child">Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default Authorization;