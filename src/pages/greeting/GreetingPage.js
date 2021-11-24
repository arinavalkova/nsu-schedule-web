import "./greeting.css"

import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {AuthPath, RegPath} from "../../Consts";
import LoadingPage from "../../components/loader/LoadingPage";

const GreetingPage = () => {

    const [loading, setLoading] = useState(false)

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

    return (
        <div className="parent">
            <div className="box">
                <h1 className="child">Расписание НГУ</h1>
                <LoadingPage visible={loading}/>
                <div className="buttonsBox">
                    <button className="child" onClick={auth}>Войти</button>
                    <button className="child" onClick={reg}>Регистрация</button>
                </div>
            </div>
        </div>
    );
};

export default GreetingPage;