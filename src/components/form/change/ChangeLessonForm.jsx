import React, {useState} from 'react';
import "./changeLessonForm.css"
import Select from "../Select";
import {dayNums, days, lessonNums, times} from "../../../Consts";

const ChangeLessonForm = ({lesson, deleteLesson, changeLesson, setVisible}) => {

    const newLessonFields = {
        lessonNum: lesson.lessonNum,
        dayNum: lesson.dayNum,
        room: lesson.room
    };

    const [newLesson, setNewLesson] = useState(newLessonFields)

    const close = (e) => {
        e.preventDefault()
        setVisible(false)
    }

    const remove = (e) => {
        e.preventDefault()
        deleteLesson(lesson)
        setVisible(false)
    }

    const change = (e) => {
        e.preventDefault()
        changeLesson(lesson, newLesson)
        setNewLesson(newLessonFields)
        setVisible(false)
    }

    return (
        <form>
            <div>
                <h1>Редактирование занятия</h1>
                <div className="changeLessonsParamsBox">
                    <Select value={newLesson.lessonNum}
                            onChange={(e) => setNewLesson({...newLesson, lessonNum: e.target.value})}
                            defaultText={"Выберите время"} listOfContent={times} listOfValues={lessonNums}/>
                    <Select value={newLesson.dayNum}
                            onChange={(e) => setNewLesson({...newLesson, dayNum: e.target.value})}
                            defaultText={"Выберите день"} listOfContent={days} listOfValues={dayNums}/>
                    <input id="roomInput" type="text" placeholder="Аудитория" value={newLesson.room}
                           onChange={(e) => setNewLesson({...newLesson, room: e.target.value})}/>
                    <button className="changeFormButton" onClick={change}>Сохранить изменения</button>
                    <button className="changeFormButton" onClick={remove}>Удалить занятие</button>
                    <button className="changeFormButton" onClick={close}>Закрыть</button>
                </div>
            </div>
        </form>
    );
};

export default ChangeLessonForm;