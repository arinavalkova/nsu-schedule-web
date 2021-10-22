import '../../App.css';
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import ScheduleTable from "../../components/table/ScheduleTable";
import {GroupContext} from "../../context";
import Cell from "../../components/cell/Cell";
import {useHistory} from "react-router-dom";
import SimpleLesson from "../../components/lesson/SimpleLesson";
import {AuthPath, EditPath} from "../../Consts";
import "./mainPage.css"
import {setAndGetScheduleFromServer} from "../../ServerApi";

function MainPage() {
    const router = useHistory()

    const {group, setGroup} = useContext(GroupContext)
    const [currentGroup] = useState(group)
    const [lessons, setLessons] = useState()

    useEffect(() => {
        axios.defaults.withCredentials = true
        setUserSchedule(currentGroup)
    }, [currentGroup])

    const setUserSchedule = async (group) => {
        const response = await setAndGetScheduleFromServer(group)
        setLessons(response.data.table)
    }

    const logout = () => {
        setGroup('')
        localStorage.setItem('auth', '')
        router.push(AuthPath)
    }

    return (
        <div className="page">
            <div>
                <button onClick={logout}>Выйти</button>
                <button className="editButton" onClick={() => router.push(EditPath)}>Изменить</button>
                <h1 className="header">{group}</h1>
                <div className="content">
                    <ScheduleTable lessons={lessons} CellClass={Cell} LessonClass={SimpleLesson}/>
                </div>
            </div>
        </div>
    );
}

export default MainPage;