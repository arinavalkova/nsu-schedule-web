import React, {useState} from 'react';
import "./reg.css"
import LoadingPage from "../../components/loader/LoadingPage";
import {useHistory} from "react-router-dom";
import {GreetPath} from "../../Consts";

const RegPage = () => {

    const [loading, setLoading] = useState(false)

    const router = useHistory()

    const reg = () => {
        setLoading(true)
        setLoading(false)
    }

    const back = () => {
        setLoading(true)
        router.push(GreetPath)
        setLoading(false)
    }

    return (
        <div className="parent">
            <div className="box">
                <h1 className="child">Регистрация</h1>
                <LoadingPage visible={loading}/>
                <div className="regForm">
                    <input className="child" placeholder="Логин"/>
                    <input className="child" placeholder="Пароль"/>
                    <button className="child" onClick={reg}>Зарегистрироваться</button>
                    <button className="child" onClick={back}>Назад</button>
                </div>
            </div>
        </div>
    );
};

export default RegPage;