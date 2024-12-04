/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Импорт стилей для Quill
import style from './style.module.css';

// Динамическая загрузка компонента только на клиенте
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, // Отключаем серверный рендеринг для этого компонента
});

// eslint-disable-next-line react/function-component-definition
const TextEditor = () => {
  const [editorValue, setEditorValue] = useState('');
  const [editor, setEditor] = useState(null);

  const handleEditorChange = (value: React.SetStateAction<string>) => {
    setEditorValue(value);
  };

  const handleEditorReady = (editorInstance: React.SetStateAction<null>) => {
    setEditor(editorInstance);
  };

  return (
    <div className={style.container} style={{ width: '100%', minHeight: '228px', margin: '0 auto', backgroundColor: '#F4F6F8' }}>
      <ReactQuill
        value={editorValue}
        onChange={handleEditorChange}
        theme="snow" // Стиль редактора
        onReady={handleEditorReady} // Получаем ссылку на экземпляр редактора
        style={{ border: 'none', outline: 'none', minHeight: '116px' }}
        modules={{
          toolbar : [
           
            [{ 'bold': true }, { 'italic': true }],
             ['undo', 'redo'], // Добавляем кнопки для undo/redo в toolbar
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ],
        }}
        formats={['bold', 'italic', 'list', 'ordered', 'bullet', 'blockquote']}  
      />
    </div>
  );
};

export default TextEditor;
