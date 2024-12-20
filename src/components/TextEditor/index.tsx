/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

import style from './style.module.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TextEditor: React.FC = () => {
  const [editorValue, setEditorValue] = useState('');

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };

  return (
    <div className={style.container}>
      <ReactQuill
        value={editorValue}
        onChange={handleEditorChange}
        theme="snow"
        // onReady={handleEditorReady}
        modules={{
          toolbar: [
            [{ bold: true }, { italic: true }],
            ['undo', 'redo'],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        }}
        formats={['bold', 'italic', 'list', 'ordered', 'bullet', 'blockquote']}
      />
    </div>
  );
};

export default TextEditor;
