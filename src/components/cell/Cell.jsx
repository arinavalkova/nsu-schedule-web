import React from 'react';
import "./cell.css"

const Cell = ({lessons, remove, LessonClass, add}) => {

    return (
        <div className="cell">
            {lessons.map(lesson =>
                <LessonClass remove={remove} lesson={lesson} key={lesson.id} add={add}/>
            )}
        </div>
    );
};

export default Cell;