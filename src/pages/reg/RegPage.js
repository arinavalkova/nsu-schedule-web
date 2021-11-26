import React, {useState} from 'react';
import "./reg.css"
import LoadingPage from "../../components/loader/LoadingPage";
import {useHistory} from "react-router-dom";
import {GreetPath} from "../../Consts";
import {registerOnTheServer} from "../../ServerApi";

const RegPage = () => {

    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const router = useHistory()

    const reg = () => {
        setLoading(true)
        const response = registerOnTheServer(login, password)
        console.log(response)
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
                    <input className="child" placeholder="Логин" value={login}
                           onChange={e => setLogin(e.target.value)}/>
                    <input className="child" placeholder="Пароль" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <button className="child" onClick={reg}>Зарегистрироваться</button>
                    <button className="child" onClick={back}>Назад</button>
                </div>
            </div>
        </div>
    );
};

export default RegPage;