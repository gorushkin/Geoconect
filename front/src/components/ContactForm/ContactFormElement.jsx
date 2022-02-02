import cn from 'classnames';

const ContactFormElement = ({ form, params }) => {
  const { name, required, placeholder, type } = params;

  const error = form.formState.errors[name];

  const elementClassnames = cn('contact__input contact__from-element', {
    'contact__input--error': error,
  });

  const errorMessage = error?.message;
  const element = form.formState.errors[name]?.ref;

  const onErrorClickHanlder = () => {
    element.select();
    element.focus();
    form.clearErrors(name);
  };

  return (
    <div className="contact__form-element-wrapper">
      {errorMessage && (
        <p onClick={onErrorClickHanlder} className="contact__from-error">
          {errorMessage}
        </p>
      )}
      <input
        onClick={() => form.clearErrors(name)}
        className={elementClassnames}
        {...form.register(name, { ...required })}
        placeholder={placeholder}
        autoComplete="off"
        type={type}
      />
    </div>
  );
};

export default ContactFormElement;
