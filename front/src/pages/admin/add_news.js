import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button, Col, Row, InputGroup, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';

import 'react-markdown-editor-lite/lib/index.css';
// import Editor from 'rich-markdown-editor';
// import ReactMarkdown from "react-markdown";
import { createNews } from '../../api';
import Layout from '../../components/Admin/Layout';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const AddNews = () => {
  const [content, setContent] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = async ({ title, body }) => {
    try {
      const { data: news } = await createNews({ title, body });
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: После создания новости сделать вывод ее со стилями страницы

  const editorClassnames = cn('editor__wrapper form-control ', {
    'form-control is-invalid': errors.body,
  });

  const onResetBtnClick = () => {
    setValue('title', '');
    setValue('body', '');
  };

  return (
    <Layout closed>
      <Row>
        <Col>
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
                render={({ field: { onChange, onBlur, value, name, ref } }) => {
                  return (
                    <div className={editorClassnames}>
                      <MdEditor
                        style={{ height: '500px' }}
                        onChange={({ text }) => onChange(text)}
                        value={value}
                        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
                      />
                    </div>
                  );
                }}
              />
              <Form.Control.Feedback type="invalid">
                Необходимо ввести новость
              </Form.Control.Feedback>
            </Form.Group>
            <div>
              <Button className="mr-3" variant="primary" type="submit">
                Save
              </Button>{' '}
              <Button onClick={onResetBtnClick} variant="danger" type="button">
                Reset
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNews;
