import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';

const Wrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #868e96;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #343a40;
    outline: none;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  background-color: #343a40;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  display: inline-block;
  text-align: center;
  line-height: 1.5;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
  min-width: 80px; /* 버튼의 최소 너비를 설정하여 텍스트가 줄바꿈되지 않도록 함 */

  &:hover {
    background-color: #868e96;
  }

  &:active {
    background-color: #868e96;
  }

  & + & {
    margin-left: 1rem;
  }
`;

const CourseForm = ({ keyword, onChange, onSearch, onSave }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Wrapper>
      <Input
        type='text'
        value={keyword}
        onChange={onChange}
        placeholder="검색어를 입력하세요..."
        onKeyPress={handleKeyPress}
      />
      <StyledButton onClick={onSearch}>검색</StyledButton>
      <StyledButton onClick={onSave}>저장</StyledButton>
    </Wrapper>
  );
};

export default CourseForm;