import cn from 'classnames';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';

import { routes } from '../../api';
import { showModalWindow } from '../../utils';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const Editor = ({ onSubmit, data = { body: '', title: '' }, edit = false }) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();

  // TODO: После создания новости сделать вывод ее со стилями страницы

  const editorClassnames = cn('editor__wrapper form-control ', {
    'form-control is-invalid': errors.body,
  });

  useEffect(() => {
    setValue('title', data?.title || '');
    setValue('body', data?.body || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onBackBtnClick = () => {
    const changedData = getValues();
    const isDataEqual = _.isEqual(changedData, { body: data.body, title: data.title });
    isDataEqual
      ? router.push(routes.NEWS)
      : showModalWindow({
        title: 'Подтвердите действие',
        body: 'Вы уверены, что хотите отменить все изменения?',
        onConfirm: () => router.push(routes.NEWS),
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Название новости</Form.Label>
        <Form.Control
          isInvalid={errors.title}
          type="text"
          placeholder="Название новости"
          {...register('title', { required: true, minLength: 1 })}
        />
        <Form.Control.Feedback type="invalid">
          Необходимо ввести название новости
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Текст новости</Form.Label>
        <Controller
          name="body"
          rules={{ required: true }}
          control={control}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <div className={editorClassnames}>
              <MdEditor
                style={{ height: '500px' }}
                onChange={({ text }) => onChange(text)}
                value={value}
                renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
              />
            </div>
          )}
        />
        <Form.Control.Feedback type="invalid">Необходимо ввести новость</Form.Control.Feedback>
      </Form.Group>
      <div>
        {edit && (
          <Button onClick={onBackBtnClick} variant="warning" type="button">
            Remove
          </Button>
        )}{' '}
        <Button className="mr-3" variant="success" type="submit">
          Save
        </Button>{' '}
        <Button onClick={onBackBtnClick} variant="danger" type="button">
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default Editor;
