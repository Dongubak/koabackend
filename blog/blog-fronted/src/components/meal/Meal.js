import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const Wrapper = styled(Responsive)`
  padding: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
  background-color: #f5f5f5;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Meal = ({ data, loading }) => {
  if (loading) {
    return <Wrapper>Loading...</Wrapper>;
  }

  if (!data || !data.menu) {
    return <Wrapper>No data available</Wrapper>;
  }

  const { menu, day, time } = data;

  return (
    <Wrapper>
      <Title>{day}요일 식단표</Title>
      <Table>
        <thead>
          <tr>
            <Th>식사</Th>
            <Th>메뉴</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>아침</Td>
            <Td>{menu.아침.join(', ')}</Td>
          </tr>
          <tr>
            <Td>점심</Td>
            <Td>{menu.점심.join(', ')}</Td>
          </tr>
          <tr>
            <Td>저녁</Td>
            <Td>{menu.저녁.join(', ')}</Td>
          </tr>
        </tbody>
      </Table>
      <Title>운영시간</Title>
      <Table>
        <thead>
          <tr>
            <Th>구분</Th>
            <Th>시간</Th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(time).map(([type, schedules]) => (
            Object.entries(schedules).map(([key, value]) => (
              <tr key={`${type}-${key}`}>
                <Td>{`${type} (${key})`}</Td>
                <Td>{value}</Td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Meal;