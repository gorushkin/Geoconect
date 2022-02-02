import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createApplicationRequest } from '../../api';

import ContactFormElement from './ContactFormElement';
import { params } from './helpers';

const ContactForm = () => {
  const [showSubmitInfo, setShowSubmitInfo] = useState(false);

  const form = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const onSubmit = async (values) => {
    const { data } = await createApplicationRequest(values);
    if (data) {
      setShowSubmitInfo(true);
      setTimeout(() => {
        setShowSubmitInfo(false);
      }, 3000);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="wrapper">
        <div className="contact__inner">
          <div className="contact__text-wrapper">
            <h2 className="contact__title">Оставьте заявку на бесплатную консультацию</h2>
            <p className="contact__text">Мы перезвоним Вам в ближайшее время</p>
          </div>
          <form className="contact__form" onSubmit={form.handleSubmit(onSubmit)}>
            <ContactFormElement form={form} params={params.name} />
            <ContactFormElement form={form} params={params.phone} />
            {showSubmitInfo ? (
              <button
                disabled
                className="contact__btn contact__btn--ready btn btn--trans contact__from-element"
              >
                Готово
              </button>
            ) : (
              <button type="submit" className="contact__btn btn contact__from-element">
                Отправить заявку
              </button>
            )}
            <p className="contact__warning">
              Нажимая кнопку Вы даете согласие на <a href="">обработку персональных данных</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
