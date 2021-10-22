import '../../App.css';
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import ScheduleTable from "../../components/table/ScheduleTable";
import {GroupContext} from "../../context";
import {useHistory} from "react-router-dom";
import Cell from "../../components/cell/Cell";
import ClickToDeleteLesson from "../../components/lesson/ClickToDeleteLesson";
import "./editPage.css"
import {MainPath} from "../../Consts";
import {
    addLessonToServer,
    deleteLessonFromServer,
    getScheduleFromServer,
    setAndGetScheduleFromServer
} from "../../ServerApi";

function EditPage() {
    const router = useHistory()

    const {group, setGroup} = useContext(GroupContext)
    const [lessons, setLessons] = useState()
    const [currentGroup] = useState(group)

    useEffect(() => {
        axios.defaults.withCredentials = true
        setUserSchedule(currentGroup)
    }, [currentGroup])

    const setUserSchedule = async (group) => {
        const response = await setAndGetScheduleFromServer(group)
        setLessons(response.data.table)
    }

    const addLesson = async (lesson) => {
        await addLessonToServer(lesson)
        setLessons((await getScheduleFromServer()).data.table)
    }

    const removeLesson = async (lesson) => {
        await deleteLessonFromServer(lesson)
        setLessons((await getScheduleFromServer()).data.table)
    }

    return (
        <div className="page">
            <div>
                <button className="backButton" onClick={() => router.push(MainPath)}>Назад</button>
                <h1>Редактирование:</h1>
                <div className="content">
                    {/*<Modal visible={addLessonForm} setVisible={setAddLessonForm}>*/}
                    {/*    <AddLessonForm addLesson={addLesson} setVisible={setAddLessonForm}/>*/}
                    {/*</Modal>*/}
                    <ScheduleTable remove={removeLesson} lessons={lessons} CellClass={Cell} LessonClass={ClickToDeleteLesson}/>
                </div>
                {/*<div className="appContent">*/}
                {/*    <button onClick={() => setAddLessonForm(true)}>Создать новую пару</button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default EditPage;