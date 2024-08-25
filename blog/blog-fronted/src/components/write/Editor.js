import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css'; // 원하는 하이라이트 테마를 선택하세요
// import 'highlight.js/styles/default.css';
import styled, { css, keyframes } from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import DropDownComponent from './DropDownComponent';
import hljs from 'highlight.js';

// 모든 언어를 자동으로 감지하도록 설정

const toolbarOptions = [
  [{ header: '1' }, { header: '2' }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'code-block', 'link', 'image'],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ align: [] }],
];

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value, // 자동 감지를 사용하여 모든 언어에 대해 구문 강조를 수행합니다.
  },
  toolbar: toolbarOptions,
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'indent',
  'link', 'image', 'video', 'code-block'
];

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
`;

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 0.5rem;
  width: 100%;
  ${(props) =>
    props.invalid &&
    css`
      animation: ${shake} 0.3s ease;
    `}
`;

const QuillWrapper = styled.div`
.ql-snow .ql-editor pre.ql-syntax {
  /* background: #666A73; */
  /* background: #B0B183; */
  background: #23241f;
  font-weight: 600;

}
.ql-snow .ql-editor pre.ql-syntax {
  .hljs-comment {
    color: #5C6339;
  }

}
hljs-comment
  .ql-container.ql-snow {
    border: none;
  }
  .ql-editor {
    padding: 0px;
    padding-top: 1rem;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
    border: none;
    ${(props) =>
      props.invalid &&
      css`
        animation: ${shake} 0.3s ease;
      `}
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
  .ql-toolbar {
    border: none;
    left: 0px;
    box-shadow: 0 0px 1px rgba(0, 0, 0, 0.1);
  }
`;

const Editor = ({ title, body, subject, onChangeField, invalidField }) => {

  const handleQuillChange = (value) => {
    onChangeField({ key: 'body', value });
  };

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <EditorBlock>
      <DropDownComponent onChangeField={onChangeField} subject={subject} />
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
        invalid={invalidField.includes('title')}
      />
      <QuillWrapper invalid={invalidField.includes('body')}>
        <ReactQuill
          value={body}
          onChange={handleQuillChange}
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="내용을 작성하세요..."
        />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;