export const params = {
  name: {
    required: { required: { value: true, message: 'Укажите Ваше имя' } },
    name: 'name',
    placeholder: 'Ваше имя',
    type: 'text',
  },
  phone: {
    name: 'phone',
    type: 'tel',
    placeholder: '+7 (___) ___-__-__',
    required: {
      required: {
        value: true,
        message: 'Введите номер телефона',
      },
      pattern: {
        value: /[0-9]+/i,
        message: 'Формат +79999999999',
      },
    },
  },
};
