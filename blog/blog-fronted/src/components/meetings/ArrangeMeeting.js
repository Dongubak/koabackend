import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const Wrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid #dee2e6; /* 연한 회색 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  background-color: #f8f9fa; /* 밝은 회색 배경 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #343a40; /* 어두운 회색 */
  margin-bottom: 1rem;
  text-align: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;

  input {
    width: 100%;
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
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem; /* 버튼 사이 간격 */
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff; /* 흰색 글자 */
  background-color: ${(props) => (props.cancel ? '#868e96' : '#007bff')}; /* 취소: 회색, 확인: 파란색 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.cancel ? '#adb5bd' : '#0056b3')}; /* 호버 시 색상 변경 */
    transform: translateY(-2px); /* 살짝 위로 이동 */
  }

  &:active {
    transform: translateY(0); /* 클릭 시 원래 위치로 복귀 */
  }
`;

const CustomButton = ({ content, callBack = () => {}, cancel = false }) => {
  return (
    <Button onClick={callBack} cancel={cancel}>
      {content}
    </Button>
  );
};

const ArrangeMeeting = ({ onGoBack, onCreate, onChange, groupName }) => {
  return (
    <Wrapper>
      <Title>미팅 이름 입력</Title>
      <InputWrapper>
        <input
          onChange={onChange}
          value={groupName}
          placeholder="미팅 이름을 입력하세요"
        />
      </InputWrapper>
      <ButtonWrapper>
        <CustomButton content="취소" callBack={onGoBack} cancel />
        <CustomButton content="확인" callBack={onCreate} />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ArrangeMeeting;