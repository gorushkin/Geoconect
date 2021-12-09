import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    console.log('data: ', data);
    console.log('onSubmit');
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
            <div className="contact__form-element-wrapper">
              {errors?.name?.message && (
                <p className="contact__from-error">{errors?.name?.message}</p>
              )}
              <input
                onClick={() => clearErrors(['name'])}
                {...register('name', { required: { value: true, message: 'Укажите Ваше имя' } })}
                type="text"
                className="contact__input contact__from-element"
                placeholder="Ваше имя"
              />
            </div>
            <div className="contact__form-element-wrapper">
              {errors?.phone?.message && (
                <p className="contact__from-error">{errors?.phone?.message}</p>
              )}
              <input
                onClick={() => clearErrors(['phone'])}
                {...register('phone', {
                  required: {
                    value: true,
                    message: ' Введите номер телефона',
                  },
                  // maxLength: {
                  //   value: 12,
                  //   message: 'Номер слишком длинный',
                  // },
                  pattern: {
                    value: /[0-9]+/i,
                    message: 'Формат +79999999999',
                  },
                })}
                type="tel"
                className="contact__input contact__from-element"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
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
