import React, {useState} from 'react';
import {times, days} from "../Consts";
import {firstDay, firstTime, firstType, firstWeek} from "../Consts";
import cl from '../styles/AddLessonModal.module.css'

const AddLessonForm = (props) => {

    const [lesson, setLesson] = useState({
        time: firstTime,
        day: firstDay,
        type: firstType,
        name: '',
        room: '',
        tutor: '',
        week: firstWeek
    })

    const addLesson = (e) => {
        e.preventDefault()
        const newLesson = {
            ...lesson, id: Date.now()
        }
        if (lesson.name === '' || lesson.room === '' || lesson.tutor === '') {
            alert("Недостаточно данных для создания пары")
        } else {
            props.addLesson(newLesson)
            setLesson({time: firstTime, day: firstDay, type: firstType, name: '', room: '', tutor: '', week: firstWeek})
            props.setVisible(false)
        }
    }

    return (
        <form>
            <div className={cl.addLesson}>
                <select id="timeSelect" value={lesson.time}
                        onChange={(e) => setLesson({...lesson, time: e.target.value})}>
                    <option disabled>Выберите время</option>
                    {times.map(time =>
                        <option value={time} key={time}>{time}</option>
                    )}
                </select>
                <select id="daySelect" value={lesson.day}
                        onChange={(e) => setLesson({...lesson, day: e.target.value})}>
                    <option disabled>Выберите день</option>
                    {days.map(day =>
                        <option value={day} key={day}>{day}</option>
                    )}
                </select>
                <select id="typeSelect" value={lesson.type}
                        onChange={(e) => setLesson({...lesson, type: e.target.value})}>
                    <option disabled>Выберите тип</option>
                    <option value="лек">лекция</option>
                    <option value="сем">семинар</option>
                </select>
                <input id="nameInput" type="text" placeholder="Название пары" value={lesson.name}
                       onChange={(e) => setLesson({...lesson, name: e.target.value})}/>
                <input id="roomInput" type="text" placeholder="Аудитория" value={lesson.room}
                       onChange={(e) => setLesson({...lesson, room: e.target.value})}/>
                <input id="tutorInput" type="text" placeholder="Преподаватель" value={lesson.tutor}
                       onChange={(e) => setLesson({...lesson, tutor: e.target.value})}/>
                <select id="weekSelect" value={lesson.week}
                        onChange={(e) => setLesson({...lesson, week: e.target.value})}>
                    <option disabled>Выберите частоту</option>
                    <option>четная</option>
                    <option>нечетная</option>
                </select>
                <button onClick={addLesson}>Создать пару</button>
            </div>
        </form>
    );
};

export default AddLessonForm;