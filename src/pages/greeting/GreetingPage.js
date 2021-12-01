import "./greeting.css"
import React, { useContext, useState } from 'react';
import { logoutFromServer, setAndGetScheduleFromServer, setNewScheduleToServer } from "../../ServerApi";
import { useHistory } from "react-router-dom";
import LoadingPage from "../../components/loader/LoadingPage";
import { AuthPath, MainPath, RegPath } from "../../Consts";
import SimpleLoadForm from "../../components/form/load/simple/SimpleLoadForm";
import Modal from "../../components/form/modal/Modal";
import { AuthContext } from "../../context";

const GreetingPage = () => {

    const [loading, setLoading] = useState(false)
    const [nameState, setNameState] = useState("Валькова Арина Сергеевна");
    const [groupState, setGroupState] = useState("18206")
    const [loadForm, setLoadForm] = useState(false)
    const [isAuth, setIsAuth] = useContext(AuthContext).isAuth

    const router = useHistory()

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

    const loadFromLocal = async base64 => {
        setLoading(true)
        try {
            await setNewScheduleToServer(
                JSON.parse(decodeURIComponent(escape(window.atob(base64)))))
            router.push(MainPath)
        } catch (err) {
            alert("Произошла ошибка при загрузке расписания")
            console.log(err)
        }
        setLoading(false)
    }

    const loadFromDistant = async link => {

    }

    const setLoadFormEvent = (event) => {
        event.preventDefault()
        setLoadForm(true)
    }

    const logout = async () => {
        setLoading(true)
        await logoutFromServer()
        setIsAuth(false)
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
                       className="child" type="text" placeholder="Введите ФИО"/>
                <input value={groupState}
                       onChange={e => setGroupState(e.target.value)}
                       className="child" type="text" placeholder="Введите группу"/>
                <button
                    onClick={showSchedule}
                    className="child">
                    Показать расписание
                </button>
                <button
                    onClick={setLoadFormEvent}
                    className="child" >
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