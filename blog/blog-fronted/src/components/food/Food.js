import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

// Wrapper styled component for classic centered layout
const Wrapper = styled(Responsive)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  font-family: 'Georgia', serif;
  color: #333;
`;

// Styled form for input and button alignment
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem; /* Add space between input and button */
`;

// Styled input box
const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 4px;
  width: 300px;
  font-size: 1rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

// Styled button for a retro look
const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #555;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Georgia', serif;
  text-transform: uppercase;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #444;
  }
`;

// Styled container for scrollable table
const TableContainer = styled.div`
  width: 80%;
  max-height: 400px; /* Set a fixed height for the table container */
  overflow-y: auto; /* Add vertical scroll if content overflows */
  margin-top: 1rem;
  border: 1px solid #ddd; /* Optional: Add border for better visibility */
  border-radius: 4px;
`;

// Styled table for displaying food data
const StyledTable = styled.table`
  width: 100%; /* Ensure table fills the container width */
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 0.5rem;
  background-color: #f4f4f4;
  text-align: left;
  position: sticky; /* Make the header sticky */
  top: 0;
  z-index: 1; /* Ensure header stays above table content */
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 0.5rem;
`;

const Food = ({ keyword, onChange, onSearch, data, loading }) => {
  // Prevent default form submission behavior and call onSearch
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Wrapper>
      <h2>오늘 뭐 먹지?</h2>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput 
          type="text" 
          placeholder="Search food..." 
          value={keyword} 
          onChange={onChange} 
          autoFocus // Auto focus added here
        />
        <StyledButton type="submit">Search</StyledButton>
      </StyledForm>
      {data.length > 0 && !loading && (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <StyledTh>Menu</StyledTh>
                <StyledTh>Restaurant</StyledTh>
                <StyledTh>Review</StyledTh>
                <StyledTh>Similar Word</StyledTh>
                <StyledTh>Similarity Score</StyledTh>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <StyledTd>{item.Menu}</StyledTd>
                  <StyledTd>{item.Restaurant}</StyledTd>
                  <StyledTd>{item.Review}</StyledTd>
                  <StyledTd>{item['Similar Word']}</StyledTd>
                  <StyledTd>{item['Similarity Score'].toFixed(2)}</StyledTd>
                </tr>
              ))}
              {
               loading ? <div>Loading</div> : null
              }
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </Wrapper>
  );
};

export default Food;
