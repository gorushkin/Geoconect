import cn from 'classnames';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Form, Row, Col, NavItem } from 'react-bootstrap';
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
    watch,
    getValues,
    formState: { errors },
    formState,
    setValue,
  } = useForm();
  const router = useRouter();

  const [imgPreview, setImagePreview] = useState();

  const editorClassnames = cn('editor__wrapper form-control ', {
    'form-control is-invalid': errors.body,
  });

  useEffect(() => {
    if (data) {
      setValue('title', data?.title || '');
      setValue('body', data?.body || '');
      setValue('file', null);
    }
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

  const onRemoveBtnClick = (id) => {
    showModalWindow({
      title: 'Подтвердите действие',
      body: 'Вы уверены, что хотите удалить новость?',
      onConfirm: async () => {
        const result = await deleteNewsRequest(id);
        if (result) {
          router.push(routes.NEWS);
        }
      },
    });
  };

  const onSubmitHandler = async (values) => {
    const file = getValues('file') ? getValues('file')[0] : null;
    const { data } = await onSubmit({ ...values, file });
    if (data) {
      router.push(routes.NEWS);
    }
  };

  const setImage = (data) => {
    if (data) {
      setImagePreview(`${routes.IMAGES}/${data.img_src}`);
    }
  };

  useEffect(() => {
    setImage(data);
  }, [data]);

  useEffect(() => {
    const subscription = watch((value) => {
      const preview =
        value.file && value.file.length > 0 ? URL.createObjectURL(value.file[0]) : null;
      if (preview) setImagePreview(preview);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onResetBtnClickHandler = () => {
    setValue('file', null);
    setImage(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
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
      <Row className="align-items-end mb-3">
        <Col>
          <Form.Group controlId="formFile">
            <Form.Label>Картинка</Form.Label>
            <Form.Control
              isInvalid={errors.file}
              type="file"
              name="file"
              accept=".png,.jpg"
              {...register('file', { required: edit ? false : true })}
            />
            <Form.Control.Feedback type="invalid">
              Необходимо выбрать картинку
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Button
            disabled={!watch('file')}
            onClick={onResetBtnClickHandler}
            variant="danger"
            type="button"
          >
            Reset image
          </Button>
        </Col>
      </Row>

      <Col>
        <img src={imgPreview} alt="" />
      </Col>
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
