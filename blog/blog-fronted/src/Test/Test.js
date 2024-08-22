import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  position: relative;
  width: 150px; // Slightly wider for better spacing
  margin-bottom: 20px; // Adds some space below the dropdown
`;

const DropdownHeader = styled.div`
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px; // Rounded corners for a softer look
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  max-height: 180px;
  overflow-y: auto;
  z-index: 1000;
  transition: max-height 0.2s ease;
`;

const DropdownListItem = styled.li`
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Arrow = styled.span`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

const Dropdown = ({ options, selected, onSelectedChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelectedChange(option);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper>
      <DropdownHeader onClick={handleDropdownToggle}>
        {selected ? selected.label : '주제 선택'}
        <Arrow isOpen={isOpen}>▼</Arrow>
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownListItem
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

const Test = ({ onChangeField }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: '커뮤니티', value: 'community' },
    { label: '지식', value: 'knowledge' },
    { label: '질문', value: 'qna' },
    { label: '공지', value: 'announcement' },
  ];

  const handleSelectedChange = (option) => {
    setSelectedOption(option);
    onChangeField({ key: 'subject', value: option.value });
  };

  return (
    <div>
      <Dropdown
        options={options}
        selected={selectedOption}
        onSelectedChange={handleSelectedChange}
      />
    </div>
  );
};

export default Test;