import React, {useState} from 'react';
import LoadingPage from "../../components/loader/LoadingPage";
import "./chooseBase.css"
import {useHistory} from "react-router-dom";
import {MainPath} from "../../Consts";

const ChooseBase = () => {

    const [nameState, setNameState] = useState("Валькова Арина Сергеевна");
    const [groupState, setGroupState] = useState("18206")
    const [loading, setLoading] = useState(false)

    const router = useHistory()

    const

    const next = () => {
        setLoading(true)
        router.push(MainPath)
        setLoading(false)
    }

    return (
        <div className="parent">
            <div className="authForm">
                <h1 className="child">Хотите сохранить базовое расписание?</h1>
                <LoadingPage visible={loading}/>
                <div>
                    <input value={nameState}
                           onChange={(e) => setNameState(e.target.value)}
                           className="child" type="text" placeholder="Введите ФИО"/>
                    <input value={groupState}
                           onChange={(e) => setGroupState(e.target.value)}
                           className="child" type="text" placeholder="Введите группу"/>
                    <button onClick={save} className="child">Сохранить базовым</button>
                    <button onClick={next}>Пропустить</button>
                </div>
            </div>
        </div>
    );
};

export default ChooseBase;