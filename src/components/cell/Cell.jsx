import React from 'react';
import "./cell.css"

const Cell = ({lessons, remove, LessonClass, add, isWhite, setIsWhite}) => {

    return (
        <div className="cell">
            {lessons.map(lesson =>
                <LessonClass remove={remove} lesson={lesson} key={lesson.id} add={add} isWhite={isWhite}
                             setIsWhite={setIsWhite}/>
            )}
        </div>
    );
};

export default Cell;