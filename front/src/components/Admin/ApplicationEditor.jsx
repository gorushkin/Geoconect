import cn from 'classnames';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';

import { routes } from '../../api';
import { deleteNewsRequest } from '../../api';
import { showModalWindow } from '../../utils';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const NewsEditor = ({ onSubmit, data, edit = false }) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();

  const editorClassnames = cn('editor__wrapper form-control ', {
    'form-control is-invalid': errors.body,
  });

  useEffect(() => {
    if (data) {
      setValue('phone', data?.phone || '');
      setValue('email', data?.email || '');
      setValue('body', data?.body || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onBackBtnClick = () => {
    const changedData = getValues();
    const isDataEqual = _.isEqual(changedData, {
      body: data.body || '',
      email: data.email,
      phone: data.phone,
    });
    isDataEqual
      ? router.push(routes.APPLICATIONS)
      : showModalWindow({
        title: 'Подтвердите действие',
        body: 'Вы уверены, что хотите отменить все изменения?',
        onConfirm: () => router.push(routes.APPLICATIONS),
      });
  };

  const onRemoveBtnClick = (id) => {
    showModalWindow({
      title: 'Подтвердите действие',
      body: 'Вы уверены, что хотите удалить новость?',
      onConfirm: async () => {
        const result = await deleteNewsRequest(id);
        if (result) {
          router.push(routes.APPLICATIONS);
        }
      },
    });
  };

  const onSubmitHandler = async (values) => {
    const { data } = await onSubmit(values);
    if (data) router.push(routes.APPLICATIONS);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          isInvalid={errors.email}
          type="text"
          placeholder="Email"
          {...register('email', { required: true, minLength: 1 })}
        />
        <Form.Control.Feedback type="invalid">
          Необходимо ввести адрес электронной почты
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Телефон</Form.Label>
        <Form.Control
          isInvalid={errors.phone}
          type="text"
          placeholder="Телефон"
          {...register('phone', { required: true, minLength: 1 })}
        />
        <Form.Control.Feedback type="invalid">Необходимо ввести телефон</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Заметки</Form.Label>
        <Controller
          name="body"
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
      </Form.Group>
      <div>
        {edit && (
          <Button onClick={() => onRemoveBtnClick(data.id)} variant="warning" type="button">
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

export default NewsEditor;
