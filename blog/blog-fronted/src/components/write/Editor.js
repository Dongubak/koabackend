import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // 기본적으로 'snow' 테마를 사용할 수 있게 CSS 파일을 가져옵니다.
import 'quill/dist/quill.bubble.css';
import styled, { css, keyframes } from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Test from '../../Test/Test';

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
    props.$invalid &&
    css`
      animation: ${shake} 0.3s ease;
    `}
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
    border: none;
    ${(props) =>
      props.$invalid &&
      css`
        animation: ${shake} 0.3s ease;
      `}
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
  
  .ql-toolbar {
    border: none; /* 툴바의 기본 스타일 제거 */
  }
`;

const Editor = ({ title, body, onChangeField, invalidField }) => {
  const [editorHtml, setEditorHtml] = useState('');
  const [theme, setTheme] = useState('snow');
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        theme: theme,
        placeholder: '내용을 작성하세요...',
        modules: Editor.modules,
        formats: Editor.formats,
      });

      const quill = quillInstance.current;
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          const html = quill.root.innerHTML;
          setEditorHtml(html);
          onChangeField({ key: 'body', value: html });
        }
      });
    }
  }, [theme, onChangeField]);

  useEffect(() => {
    if (quillInstance.current) {
      quillInstance.current.root.innerHTML = body;
    }
  }, [body]);

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <EditorBlock>
      <Test onChangeField={onChangeField} />
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
        $invalid={invalidField.includes('title')}
      />
      <QuillWrapper $invalid={invalidField.includes('body')}>
        <div ref={quillElement} />
      </QuillWrapper>
      <div className="themeSwitcher">
        <label>Theme </label>
        <select onChange={handleThemeChange}>
          <option value="snow">Snow</option>
          <option value="bubble">Bubble</option>
          <option value="core">Core</option>
        </select>
      </div>
    </EditorBlock>
  );
};

// Quill 모듈 및 포맷 설정
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default Editor;

// import React, { useRef, useEffect } from 'react';
// import Quill from 'quill';
// import 'quill/dist/quill.bubble.css';
// import styled, { css, keyframes } from 'styled-components';
// import palette from '../../lib/styles/palette';
// import Responsive from '../common/Responsive';
// import Test from '../../Test/Test';

// const shake = keyframes`
//   0%, 100% {
//     transform: translateX(0);
//   }
//   25% {
//     transform: translateX(-5px);
//   }
//   75% {
//     transform: translateX(5px);
//   }
// `;

// const EditorBlock = styled(Responsive)`
//   padding-top: 5rem;
//   padding-bottom: 5rem;
// `;

// const TitleInput = styled.input`
//   font-size: 3rem;
//   outline: none;
//   padding-bottom: 0.5rem;
//   border: none;
//   border-bottom: 1px solid ${palette.gray[4]};
//   margin-bottom: 0.5rem; /* Adjusted for space between the input and error message */
//   width: 100%;
//   ${(props) =>
//     props.invalid &&
//     css`
//       animation: ${shake} 0.3s ease;
//     `}
// `;


// const QuillWrapper = styled.div`
//   .ql-editor {
//     padding: 0;
//     min-height: 320px;
//     font-size: 1.125rem;
//     line-height: 1.5;
//     border: none;
//     ${(props) =>
//       props.invalid &&
//       css`
//         animation: ${shake} 0.3s ease;
//       `}
//   }
//   .ql-editor.ql-blank::before {
//     left: 0px;
//   }
// `;

// const Editor = ({ title, body, onChangeField, invalidField }) => {
//   const quillElement = useRef(null);
//   const quillInstance = useRef(null);

//   useEffect(() => {
//     quillInstance.current = new Quill(quillElement.current, {
//       theme: 'bubble',
//       placeholder: '내용을 작성하세요...',
//       modules: {
//         toolbar: [
//           [{ header: '1' }, { header: '2' }],
//           ['bold', 'italic', 'underline', 'strike'],
//           [{ list: 'ordered' }, { list: 'bullet' }],
//           ['blockquote', 'code-block', 'link', 'image'],
//         ],
//       },
//     });

//     const quill = quillInstance.current;
//     quill.on('text-change', (delta, oldDelta, source) => {
//       if (source === 'user') {
//         onChangeField({ key: 'body', value: quill.root.innerHTML });
//       }
//     });
//   }, [onChangeField]);

//   const mounted = useRef(false);
//   useEffect(() => {
//     if (mounted.current) return;
//     mounted.current = true;
//     quillInstance.current.root.innerHTML = body;
//   }, [body]);

//   const onChangeTitle = (e) => {
//     onChangeField({ key: 'title', value: e.target.value });
//   };

//   return (
//     <EditorBlock>
//       <Test onChangeField={onChangeField} />
//       <TitleInput
//         placeholder="제목을 입력하세요"
//         onChange={onChangeTitle}
//         value={title}
//         invalid={invalidField.includes('title')}
//       />
//       <QuillWrapper invalid={invalidField.includes('body')}>
//         <div ref={quillElement} />
//       </QuillWrapper>
//     </EditorBlock>
//   );
// };

// export default Editor;