import { useSelector } from "react-redux";
import TimeTable from '../../components/courses/TimeTable'

function parseClassTime(classTime, courseName) {
   const days = ['월', '화', '수', '목', '금', '토'];
   const schedule = {
       월: ['', '', '', '', '', '', '', '', '', ''],
       화: ['', '', '', '', '', '', '', '', '', ''],
       수: ['', '', '', '', '', '', '', '', '', ''],
       목: ['', '', '', '', '', '', '', '', '', ''],
       금: ['', '', '', '', '', '', '', '', '', ''],
       토: ['', '', '', '', '', '', '', '', '', '']
   };

   // Split by ';' to handle multiple day-time groups
   const timeGroups = classTime.split(';').map(group => group.trim());
   
   timeGroups.forEach(group => {
       const dayPattern = /\((\S+)\)/g;
       let match;
       let lastDay = null;

       // Loop through the group to find each day and its associated times
       while ((match = dayPattern.exec(group)) !== null) {
           const day = match[1];
           lastDay = day;
           const rest = group.slice(match.index + match[0].length);
           const hoursMatch = rest.match(/^(\d+(?:,\d+)*)/);

           if (hoursMatch) {
               const hours = hoursMatch[0].split(',').map(Number);
               hours.forEach(hour => {
                   // Only process hours from 1 to 10, ignore others
                   if (schedule[day] && hour >= 1 && hour <= 10) {
                       schedule[day][hour - 1] = courseName;
                   }
               });
           }

           group = group.slice(match.index + match[0].length + (hoursMatch ? hoursMatch[0].length : 0));
       }

       // If group ends with times without another day, apply to the last found day
       if (lastDay && group.trim()) {
           const hours = group.split(',').map(Number);
           hours.forEach(hour => {
               if (schedule[lastDay] && hour >= 1 && hour <= 10) {
                   schedule[lastDay][hour - 1] = courseName;
               }
           });
       }
   });

   return schedule;
}

function mergeSchedules(schedule1, schedule2) {
   const days = Object.keys(schedule1);
   const mergedSchedule = {}; 

   days.forEach(day => {
       mergedSchedule[day] = schedule1[day].map((slot, index) =>
           slot || schedule2[day][index] // 기존 값이 있으면 유지, 없으면 새로운 값을 사용
       );
   });

   return mergedSchedule;
}

function buildCompleteSchedule(data) {
   const initialSchedule = {
       월: ['', '', '', '', '', '', '', '', '', ''],
       화: ['', '', '', '', '', '', '', '', '', ''],
       수: ['', '', '', '', '', '', '', '', '', ''],
       목: ['', '', '', '', '', '', '', '', '', ''],
       금: ['', '', '', '', '', '', '', '', '', ''],
       토: ['', '', '', '', '', '', '', '', '', '']
   };

   return data.reduce((acc, row) => {
       const { course_name, class_time } = row;
       const parsedSchedule = parseClassTime(class_time, course_name);
       return mergeSchedules(acc, parsedSchedule);
   }, initialSchedule);
}

// // Example usage:
// const data = [
//    { course_name: '수학', class_time: '(월)3,4(수)1' },
//    { course_name: '영어', class_time: '(월)5(수)2,3' },
//    { course_name: '과학', class_time: '(화)1,2' }
//    // 여러 개의 row가 추가됩니다.
// ];

// const completeSchedule = buildCompleteSchedule(data);
// console.log(completeSchedule);

const TimeTableContainer = () => {
   const {cart} = useSelector(({cart}) => (cart));

   const sampleSchedule = buildCompleteSchedule(cart);
   return(
      <TimeTable schedule={sampleSchedule} />
   )
}

export default TimeTableContainer;