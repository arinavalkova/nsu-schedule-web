import React from 'react';
import Lesson from "./Lesson";

const Cell = (props) => {

    return (
        <div className="cell">
            {props.lessons.map(lesson =>
                <Lesson lesson = {lesson}/>
            )}
        </div>
    );
};

export default Cell;