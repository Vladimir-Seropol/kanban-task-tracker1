/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import style from './style.module.css';
import Button from '../Button';
import Link from 'next/link';
import FileUpload from '../FileUpload';
import TextEditor from '../TextEditor';
import SelectInput from '../Inputs/SelectInput/SelectInput';
import { UserType } from '@/types/UserType';
import TextInput from '../Inputs/TextInput/TextInput';
import CustomDatePicker from '../Inputs/DatePicker/CustomDatePicker';
import FileUploadTop from '../FileUploadTop';
import Image from 'next/image'; // Необходим импорт для компонента Image

interface AddTaskВetailedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { title: string; executor: string }) => void;
  task: {
    id: number;
    title: string;
    executor: string;
    priority?: number;
    task_type?: number;
    component?: number;
    stage: string;
  };
}

const AddTaskВetailedModal: React.FC<AddTaskВetailedModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
}) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [executor, setExecutor] = useState(task.executor);

  const handleSave = () => {
    if (taskTitle && executor) {
      onSave({ title: taskTitle, executor });
      onClose(); // Закрытие модального окна
    } else {
      alert('Заполните все поля');
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null; // Если окно не открыто, ничего не рендерим

  return (
    <div className={style.modal} onClick={handleOutsideClick}>
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal_left}>
          <div className={style.modal_title}>
            <h3>{task.title}</h3>
            <button type="button">
              <Image
                src="/CopyLinkButton.png"
                alt="Copy link button"
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className={style.modal_item}>
            <div className={style.modal_link}>
              <Link href={`https://task.demo.ru/task-${task.id}`}>
                <span>https://task.demo.ru/task-{task.id}</span>
              </Link>
            </div>
            <div className={style.modal_link}>
              Необходимо сверстать проект согласно макетам
              <Link href="https://www.figma.com/file/demoId">
                <span>https://www.figma.com/file/demoId</span>
              </Link>
            </div>
            <div className={style.modal_link}>
              Главная согласована, можно продолжать
              <Link href="https://tilda.cc/page/?pageid=1111111111111111">
                <span>https://tilda.cc/page/?pageid=1111111111111111</span>
              </Link>
            </div>
          </div>

          <div className={style.modal_file_upload}>
            <FileUploadTop />
          </div>

          <div className={style.modal_text_editor}>
            <h4>Комментарии</h4>
            <TextEditor />
          </div>

          <div className={style.modal_file_upload}>
            <FileUpload />
          </div>

          <div className={style.modalActions}>
            <Button
              text="Отправить"
              type="button"
              onClick={handleSave}
              inlineStyle={{ width: '130px', height: '48px' }}
            />
          </div>
          <div className={style.modal_comments}>
            {'messegs'}
            <div className={style.modal_comments_buttons}>
              <button type="button">
                <Image
                  src="/task-icons.png"
                  alt="Button copy"
                  width={24}
                  height={24}
                />
              </button>
              <div className={style.modal_comments_buttons_more}>
                <button type="button">
                  <Image
                    src="/Edit_icon.png"
                    alt="Button edit"
                    width={24}
                    height={24}
                  />
                </button>
                <button type="button">
                  <Image
                    src="/Delete.png"
                    alt="Button delete"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={style.modal_right}>
          <div className={style.board__right}>
            <div className={style.board__right_actions}>
              <div>id: {task.id}</div>
              <div className={style.board__right_actions_buttons}>
                <button type="button">
                  <Image
                    src="/Task_actions.png"
                    alt="Button task actions "
                    width={24}
                    height={24}
                  />
                </button>
                <div className={style.board__right_actions_buttons_more}>
                  <button type="button">
                    <Image
                      src="/Delete1.png"
                      alt="Button delete"
                      width={24}
                      height={24}
                    />
                  </button>
                  <button type="button">
                    <Image
                      src="/Copy.png"
                      alt="Button copy"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            </div>

            <SelectInput
              label={''}
              placeholder="Новая"
              data={[]}
              value={[]}
              onChange={() => {}}
            />
            <div>Приоритет: {task.priority ? task.priority : 'Не указан'}</div>
            <div className={style.board__right_rating}>
              <TextInput
                label={''}
                value={''}
                placeholder={'Оценка'}
                onChange={() => {}}
              />
              <Image src="/SidebarIcon.png" alt="" width={24} height={24} />
            </div>

            <div className={style.board__right_date}>
              <CustomDatePicker
                placeholder="Дата создания"
                // value={''}
                onChange={() => {}}
                className={style.my_custom_class}
                inputClassName={style.my_input_class}
              />
              <CustomDatePicker
                placeholder="Дата начала"
                // value={''}
                onChange={() => {}}
                className={style.my_custom_class}
                inputClassName={style.my_input_class}
              />
            </div>
            <div>Исполнитель: {task.executor}</div>
            <div>Постановщик: {task.executor}</div>
            <TextInput
              label=""
              placeholder="Эпик"
              value={'inputValue'}
              onChange={() => {}}
            />
            <div className={style.modal_comments}>{'messegs'}</div>
            <div className={style.modal_link_down}>
              <div className={style.modal_text_input}>
                <TextInput
                  label="Layout link"
                  placeholder="Layout link"
                  value={'inputValue'}
                  onChange={() => {}}
                />
                <button type="button">
                  <Image
                    src="/Counter.png"
                    alt="Follow the link"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div className={style.modal_text_input}>
                <TextInput
                  label="Dev Link"
                  placeholder="Dev Link"
                  value={'inputValue'}
                  onChange={() => {}}
                />
                <button type="button">
                  <Image
                    src="/Counter.png"
                    alt="Follow the link"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={style.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <Image src="/close_button.png" alt="" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default AddTaskВetailedModal;
