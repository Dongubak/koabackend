import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';


const TimetableWrapper = styled(Responsive)`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 6일 + 시간 표시 열 */
  grid-template-rows: repeat(11, 1fr); /* 10교시 + 제목 표시 행 */
  gap: 1px;
  background-color: #f8f9fa; /* 연한 회색 배경으로 최소한의 구분 */
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
`;

const Cell = styled.div`
  background-color: white; /* 기본 셀 배경을 완전히 흰색으로 설정 */
  padding: 0.75rem;
  text-align: center;
  border: 1px solid #ececec; /* 최소한의 구분을 위한 매우 연한 회색 테두리 */
  border-radius: 4px;
`;

const HeaderCell = styled(Cell)`
  background-color: #f1f1f1; /* 헤더 셀을 연한 회색으로 구분 */
  font-weight: bold;
`;

const TimeCell = styled(Cell)`
  background-color: #f1f1f1; /* 시간 셀도 연한 회색으로 구분 */
  font-weight: bold;
`;

const Timetable = ({ schedule }) => {
  const days = ['월', '화', '수', '목', '금', '토'];
  const periods = ['1교시', '2교시', '3교시', '4교시', '5교시', '6교시', '7교시', '8교시', '9교시', '10교시'];

  return (
    <TimetableWrapper>
      <HeaderCell></HeaderCell>
      {days.map(day => (
        <HeaderCell key={day}>{day}</HeaderCell>
      ))}

      {periods.map((period, periodIndex) => (
        <React.Fragment key={period}>
          <TimeCell>{period}</TimeCell>
          {days.map(day => (
            <Cell key={`${day}-${periodIndex}`}>
              {schedule[day] && schedule[day][periodIndex] ? schedule[day][periodIndex] : ''}
            </Cell>
          ))}
        </React.Fragment>
      ))}
    </TimetableWrapper>
  );
};

export default Timetable;