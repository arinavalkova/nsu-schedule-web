import "./greeting.css"
import React, { useContext, useEffect, useState } from 'react';
import {
    getStringFromServer,
    getStudentInfoFromServer,
    logoutFromServer,
    setAndGetScheduleFromServer,
    setNewScheduleToServer
} from "../../ServerApi";
import { useHistory } from "react-router-dom";
import LoadingPage from "../../components/loader/LoadingPage";
import { AuthPath, MainPath, RegPath } from "../../Consts";
import SimpleLoadForm from "../../components/form/load/simple/SimpleLoadForm";
import Modal from "../../components/form/modal/Modal";
import { AuthContext } from "../../context";

const GreetingPage = () => {

    const [loading, setLoading] = useState(false)
    const [nameState, setNameState] = useState("");
    const [groupState, setGroupState] = useState("")
    const [loadForm, setLoadForm] = useState(false)
    const [isAuth, setIsAuth] = useContext(AuthContext).isAuth

    const router = useHistory()

    useEffect(() => {
        if (isAuth) fetchStudentInfo()
    }, [isAuth])

    const fetchStudentInfo = async () => {
        const { name, groupNum } = (await getStudentInfoFromServer()).data
        setNameState(name)
        setGroupState(groupNum)
    }

    const showSchedule = async () => {
        setLoading(true)
        try {
            await setAndGetScheduleFromServer(nameState, groupState)
            router.push(MainPath)
        } catch (error) {
            if (error.response.status === 400)
                alert("Некорректные данные!")
            else
                alert("Неизвестная ошибка")
        }
        setLoading(false)
    }
    const btot = base64 => JSON.parse(decodeURIComponent(escape(window.atob(base64))))

    const loadFromLocal = async base64 => {
        setLoading(true)
        try {
            await setNewScheduleToServer(btot(base64))
            // JSON.parse(decodeURIComponent(escape(window.atob(base64)))))
            router.push(MainPath)
        } catch (err) {
            alert("Произошла ошибка при загрузке расписания")
            console.log(err)
        }
        setLoading(false)
    }

    const loadFromDistant = async link => {
        setLoading(true)
        try {

            const base64 = await getStringFromServer(link)
            await setNewScheduleToServer(btot(base64))
            router.push(MainPath)
        } catch (err) {
            alert("Произошла ошибка!")
            console.log(err.message)
            setLoading(false)
        }

    }

    const setLoadFormEvent = (event) => {
        event.preventDefault()
        setLoadForm(true)
    }

    const logout = async () => {
        setLoading(true)
        await logoutFromServer()
        setIsAuth(false)
        setNameState("")
        setGroupState("")
        setLoading(false)
    }

    return <div className="parent">
        <div className="box">
            <h1>Расписание НГУ</h1>
            <LoadingPage visible={loading}/>
            <div className="buttonsBox">
                {
                    !isAuth &&
                    <div>
                        <button className="child" onClick={() => router.push(AuthPath)}>Вход</button>
                        <button className="child" onClick={() => router.push(RegPath)}>Регистрация</button>
                    </div>
                }
                {
                    isAuth &&
                    <button className="child" onClick={logout}>Выйти</button>
                }
                <div className="child"/>
                <input value={nameState}
                       onChange={e => setNameState(e.target.value)}
                       className="child greatInput" type="text" placeholder="Введите ФИО"/>
                <input value={groupState}
                       onChange={e => setGroupState(e.target.value)}
                       className="child greatInput" type="text" placeholder="Введите группу"/>
                <button
                    onClick={showSchedule}
                    className="child">
                    Показать расписание
                </button>
                <button
                    onClick={setLoadFormEvent}
                    className="child">
                    Загрузить расписание
                </button>
                <Modal visible={loadForm} setVisible={setLoadForm}>
                    <SimpleLoadForm
                        loadFromLocal={loadFromLocal}
                        loadFromDistant={loadFromDistant}
                        setVisible={setLoadForm}/>
                </Modal>
            </div>
        </div>
    </div>
}

export default GreetingPage;