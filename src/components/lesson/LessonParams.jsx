import React from 'react';

const LessonParams = ({lesson}) => {
    return (
        <div className="params">
            <div>{lesson.type}</div>
            <div>{lesson.name}</div>
            <div>{lesson.room}</div>
            <div>{lesson.teacher}</div>
            <div>{lesson.odd ? lesson.odd : ""}</div>
        </div>
    );
};

export default LessonParams;