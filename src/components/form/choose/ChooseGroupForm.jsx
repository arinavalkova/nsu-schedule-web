import React, { useState} from 'react';
import "./chooseGroupForm.css"
import {useHistory} from "react-router-dom";
import {AddPath} from "../../../Consts";

const ChooseGroupForm = ({setVisible, setMenuVisible}) => {
    const router = useHistory()
    const [group, setGroup] = useState("")

    const back = (e) => {
        e.preventDefault()
        setVisible(false)
        setMenuVisible(true)
    }

    const close = (e) => {
        e.preventDefault()
        setVisible(false)
    }

    const find = (e) => {
        e.preventDefault()
        // setFindGroupValue(group)
        // localStorage.setItem('groupValue', group)
        setVisible(false)
        router.push(AddPath + group)
    }

    return (
        <form>
            <div className="block">
                <h1>Введите группу для поиска</h1>
                <div>
                    <input className="chooseFormChild" value={group}
                           onChange={(event => setGroup(event.target.value))}/>
                    <button className="chooseFormChild" onClick={back}>Назад</button>
                    <button className="chooseFormChild" onClick={close}>Закрыть</button>
                    <button className="chooseFormChild" onClick={find}>Поиск</button>
                </div>
            </div>
        </form>
    );
};

export default ChooseGroupForm;