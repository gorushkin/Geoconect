import cn from 'classnames';
import { useForm } from 'react-hook-form';

import { createApplicationRequest } from '../../api';

const ContactFomElement = ({ clearErrors, register, placeholder, error }) => {
  const elementClassnames = cn('contact__input contact__from-element', {
    'contact__input--error': error,
  });

  const errorMessage = error?.message;

  return (
    <div className="contact__form-element-wrapper">
      <input
        onClick={() => clearErrors(register.name)}
        className={elementClassnames}
        {...register}
        placeholder={errorMessage || placeholder}
        autoComplete="off"
      />
    </div>
  );
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = async (values) => {
    const { data } = await createApplicationRequest(values);
    if (data) console.log(data);
  };

  return (
    <section id="contact" className="contact">
      <div className="wrapper">
        <div className="contact__inner">
          <div className="contact__text-wrapper">
            <h2 className="contact__title">Оставьте заявку на бесплатную консультацию</h2>
            <p className="contact__text">Мы перезвоним Вам в ближайшее время</p>
          </div>
          <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
            <ContactFomElement
              clearErrors={clearErrors}
              register={register('name', {
                required: { value: true, message: 'Укажите Ваше имя' },
              })}
              placeholder="Ваше имя"
              error={errors?.name}
            />
            <ContactFomElement
              clearErrors={clearErrors}
              register={register('phone', {
                required: {
                  value: true,
                  message: ' Введите номер телефона',
                },
                pattern: {
                  value: /[0-9]+/i,
                  message: 'Формат +79999999999',
                },
              })}
              placeholder="+7 (___) ___-__-__"
              type="tel"
              error={errors?.phone}
            />

            <button type="submit" className="contact__btn btn contact__from-element">
              Отправить заявку
            </button>
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
