const Header = () => {
  return (
    <header className='header js__header'>
      <div className='wrapper'>
        <div className='header__inner'>
          <a className='header__logo'>
            <img src='logo.png' alt='Geoconect Logo' />
          </a>
          <nav className='header__nav js__menu'>
            <ul className='header__nav-list'>
              <li className='header__nav-item'>
                <a href='#works'>Виды работ</a>
              </li>
              <li className='header__nav-item'>
                <a href='#documents'>Сертификаты</a>
              </li>
              <li className='header__nav-item'>
                <a href='#news'>Новости</a>
              </li>
              <li className='header__nav-item'>
                <a href='#about'>О Компании</a>
              </li>
              <li className='header__nav-item'>
                <a href='#contact'>Контакты</a>
              </li>
            </ul>
          </nav>
          <div className='header__btn--wrapper'>
            <button className='header__btn header__btn--open js__btn'>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
