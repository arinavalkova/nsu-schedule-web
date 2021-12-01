import './addExistsLessonPage.css'

import React, { useEffect, useState } from 'react';
import LoadingPage from "../../components/loader/LoadingPage";
import ScheduleTable from "../../components/table/ScheduleTable";
import { addLessonToServer, getGroupScheduleFromServer, getScheduleFromServer } from "../../ServerApi";
import { useHistory } from "react-router-dom";
import Cell from "../../components/cell/Cell";
import ClickToAddLesson from "../../components/lesson/ClickToAddLesson";
import isEqual from 'lodash.isequal';

const AddExistsLessonPage = props => {
    const [lessons, setLessons] = useState()
    const selectedLessons = []
    const [loading, setLoading] = useState(false)
    const findGroupValue = props.match.params.group

    const router = useHistory()

    useEffect(() => {
        fetchGroupTable()
    }, [])

    const back = () => router.goBack()

    const fetchGroupTable = async () => {
        setLoading(true)
        try {
            const data = (await getGroupScheduleFromServer(findGroupValue)).data
            setLessons(data.table)
            setLoading(false)
            if (!data.table) back()
        } catch (err) {
            alert(err.message)
            back()
        }
    }

    const getUserLessons = async () => {
        const userLessons = []
        const table = await getScheduleFromServer().then(res => res.data.table)
        for (const day of table) {
            for (const subject of day.subjects) {
                userLessons.push({
                    dayNum: day.dayNum,
                    ...subject
                })
            }
        }
        return userLessons
    }

    const removeSelectedLessons = () => {
        const newLessons = []
        for (const day of lessons) {
            let subjects = day.subjects.filter(
                s => !selectedLessons.some(l => isEqual(l, {...s, dayNum: day.dayNum}))
            );
            newLessons.push({
                dayNum: day.dayNum,
                subjects: subjects
            })
        }
        setLessons(newLessons)
    }

    const addSelectedToServer = async () => {
        let answerString = ""
        for (const selectedLesson of selectedLessons) {
            const match = (await getUserLessons())
                .some(it => isEqual(it, selectedLesson))
            const format = selectedLesson.name + " " + selectedLesson.type
            if (match) {
                answerString += "Невозможно добавить! " + format + " уже есть в вашем расписании\n"
            } else {
                try {
                    await addLessonToServer(selectedLesson)
                    answerString += "Сохранено " + format + "!\n"
                } catch (err) {
                    answerString += "Не удалось сохранить " + format + "!\n"
                    console.log(err)
                }
            }
        }
        return answerString
    }

    const save = async () => {
        setLoading(true)
        if (selectedLessons.length === 0) {
            alert("Ничего не выбрано для сохранения")
        } else {
            alert(await addSelectedToServer())
            removeSelectedLessons()
        }
        setLoading(false)
    }

    const addLessonToList = lesson => {
        selectedLessons.push(lesson)
    }

    const deleteLessonFromList = lesson => {
        const index = selectedLessons.indexOf(lesson);
        if (index > -1) {
            selectedLessons.splice(index, 1);
        }
    }

    return <div className="page">
        <div>
            <LoadingPage visible={loading}/>
            <div className="header">
                <h1>Выберите пары для добавления из {findGroupValue}</h1>
            </div>
            <div className="content">
                <ScheduleTable className="contentValue" lessons={lessons} add={addLessonToList}
                               remove={deleteLessonFromList} CellClass={Cell} LessonClass={ClickToAddLesson}/>
                <button className="contentValue" onClick={save}>Сохранить</button>
                <button className="contentValue" onClick={back}>Закрыть</button>
            </div>
        </div>
    </div>
}

export default AddExistsLessonPage;