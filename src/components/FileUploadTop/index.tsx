/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/function-component-definition */

import React, { useState } from 'react';
import style from './style.module.css';

const FileUploadTop = () => {
  const [selectedFilesTop, setSelectedFilesTop] = useState<
    { file: File; addedAt: Date }[]
  >([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const newFiles = files.map((file) => ({ file, addedAt: new Date() }));
    setSelectedFilesTop((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const newFiles = files.map((file) => ({ file, addedAt: new Date() }));
    setSelectedFilesTop((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveFileTop = (fileName: string) => {
    setSelectedFilesTop((prevFiles) =>
      prevFiles.filter((file) => file.file.name !== fileName),
    );
  };

  const renderFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      const objectURL = URL.createObjectURL(file);
      return (
        <img
          src={objectURL}
          alt={file.name}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      );
    }
    return null;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('ru-RU', options);
  };

  return (
    <div className={style.container}>
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
          id="fileInputTop"
          onChange={handleFileSelect}
        />
        <label
          className={style.label}
          htmlFor="fileInputTop"
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
      <div>
        {selectedFilesTop.length > 0 && (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {selectedFilesTop.map((item, index) => (
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
                {renderFilePreview(item.file)}
                <div>{item.file.name}</div>
                <div style={{ fontSize: '10px', color: '#8e8e8e' }}>
                  {formatDate(item.addedAt)}
                </div>
                <button
                  onClick={() => handleRemoveFileTop(item.file.name)}
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
    </div>
  );
};

export default FileUploadTop;
