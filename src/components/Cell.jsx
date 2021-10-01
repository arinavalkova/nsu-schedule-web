import React from 'react';
import Lesson from "./Lesson";

const Cell = (props) => {
    return (
        <div className="cell">
            {props.lessons.map(lesson =>
                <Lesson remove = {props.remove} lesson={lesson} key={lesson.id}/>
            )}
        </div>
    );
};

export default Cell;