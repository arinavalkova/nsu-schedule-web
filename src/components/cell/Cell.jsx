import React from 'react';
import "./cell.css"

const Cell = ({lessons, remove, LessonClass}) => {

    return (
        <div className="cell">
            {lessons.map(lesson =>
                <LessonClass remove={remove} lesson={lesson} key={lesson.id}/>
            )}
        </div>
    );
};

export default Cell;