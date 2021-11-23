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
import LoadingPage from "../../components/loader/LoadingPage";

const AddExistsLessonPage = () => {

        const router = useHistory()
        const {findGroup} = useContext(AuthContext)
        const [findGroupValue, setFindGroupValue] = findGroup
        const [lessons, setLessons] = useState()
        const selectedLessons = []
        const [loading, setLoading] = useState(false)

        useEffect(() => {
            axios.defaults.withCredentials = true
            getGroupSchedule(findGroupValue)
        }, [])

        const getGroupSchedule = async (group) => {
            setLoading(true)
            const response = await getGroupScheduleFromServer(group)
            setLessons(response.data.table)
            setLoading(false)
        }

        const addLesson = async (lesson) => {
            setLoading(true)
            await addLessonToServer(lesson)
            setLoading(false)
        }

        const close = () => {
            setLoading(true)
            router.push(EditPath)
            setLoading(false)
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
            setLoading(true)
            const userLessons = []
            const responseTable = (await getScheduleFromServer()).data.table
            for (let i = 0; i < responseTable.length; i++) {
                const subjects = responseTable[i].subjects
                for (let j = 0; j < subjects.length; j++) {
                    userLessons.push({...subjects[j], dayNum: responseTable[i].dayNum})
                }
            }
            return userLessons
            setLoading(false)
        }

        const deleteLessonFromCurrentTable = (lessons, lesson) => {
            let next = false
            for (const lessonsKey in lessons) {
                for (const subjectKey in lessons[lessonsKey].subjects) {
                    if (matchLessons({
                        ...lessons[lessonsKey].subjects[subjectKey],
                        dayNum: lessons[lessonsKey].dayNum
                    }, lesson)) {
                        lessons[lessonsKey].subjects.splice(subjectKey)
                        next = true
                        break
                    }
                }
                if (next) break
            }
        }

        const save = async () => {
            setLoading(true)
            let lessonsValue = JSON.parse(JSON.stringify(lessons))
            let match = false;
            if (selectedLessons.length === 0) {
                alert("Ничего не выбрано для сохранения")
            } else {
                let answerString = ""
                const userLessons = await getUserLessons()
                for (const selectedLessonKey in selectedLessons) {
                    match = false
                    for (const userLessonKey in userLessons) {
                        if (matchLessons(userLessons[userLessonKey], selectedLessons[selectedLessonKey])) {
                            match = true
                            answerString = answerString + "Невозможно добавить! " + selectedLessons[selectedLessonKey].name +
                                " " + selectedLessons[selectedLessonKey].type + " уже есть в вашем расписании\n"
                            deleteLessonFromCurrentTable(lessonsValue, selectedLessons[selectedLessonKey])
                        }
                    }
                    if (!match) {
                        addLesson(selectedLessons[selectedLessonKey])
                        answerString = answerString + "Сохранено " +
                            selectedLessons[selectedLessonKey].name + " " + selectedLessons[selectedLessonKey].type + "!\n"
                        match = false
                        deleteLessonFromCurrentTable(lessonsValue, selectedLessons[selectedLessonKey])
                    }
                }
                setLessons(lessonsValue)
                alert(answerString)
            }
            setLoading(false)
        }

        return (
            <div className="page">
                <div>
                    <LoadingPage visible={loading}/>
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