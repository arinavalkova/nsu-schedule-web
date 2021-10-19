import React from 'react';
import cl from './DeleteLessonModal.module.css'

const DeleteLessonForm = ({lesson, deleteLesson, setVisible}) => {

    const close = () => {
        setVisible(false)
    }

    const remove = () => {
        //remove
        setVisible(false)
    }

    return (
        <form>
            <h1>Заголовок</h1>
            {/*<button onClick={close}>Закрыть</button>*/}
            {/*<button onClick={remove}>Удалить</button>*/}
        </form>
    );
};

export default DeleteLessonForm;