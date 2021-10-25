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
        const [findGroupValue, setFindGroupValue] = findGroup;
        const [lessons, setLessons] = useState()
        const [isWhite, setIsWhite] = useState(false)

        const selectedLessons = []
        const userLessons = []

        useEffect(() => {
            axios.defaults.withCredentials = true
            getGroupSchedule()
            getUserLessons()
        }, [])

        const getUserLessons = async () => {
            const response = await getScheduleFromServer(findGroupValue)
            for (let i = 0; i < response.data.table.length; i++) {
                for (let j = 0; j < response.data.table[i].subjects.length; j++) {
                    userLessons.push(response.data.table[i].subjects[j])
                }
            }
        }

        const getGroupSchedule = async () => {
            const response = await getGroupScheduleFromServer(findGroupValue)
            setLessons(() => response.data.table)
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

        const matchLessons = (firstLesson, secondLesson) => {
            console.log("FJENFJENJFNJ")
            console.log(firstLesson.name)
            console.log(secondLesson.name)
            if (firstLesson.name === secondLesson.name)
                return true
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
                        // console.log(selectedLessons[selectedLessonKey].name)
                        // const lessonsValue = [lessons]
                        // for (const lessonsKey in lessonsValue[0]) {
                        //     for (const subjectKey in lessonsValue[0][lessonsKey].subjects) {
                        //         if (lessonsValue[0][lessonsKey].subjects[subjectKey].name === selectedLessons[selectedLessonKey].name)
                        //     }
                        // }
                        //setLessons(lessons.filter(lessonKey => lessons[lessonKey].name !== selectedLessons[selectedLessonKey].name))
                        //  setLessons(prevLessons => (prevLessons.filter((lesson) => lesson.name !== selectedLessons[selectedLessonKey].name)))
                        // const index = lessonsValue.indexOf(selectedLessons[selectedLessonKey]);
                        // console.log(selectedLessons[selectedLessonKey])
                        // if (index > -1) {
                        //     lessonsValue.splice(index, 1);
                        // }
                        //
                        // setLessons(lessonsValue)
                    }
                }
            }
            //setIsWhite(true)
        }

        return (
            <div className="page">
                <div>
                    <div className="header">
                        <h1>Выберите пары для добавления из {findGroupValue}</h1>
                    </div>
                    <div className="content">
                        <ScheduleTable className="contentValue" lessons={lessons} add={addLessonToList}
                                       remove={deleteLessonFromList} CellClass={Cell} LessonClass={ClickToAddLesson}
                                       isWhite={isWhite} setIsWhite={setIsWhite}/>
                        <button className="contentValue" onClick={save}>Сохранить</button>
                        <button className="contentValue" onClick={close}>Закрыть</button>
                    </div>
                </div>
            </div>
        );
    }
;

export default AddExistsLessonPage;