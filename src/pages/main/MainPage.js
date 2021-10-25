import '../../App.css';
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import ScheduleTable from "../../components/table/ScheduleTable";
import {AuthContext} from "../../context";
import Cell from "../../components/cell/Cell";
import {useHistory} from "react-router-dom";
import SimpleLesson from "../../components/lesson/SimpleLesson";
import {AuthPath, EditPath} from "../../Consts";
import "./mainPage.css"
import {setAndGetScheduleFromServer} from "../../ServerApi";

function MainPage() {
    const router = useHistory()

    const {name, group} = useContext(AuthContext)
    const [nameValue, setNameValue] = name;
    const [groupValue, setGroupValue] = group;

    const [lessons, setLessons] = useState()

    useEffect(() => {
        axios.defaults.withCredentials = true
        setUserSchedule(nameValue, groupValue)
    }, [groupValue, nameValue])

    const setUserSchedule = async (name, group) => {
        const response = await setAndGetScheduleFromServer(name, group)
        console.log(response.data)
        setLessons(response.data.table)
    }

    const logout = () => {
        setGroupValue("")
        setNameValue("")
        localStorage.setItem('name', "")
        localStorage.setItem('group', "")
        router.push(AuthPath)
    }

    return (
        <div className="page">
            <div>
                <div className="header">
                    <button className="backButton" onClick={logout}>Выйти</button>
                    <button className="editButton" onClick={() => router.push(EditPath)}>Изменить</button>
                    <h1 className="headerText">{nameValue} {groupValue}</h1>
                </div>
                <div className="content">
                    <ScheduleTable lessons={lessons} CellClass={Cell} LessonClass={SimpleLesson}/>
                </div>
            </div>
        </div>
    );
}

export default MainPage;