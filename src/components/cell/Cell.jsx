import React from 'react';
import "./cell.css"

const Cell = ({lessons, remove, change, LessonClass, add}) => {

    return (
        <div className="cell">
            {lessons.map(lesson =>
                <LessonClass change={change} remove={remove} lesson={lesson} key={lesson.id} add={add}/>
            )}
        </div>
    );
};

export default Cell;