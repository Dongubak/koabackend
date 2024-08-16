import React, { useState } from 'react';
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
  white-space: nowrap;
  min-width: 80px;

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

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const ToggleLabel = styled.label`
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  background-color: ${props => (props.isActive ? '#343a40' : '#ccc')};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ToggleThumb = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  background-color: white;
  border-radius: 50%;
  top: 1px;
  left: ${props => (props.isActive ? '26px' : '2px')};
  transition: left 0.3s ease;
`;

const CourseForm = ({ keyword, onChange, onSearch, 
  onSave, setSearchByCourse, searchByCourse,
  handleToggle, handleKeyPress
}) => {
  

  return (
    <Wrapper>
      <ToggleWrapper>
        <ToggleLabel>{searchByCourse ? '강의명' : '교수명'}</ToggleLabel>
        <ToggleSwitch isActive={searchByCourse} onClick={handleToggle}>
          <ToggleThumb isActive={searchByCourse} />
        </ToggleSwitch>
      </ToggleWrapper>
      <Input
        type='text'
        value={keyword}
        onChange={onChange}
        placeholder={searchByCourse ? "강의명을 입력하시오..." : "교수명을 입력하시오..."}
        onKeyPress={handleKeyPress}
      />
      <StyledButton onClick={onSearch}>검색</StyledButton>
      <StyledButton onClick={onSave}>저장</StyledButton>
    </Wrapper>
  );
};

export default CourseForm;