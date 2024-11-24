import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

// Wrapper 스타일
const Wrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid #dee2e6; /* 연한 회색 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  background-color: #f8f9fa; /* 밝은 회색 배경 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
`;

// 제목 스타일
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #343a40; /* 어두운 회색 */
  margin-bottom: 1.5rem;
`;

// Form 스타일
const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
`;

// Input 스타일
const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ced4da; /* 연한 회색 테두리 */
  border-radius: 4px; /* 둥근 모서리 */
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1); /* 내부 그림자 */
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #495057; /* 포커스 시 더 진한 테두리 */
    outline: none;
  }
`;

// Button 스타일
const Button = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff; /* 파란색 배경 */
  border: none;
  border-radius: 4px; /* 둥근 모서리 */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3; /* 더 진한 파란색 */
    transform: translateY(-2px); /* 살짝 위로 올라감 */
  }

  &:active {
    transform: translateY(0); /* 클릭 시 원래 위치로 복귀 */
  }
`;

const ArrangeMeetingInputForm = ({ keyword, onChange = () => {}, onSubmit = () => {} }) => {
  return (
    <Wrapper>
      <Title>사용자 검색</Title>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="사용자 이름을 입력하세요"
          onChange={onChange}
          value={keyword}
        />
        <Button type="submit">검색</Button>
      </Form>
    </Wrapper>
  );
};

export default ArrangeMeetingInputForm;