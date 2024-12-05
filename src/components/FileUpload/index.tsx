/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import style from './style.module.css';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Обработка выбора файлов через стандартное поле input
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Обработка перетаскивания файлов
  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Отмена стандартного поведения при перетаскивании в область
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Удаление файла из списка
  const handleRemoveFile = (fileName) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName),
    );
  };

  return (
    <div
      style={{
        border: '2px dashed #aaa',
        padding: '13px',
        width: '100%',
        height: '64px',
        textAlign: 'center',
        position: 'relative',
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        multiple
        style={{ display: 'none' }}
        id="fileInput"
        onChange={handleFileSelect}
      />
      <label
        className={style.label}
        htmlFor="fileInput"
        style={{
          display: 'inline-block',
          color: '#ABBED1',
          padding: '10px 20px',
          cursor: 'pointer',
          marginBottom: '10px',
        }}
      >
        выбери файлы или перетащи их сюда
      </label>
      <div
        style={{
          marginTop: '20px',
          fontSize: '14px',
          color: '#ABBED1',
        }}
      ></div>

      <div style={{ marginTop: '20px' }}>
        {selectedFiles.length > 0 && (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {selectedFiles.map((file, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <span>{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(file.name)}
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    padding: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
