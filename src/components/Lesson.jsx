import React from 'react';
import DeleteButton from "./DeleteButton";

const Lesson = ({lesson, remove}) => {
    return (
        <div className="block">
            <div className="lesson">
                <div>{lesson.type}</div>
                <div>{lesson.name}</div>
                <div>{lesson.room}</div>
                <div>{lesson.teacher}</div>
                <div>{lesson.odd? lesson.odd: ""}</div>
            </div>
            <DeleteButton remove = {remove} lesson = {lesson}/>
        </div>
    );
};

export default Lesson;