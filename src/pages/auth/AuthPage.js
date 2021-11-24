import React, {useState} from 'react';
import "./auth.css"
import {useHistory} from "react-router-dom";
import LoadingPage from "../../components/loader/LoadingPage";
import {GreetPath} from "../../Consts";

const AuthPage = () => {

    const [loading, setLoading] = useState(false)

    const router = useHistory()

    const auth = () => {
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
                <h1 className="child">Авторизация</h1>
                <LoadingPage visible={loading}/>
                <div className="regForm">
                    <input className="child" placeholder="Логин"/>
                    <input className="child" placeholder="Пароль"/>
                    <button className="child" onClick={auth}>Авторизоваться</button>
                    <button className="child" onClick={back}>Назад</button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;