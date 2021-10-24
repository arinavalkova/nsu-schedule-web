import React, {useContext, useEffect, useState} from 'react';
import Cell from "../../components/cell/Cell";
import SimpleLesson from "../../components/lesson/SimpleLesson";
import ScheduleTable from "../../components/table/ScheduleTable";
import {addLessonToServer, getGroupScheduleFromServer, getScheduleFromServer} from "../../ServerApi";
import axios from "axios";
import {AuthContext} from "../../context";

const AddExistsLessonPage = () => {

    const {findGroup} = useContext(AuthContext)
    const [findGroupValue, setFindGroupValue] = findGroup;
    const [lessons, setLessons] = useState()

    useEffect(() => {
        axios.defaults.withCredentials = true
        getGroupSchedule()
    }, [])

    const getGroupSchedule = async () => {
        const response = await getGroupScheduleFromServer(findGroupValue)
        setLessons(response.data.table)
    }

    const addLesson = async (lesson) => {
        await addLessonToServer(lesson)
        setLessons((await getScheduleFromServer()).data.table)
    }

    return (
        <div>
            <h2>Выберите пары для добавления из {findGroupValue}</h2>
            <ScheduleTable lessons={lessons} CellClass={Cell} LessonClass={SimpleLesson}/>
        </div>
    );
};

export default AddExistsLessonPage;