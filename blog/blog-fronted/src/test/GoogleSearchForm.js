import React from 'react';
import styled from 'styled-components';
import { MdSaveAlt } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import Responsive from '../components/common/Responsive';

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0.2rem 0.3rem;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f1f3f4;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding-left: 0.3rem;
  margin: 0;
  border-radius: 2rem;
  outline: none;
  background-color: transparent;
   font-size: 1.1rem;
  &::placeholder {
    color: #757575;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const SearchButton = styled.button`
  
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 1rem;
  color: white;
  background-color: #4285f4;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }

  svg {
    font-size: 1.5rem;
  }

  span {
   min-width: 2rem;
  }
`;

const Space = styled.div`
   margin-right: 1rem;
`

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 1rem;
  color: white;
  background-color: #34a853;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2c8c43;
  }

  svg {
    font-size: 1.5rem;
  }
  span {
   min-width: 2rem;
  }
`;

const GoogleSearchForm = () => {
  return (
      <Responsive>
         <SearchForm action="https://www.google.com/search" method="get">
         <SearchInput 
         type="text" 
         name="q" 
         placeholder="Search Google" 
         required 
         />
         <ButtonGroup>
         <SearchButton type="submit">
            <FaSearch />
         </SearchButton>
         <Space></Space>
         <SaveButton type="button">
            <MdSaveAlt />
         </SaveButton>
         </ButtonGroup>
      </SearchForm>
      </Responsive>
    
  );
};

export default GoogleSearchForm;