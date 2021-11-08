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
import {getScheduleFromServer, logoutFromServer, setAndGetScheduleFromServer} from "../../ServerApi";

function MainPage() {
    const router = useHistory()

    const {name, group} = useContext(AuthContext)
    const [nameValue, setNameValue] = name;
    const [groupValue, setGroupValue] = group;

    const [lessons, setLessons] = useState()

    useEffect(() => {
        axios.defaults.withCredentials = true
        setUserSchedule()
    }, [groupValue, nameValue])

    const setUserSchedule = async () => {
        const response = await getScheduleFromServer()
        setLessons(response.data.table)
    }

    const logout = async () => {
        await logoutFromServer()
        if (!(await getScheduleFromServer()).data) {
            localStorage.setItem('isAuth', "false")
            setGroupValue("")
            setNameValue("")
            localStorage.setItem('name', "")
            localStorage.setItem('group', "")
            router.push(AuthPath)
            window.location.reload()
        }
    }

    const save = () => {
        console.log(lessons)
        alert(window.btoa((unescape(encodeURIComponent(JSON.stringify(lessons))))))
    }

    return (
        <div className="page">
            <div>
                <div className="header">
                    <button className="backButton" onClick={logout}>Выйти</button>
                    <button className="editButton" onClick={() => router.push(EditPath)}>Изменить</button>
                    <button className="saveButton" onClick={save}>Сохранить расписание</button>
                </div>
                <div><h1 className="headerText">{nameValue} {groupValue}</h1></div>
                <div className="content">
                    <ScheduleTable lessons={lessons} CellClass={Cell} LessonClass={SimpleLesson}/>
                </div>
            </div>
        </div>
    );
}

export default MainPage;