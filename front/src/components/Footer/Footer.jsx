const Footer = () => {
  return (
    <footer className='footer'>
      <div className='wrapper'>
        <div className='footer__inner'>
          <a className='footer__logo'>
            <img src='/logo.png' alt='Geoconect Footer Logo' />
          </a>
          <ul className='footer__link-list'>
            <li className='footer__link-item'>
              <a href=''>Политика конфиденциальности</a>
            </li>
            <li className='footer__link-item'>
              <a href=''>Соглашение на обработку персональных данных</a>
            </li>
          </ul>
          <ul className='footer__social-list'>
            <li className='footer__social-item'>
              <a href=''>
                <svg className='img'>
                  <use xlinkHref='/sprite.svg#icon__instagram'></use>
                </svg>
              </a>
            </li>
            <li className='footer__social-item'>
              <a href=''>
                <svg className='img'>
                  <use xlinkHref='/sprite.svg#icon__youtube'></use>
                </svg>
              </a>
            </li>
            <li className='footer__social-item'>
              <a href=''>
                <svg className='img'>
                  <use xlinkHref='/sprite.svg#icon__facebook'></use>
                </svg>
              </a>
            </li>
            <li className='footer__social-item'>
              <a href=''>
                <svg className='img'>
                  <use xlinkHref='/sprite.svg#icon__twitter'></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
