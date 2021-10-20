import React from 'react';
import "./DeleteLessonModal.module.css"

const DeleteLessonForm = ({lesson, deleteLesson, setVisible}) => {

    const close = (e) => {
        e.preventDefault()
        setVisible(false)
    }

    const remove = (e) => {
        e.preventDefault()
        deleteLesson(lesson)
        setVisible(false)
    }

    return (
        <form>
            <div>
                <h1>Удалить занятие?</h1>
                <div>
                    <button className="deleteFormButton" onClick={remove}>Удалить</button>
                    <button className="deleteFormButton" onClick={close}>Закрыть</button>
                </div>
            </div>
        </form>
    );
};

export default DeleteLessonForm;