/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import style from './style.module.css';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveFile = (fileName: string) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName),
    );
  };

  return (
    <div className={style.container}>
      <div>
        {selectedFiles.length > 0 && (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                style={{
                  display: 'inline-block',
                  marginBottom: '10px',
                  marginRight: '8px',
                  backgroundColor: '#F4F6F8',
                  fontSize: '12px',
                  fontWeight: '400',
                  lineHeight: '14.4px',
                  color: '#3787EB',
                }}
              >
                <span>{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(file.name)}
                  type="button"
                  style={{
                    marginLeft: '10px',
                    color: '#ABBED1',
                    border: 'none',
                    padding: '5px',
                    cursor: 'pointer',
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
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
        />
      </div>
    </div>
  );
};

export default FileUpload;
