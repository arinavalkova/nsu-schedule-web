import React, {useContext, useEffect, useState} from 'react';
import Cell from "../../components/cell/Cell";
import SimpleLesson from "../../components/lesson/SimpleLesson";
import ScheduleTable from "../../components/table/ScheduleTable";
import {addLessonToServer, getGroupScheduleFromServer, getScheduleFromServer} from "../../ServerApi";
import axios from "axios";
import {AuthContext} from "../../context";
import {useHistory} from "react-router-dom";
import {EditPath} from "../../Consts";
import "./addExistsLessonPage.css"
import ClickToAddLesson from "../../components/lesson/ClickToAddLesson";

const AddExistsLessonPage = () => {

        const router = useHistory()

        const {findGroup} = useContext(AuthContext)
        const [findGroupValue, setFindGroupValue] = findGroup

        const [lessons, setLessons] = useState()

        const selectedLessons = []
        const userLessons = []

        useEffect(() => {
            axios.defaults.withCredentials = true
            getGroupSchedule(findGroupValue)
            getUserLessons()
        }, [])

        const getUserLessons = async () => {
            const response = await getScheduleFromServer()
            for (let i = 0; i < response.data.table.length; i++) {
                for (let j = 0; j < response.data.table[i].subjects.length; j++) {
                    userLessons.push(response.data.table[i].subjects[j])
                }
            }
        }

        const getGroupSchedule = async (group) => {
            const response = await getGroupScheduleFromServer(group)
            setLessons(response.data.table)
            console.log(response.data.table)
        }

        const addLesson = async (lesson) => {
            await addLessonToServer(lesson)
            userLessons.push((await getScheduleFromServer()).data.table)
        }

        const close = () => {
            router.push(EditPath)
        }

        const addLessonToList = (lesson) => {
            selectedLessons.push(lesson)
        }

        const deleteLessonFromList = (lesson) => {
            const index = selectedLessons.indexOf(lesson);
            if (index > -1) {
                selectedLessons.splice(index, 1);
            }
        }

        const save = () => {
            let match = false;
            if (selectedLessons.length === 0) {
                alert("Ничего не выбрано для сохранения")
            } else {
                for (const selectedLessonKey in selectedLessons) {
                    for (const userLessonKey in userLessons) {
                        if (userLessonKey.name === selectedLessonKey.name) {
                            match = true
                            alert("Невозможно добавить! Данная пара уже есть в вашем расписании")
                            break
                        }
                    }
                    if (!match) {
                        addLesson(selectedLessons[selectedLessonKey])
                        alert("Сохранено!")
                        match = false
                        const lessonsValue = JSON.parse(JSON.stringify(lessons))
                        for (const lessonsKey in lessonsValue) {
                            for (const subjectKey in lessonsValue[lessonsKey].subjects) {
                                if (lessonsValue[lessonsKey].subjects[subjectKey].name === selectedLessons[selectedLessonKey].name)
                                    lessonsValue[lessonsKey].subjects.splice(subjectKey)
                            }
                        }
                        setLessons(lessonsValue)
                    }
                }
            }
        }

        return (
            <div className="page">
                <div>
                    <div className="header">
                        <h1>Выберите пары для добавления из {findGroupValue}</h1>
                    </div>
                    <div className="content">
                        <ScheduleTable className="contentValue" lessons={lessons} add={addLessonToList}
                                       remove={deleteLessonFromList} CellClass={Cell} LessonClass={ClickToAddLesson}/>
                        <button className="contentValue" onClick={save}>Сохранить</button>
                        <button className="contentValue" onClick={close}>Закрыть</button>
                    </div>
                </div>
            </div>
        );
    }
;

export default AddExistsLessonPage;