import React from 'react';
import {times, lessonNums, dayNums, tableHeaders} from "../../Consts"
import "./table.css"

const ScheduleTable = ({lessons, remove, CellClass, LessonClass}) => {

    function getLessonsForThisTimeAndDay(dayNum, lessonNum) {
        if (lessons == null) {
            return []
        }
        return lessons
            .find(lesson => lesson.dayNum === dayNum).subjects
            .filter(subject => subject.lessonNum === lessonNum)
    }

    return (
        <div>
            <table className="scheduleTable">
                <tr>
                    {tableHeaders.map(header =>
                        <th>{header}</th>
                    )}
                </tr>
                {lessonNums.map(lessonNum =>
                    <tr>
                        <td className="times">{times[lessonNum - 1]}</td>
                        {dayNums.map(dayNum =>
                            <td><CellClass remove={remove} LessonClass={LessonClass}
                                           lessons={getLessonsForThisTimeAndDay(dayNum, lessonNum).map(lesson => {
                                             return {...lesson, dayNum: dayNum}
                                         }
                                     )}/>
                            </td>
                        )}
                    </tr>
                )}
            </table>
        </div>
    );
};

export default ScheduleTable;