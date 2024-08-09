import React from 'react';
import Responsive from '../components/common/Responsive';
// import EditorContainer from '../containers/write/EditorContainer';
// import TagBoxContainer from '../containers/write/TagBoxContainer';
// import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import WriteActionButtons from '../components/write/WriteActionButtons';
import EditorContainer from '../containers/write/EditorContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer></EditorContainer>
      {/* <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer /> */}
      <WriteActionButtonsContainer></WriteActionButtonsContainer>
    </Responsive>
  );
};

export default WritePage;