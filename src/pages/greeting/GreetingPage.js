import "./greeting.css"

import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {AuthPath, MainPath, RegPath} from "../../Consts";
import LoadingPage from "../../components/loader/LoadingPage";
import {
    getBaseScheduleFromServer,
    getGroupsFromServer,
    getScheduleFromServer, logoutFromServer,
    setAndGetScheduleFromServer,
    setNewScheduleToServer
} from "../../ServerApi";
import Modal from "../../components/form/modal/Modal";
import SimpleLoadForm from "../../components/form/load/simple/SimpleLoadForm";
import {AuthContext} from "../../context";
import axios from "axios";

const GreetingPage = () => {

    const [loading, setLoading] = useState(false)
    const [nameState, setNameState] = useState("");
    const [groupState, setGroupState] = useState("")
    const [loadForm, setLoadForm] = useState(false)

    const {isAuth} = useContext(AuthContext)
    const [isAuthValue, setIsAuthValue] = isAuth;

    useEffect(() => {
        axios.defaults.withCredentials = true
        getBaseSchedule()
    }, [isAuth])


    const getBaseSchedule = async () => {
        if (isAuthValue == "true") {
            const response = await getBaseScheduleFromServer()
            setNameState(response.name)
            setGroupState(response.groupNum)
        }
    }

    const router = useHistory()

    const auth = () => {
        setLoading(true)
        router.push(AuthPath)
        setLoading(false)
    }

    const reg = () => {
        setLoading(true)
        router.push(RegPath)
        setLoading(false)
    }

    async function isScheduleCorrect() {
        const response = await getGroupsFromServer()
        for (const group of response.data) {
            if (group == groupState)
                return true
        }
        return false
    }

    const showSchedule = async () => {
        setLoading(true)
        if (await isScheduleCorrect()) {
            await setAndGetScheduleFromServer(nameState, groupState)
            const data = (await getScheduleFromServer()).data
            if (data) {
                localStorage.setItem('name', nameState)
                localStorage.setItem('group', groupState)
                router.push(MainPath)
                window.location.reload()
            }
        } else alert("Некорректные данные!")
        setLoading(false)
    }

    const load = async (base64) => {
        setLoading(true)
        console.log((window.atob(base64)))
        await setNewScheduleToServer(JSON.parse(decodeURIComponent(escape(window.atob(base64)))))
        const data = (await getScheduleFromServer()).data
        if (data) {
            router.push(MainPath)
            window.location.reload()
        } else {
            alert("Произошла ошибка при загрузке расписания")
        }
        setLoading(false)
    }

    const setLoadFormEvent = (event) => {
        event.preventDefault()
        setLoadForm(true)
    }

    const logout = async () => {
        setLoading(true)
        await logoutFromServer()
        if (!(await getScheduleFromServer()).data) {
            localStorage.setItem('isAuth', "false")
            setIsAuthValue(false)
            window.location.reload()
        }
        setLoading(false)
    }

    return (
        <div className="parent">
            <div className="box">
                <h1 className="child">Расписание НГУ</h1>
                <LoadingPage visible={loading}/>
                <div className="buttonsBox">
                    {
                        isAuthValue == "false" &&
                        <div>
                            <button className="child" onClick={auth}>Войти</button>
                            <button className="child" onClick={reg}>Регистрация</button>
                        </div>
                    }
                    {
                        isAuthValue == "true" &&
                        <button className="child" onClick={logout}>Выйти</button>
                    }
                    <input value={nameState}
                           onChange={(e) => setNameState(e.target.value)}
                           className="child" type="text" placeholder="Введите ФИО"/>
                    <input value={groupState}
                           onChange={(e) => setGroupState(e.target.value)}
                           className="child" type="text" placeholder="Введите группу"/>
                    <button onClick={showSchedule} className="child">Показать расписание</button>
                    <button onClick={setLoadFormEvent} className="child">Загрузить расписание</button>
                    <Modal visible={loadForm} setVisible={setLoadForm}>
                        <SimpleLoadForm load={load} setVisible={setLoadForm}/>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default GreetingPage;