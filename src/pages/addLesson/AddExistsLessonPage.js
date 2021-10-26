import React, {useContext, useEffect, useState} from 'react';
import Cell from "../../components/cell/Cell";
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

        useEffect(() => {
            axios.defaults.withCredentials = true
            getGroupSchedule(findGroupValue)
        }, [])

        const getGroupSchedule = async (group) => {
            const response = await getGroupScheduleFromServer(group)
            setLessons(response.data.table)
        }

        const addLesson = async (lesson) => {
            await addLessonToServer(lesson)
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
            return firstLesson.dayNum === secondLesson.dayNum &&
                firstLesson.lessonNum === secondLesson.lessonNum &&
                firstLesson.name === secondLesson.name &&
                firstLesson.odd === secondLesson.odd &&
                firstLesson.optional === secondLesson.optional &&
                firstLesson.room === secondLesson.room &&
                firstLesson.teacher === secondLesson.teacher &&
                firstLesson.type === secondLesson.type
        }

        const getUserLessons = async () => {
            const userLessons = []
            const responseTable = (await getScheduleFromServer()).data.table
            for (let i = 0; i < responseTable.length; i++) {
                const subjects = responseTable[i].subjects
                for (let j = 0; j < subjects.length; j++) {
                    userLessons.push({...subjects[j], dayNum: responseTable[i].dayNum})
                }
            }
            return userLessons
        }

        const save = async () => {
            let lessonsValue = JSON.parse(JSON.stringify(lessons))
            let match = false;
            if (selectedLessons.length === 0) {
                alert("Ничего не выбрано для сохранения")
            } else {
                const userLessons = await getUserLessons()
                for (const selectedLessonKey in selectedLessons) {
                    match = false
                    for (const userLessonKey in userLessons) {
                        if (matchLessons(userLessons[userLessonKey], selectedLessons[selectedLessonKey])) {
                            match = true
                            alert("Невозможно добавить! " + selectedLessons[selectedLessonKey].name +
                                " " + selectedLessons[selectedLessonKey].type + " уже есть в вашем расписании")
                            let next = false
                            // for (const selectedLessonKey in selectedLessons) {
                            //     next = false
                            for (const lessonsKey in lessonsValue) {
                                for (const subjectKey in lessonsValue[lessonsKey].subjects) {
                                    if (matchLessons({
                                        ...lessonsValue[lessonsKey].subjects[subjectKey],
                                        dayNum: lessonsValue[lessonsKey].dayNum
                                    }, selectedLessons[selectedLessonKey])) {
                                        lessonsValue[lessonsKey].subjects.splice(subjectKey)
                                        next = true
                                        break
                                    }
                                }
                                if (next) break
                            }
                        }
                        break
                    }
                    if (!match) {
                        addLesson(selectedLessons[selectedLessonKey])
                        alert("Сохранено " + selectedLessons[selectedLessonKey].name + " " + selectedLessons[selectedLessonKey].type + "!")
                        match = false
                        let next = false
                        console.log(lessons)
                        lessonsValue = JSON.parse(JSON.stringify(lessons))
                        // for (const selectedLessonKey in selectedLessons) {
                        //     next = false
                        for (const lessonsKey in lessonsValue) {
                            for (const subjectKey in lessonsValue[lessonsKey].subjects) {
                                if (matchLessons({
                                    ...lessonsValue[lessonsKey].subjects[subjectKey],
                                    dayNum: lessonsValue[lessonsKey].dayNum
                                }, selectedLessons[selectedLessonKey])) {
                                    console.log("deleting")
                                    console.log(selectedLessons[selectedLessonKey])
                                    lessonsValue[lessonsKey].subjects.splice(subjectKey)
                                    console.log(lessonsValue)
                                    //setLessons(lessonsValue)
                                    console.log(lessons)
                                    next = true
                                    break
                                }
                            }
                            if (next) break
                        }
                        //}
                        //  setLessons(lessonsValue)
                    }
                }
                console.log("&%*%&*($&%&^*")
                console.log(lessonsValue)
                setLessons(lessonsValue)
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