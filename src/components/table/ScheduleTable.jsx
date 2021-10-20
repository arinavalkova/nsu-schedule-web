import React from 'react';
import Cell from "../cell/Cell";
import {times, lessonNums, dayNums} from "../../Consts"

const ScheduleTable = ({lessons, remove, Cel}) => {

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
                            <td><Cel remove={remove}
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