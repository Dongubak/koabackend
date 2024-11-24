import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const TimetableWrapper = styled(Responsive)`
  display: grid;
  grid-template-columns: 50px repeat(6, 1fr); /* 시간 표시 열과 요일 열 */
  grid-template-rows: repeat(8, 1fr); /* 8교시까지 표시하고 이후는 스크롤 */
  gap: 1px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 60vh; /* 화면의 60% 높이만 차지 */
  overflow-y: auto; /* 세로 스크롤 추가 */
`;

const Cell = styled.div`
  color: ${({ isHovered }) => (isHovered ? 'pink' : 'black')};
  font-weight: ${({ isHovered }) => (isHovered ? 'bold' : 'normal')};
  padding: 0.25rem; /* 패딩을 줄여서 텍스트가 더 많이 차지할 수 있도록 */
  text-align: center;
  border: 1px solid #ececec;
  border-radius: 4px;
  font-size: 0.875rem; /* 폰트 크기를 조정하여 텍스트가 더 많이 표시되도록 */
  line-height: 1.2; /* 줄 간격을 좁혀서 더 많은 텍스트가 표시되도록 */
  white-space: nowrap; /* 텍스트가 한 줄에 표시되도록 설정 */
  overflow: hidden; /* 텍스트가 넘치면 숨김 */
  text-overflow: ellipsis; /* 텍스트가 넘치면 ...으로 표시 */
  cursor: pointer; /* 마우스 커서가 포인터로 변경되도록 */
`;

const HeaderCell = styled(Cell)`
  background-color: #f1f1f1;
  font-weight: bold;
  cursor: default; /* 헤더 셀에는 커서를 포인터로 변경하지 않음 */
`;

const TimeCell = styled(Cell)`
  background-color: #f1f1f1;
  font-weight: bold;
  cursor: default; /* 시간 셀에는 커서를 포인터로 변경하지 않음 */
`;



const Timetable = ({ schedule, onDeleteCourseFromCart }) => {
  /// 내부 디자인에 관한 로직이므로 상태관리를 한다고 해서 container에 분리하지 않았음
  console.log(schedule);
  const [hoveredCourse, setHoveredCourse] = useState(null); // hover된 course_name을 저장하는 상태

  const handleMouseEnter = (courseName) => {
    setHoveredCourse(courseName); // 마우스를 올릴 때 상태 업데이트
  };

  const handleMouseLeave = () => {
    setHoveredCourse(null); // 마우스를 떼면 상태 초기화
  };

  // 요일과 교시를 축약된 형태로 정의
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysShort = ['M', 'T', 'W', 'T', 'F', 'S']; // 약자로 표시
  const periods = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <TimetableWrapper>
      <HeaderCell></HeaderCell>
      {daysShort.map((day, index) => (
        <HeaderCell key={days[index]}>{day}</HeaderCell>
      ))}

      {periods.map((period, periodIndex) => (
        <React.Fragment key={period}>
          <TimeCell>{period}</TimeCell>
          {days.map(day => (
            <Cell
              key={`${day}-${periodIndex}`}
              isHovered={schedule[day] && schedule[day][periodIndex] === hoveredCourse}
              onMouseEnter={(e) => e.target.textContent && handleMouseEnter(schedule[day] && schedule[day][periodIndex])}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                e.target.textContent && onDeleteCourseFromCart(schedule[day][periodIndex])
              }}
            >
              {schedule[day] && schedule[day][periodIndex] ? schedule[day][periodIndex] : ''}
            </Cell>
          ))}
        </React.Fragment>
      ))}
    </TimetableWrapper>
  );
};

export default Timetable;