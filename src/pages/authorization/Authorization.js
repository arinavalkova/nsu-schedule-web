import React, {useContext, useState} from 'react';
import './authorization.css'
import {AuthContext} from "../../context";
import {
    getGroupsFromServer,
    getScheduleFromServer,
    setAndGetScheduleFromServer,
    setNewScheduleToServer
} from "../../ServerApi";
import {useHistory} from "react-router-dom";
import {MainPath} from "../../Consts";
import Modal from "../../components/form/modal/Modal";
import SimpleLoadForm from "../../components/form/load/simple/SimpleLoadForm";
import LoadingPage from "../../components/loader/LoadingPage";

const Authorization = () => {

    const router = useHistory()

    const {name, group} = useContext(AuthContext)
    const [nameValue, setNameValue] = name;
    const [groupValue, setGroupValue] = group;

    const [nameState, setNameState] = useState("Валькова Арина Сергеевна");
    const [groupState, setGroupState] = useState("18206")
    const [loadForm, setLoadForm] = useState(false)
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        if (await isScheduleCorrect()) {
            setNameValue(nameState)
            setGroupValue(groupState)
            localStorage.setItem('name', nameState)
            localStorage.setItem('group', groupState)
            console.log(await setAndGetScheduleFromServer(nameState, groupState))
            const data = (await getScheduleFromServer()).data
            console.log("data")
            console.log(data)
            if (data) {
                console.log("*")
                localStorage.setItem('isAuth', "true")
                router.push(MainPath)
                window.location.reload()
            }
        } else alert("Некорректные данные!")
        setLoading(false)
    }

    const setLoadFormEvent = (event) => {
        event.preventDefault()
        setLoadForm(true)
    }

    const load = async (base64) => {
        setLoading(true)
        console.log((window.atob(base64)))
        await setNewScheduleToServer(JSON.parse(decodeURIComponent(escape(window.atob(base64)))))
        console.log("here")
        const data = (await getScheduleFromServer()).data
        if (data) {
            localStorage.setItem('isAuth', "true")
            router.push(MainPath)
            window.location.reload()
        } else {
            alert("Произошла ошибка при загрузке расписания")
        }
        setLoading(false)
    }

    return (
        <div className="parent">
            <div className="authForm">
                <h1 className="child">Поиск расписания</h1>
                <LoadingPage visible={loading}/>
                <div>
                    <input value={nameState}
                           onChange={(e) => setNameState(e.target.value)}
                           className="child" type="text" placeholder="Введите ФИО"/>
                    <input value={groupState}
                           onChange={(e) => setGroupState(e.target.value)}
                           className="child" type="text" placeholder="Введите группу"/>
                    <button onClick={login} className="child">Показать расписание</button>
                    <button onClick={setLoadFormEvent} className="child">Загрузить расписание</button>
                    <Modal visible={loadForm} setVisible={setLoadForm}>
                        <SimpleLoadForm load={load} setVisible={setLoadForm}/>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Authorization;