import React from 'react';
import DeleteButton from "../DeleteButton";

const LessonWithClick = ({lesson, remove}) => {

    const click = (target) => {
        alert(target.className)
        if (target === "[object HTMLDivElement]") {
            alert("click")
        }
    }

    return (
        <div className="block" onClick={(event => click(event.target))}>
            <div className="lesson">
                <div>{lesson.type}</div>
                <div>{lesson.name}</div>
                <div>{lesson.room}</div>
                <div>{lesson.teacher}</div>
                <div>{lesson.odd? lesson.odd: ""}</div>
            </div>
        </div>
    );
};

export default LessonWithClick;