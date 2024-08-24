import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
import styled, { css, keyframes } from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import DropDownComponent from './DropDownComponent';


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
  margin-bottom: 0.5rem; /* Adjusted for space between the input and error message */
  width: 100%;
  ${(props) =>
    props.invalid &&
    css`
      animation: ${shake} 0.3s ease;
    `}
`;


const QuillWrapper = styled.div`
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
    /* border-bottom: 1px solid ${palette.gray[4]}; */
  }
  
`;

const Editor = ({ title, body, subject, onChangeField, invalidField }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: '내용을 작성하세요...',
      modules: Editor.modules,
      formats: Editor.formats,
    });

    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <EditorBlock>
      <DropDownComponent onChangeField={onChangeField} subject={subject}/>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
        invalid={invalidField.includes('title')}
      />
      <QuillWrapper invalid={invalidField.includes('body')}>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block', 'link', 'image'],
  ],
  clipboard: {
    matchVisual: false,
  }
}

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'indent',
  'link', 'image', 'video', 'code-block'
];

export default Editor;