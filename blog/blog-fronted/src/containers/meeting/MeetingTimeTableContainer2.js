import { useDispatch, useSelector } from "react-redux";
import TimeTable from '../../components/courses/TimeTable';
import { useEffect, useState } from "react";
// import { deleteCourse } from "../../modules/cart";


const initialSchedule = {
    Mon: ['', '', '', '', '', '', '', '', '', ''],
    Tue: ['', '', '', '', '', '', '', '', '', ''],
    Wed: ['', '', '', '', '', '', '', '', '', ''],
    Thu: ['', '', '', '', '', '', '', '', '', ''],
    Fri: ['', '', '', '', '', '', '', '', '', ''],
    Sat: ['', '', '', '', '', '', '', '', '', '']
};

function parseClassTimeToDict(classTime) {
    const result = {};
    const dayPattern = /([A-Z][a-z]{2}):?(\d+(?:,\d+)*)?/g;
    let match;

    while ((match = dayPattern.exec(classTime)) !== null) {
        const day = match[1];  // 요일 (예: Mon)
        const hours = match[2] ? match[2].split(',').map(Number) : [];  // 시간 리스트

        if (result[day]) {
            result[day] = result[day].concat(hours);
        } else {
            result[day] = hours;
        }
    }

    return result;
}

const MeetingTimeTableContainer2 = () => {
   const {groupsTimetable: cart} = useSelector((state) => state.meetings);

   const dispatch = useDispatch();

   const [schedule, setSchedule] = useState({
        Mon: ['', '', '', '', '', '', '', '', '', ''],
        Tue: ['', '', '', '', '', '', '', '', '', ''],
        Wed: ['', '', '', '', '', '', '', '', '', ''],
        Thu: ['', '', '', '', '', '', '', '', '', ''],
        Fri: ['', '', '', '', '', '', '', '', '', ''],
        Sat: ['', '', '', '', '', '', '', '', '', '']
    });

    if(cart) {
        console.log(schedule);
        console.log(cart);
    }

    const onDeleteCourseFromCart = (course_name) => {
        // dispatch(deleteCourse(course_name));
    }

    useEffect(() => {
        const nextSchedule = JSON.parse(JSON.stringify(initialSchedule)); // 깊은 복사로 새로운 객체 생성
        console.log(cart);
        cart.forEach((e) => {
            const userData = e.courses;
            userData.forEach((e) => {
                Object.entries(parseClassTimeToDict(e.class_time)).forEach(([key, value]) => {
                    value.forEach((h) => {
                        nextSchedule[key][h - 1] = e.course_name;
                    });
                });
            })
        });

        setSchedule(nextSchedule);
    }, [cart]);

   return (
      <TimeTable schedule={schedule} onDeleteCourseFromCart={onDeleteCourseFromCart}/>
   );
};

export default MeetingTimeTableContainer2;