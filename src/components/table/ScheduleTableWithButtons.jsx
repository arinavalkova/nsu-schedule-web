import React from 'react';
import {times, lessonNums, dayNums} from "../../Consts"
import CellWithClicks from "../cell/CellWithClicks";
import CellWithButtons from "../cell/CellWithButtons";

const ScheduleTableWithButtons = ({lessons, remove}) => {

    const headersNames = ["Время", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

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
                    {headersNames.map(header =>
                        <th>{header}</th>
                    )}
                </tr>
                {lessonNums.map(lessonNum =>
                    <tr>
                        <td className="times">{times[lessonNum - 1]}</td>
                        {dayNums.map(dayNum =>
                            <td><CellWithButtons remove={remove}
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

export default ScheduleTableWithButtons;