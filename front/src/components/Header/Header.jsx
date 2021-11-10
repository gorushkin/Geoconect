import cn from 'classnames';
import { useEffect, useState } from 'react';

import { headerList } from '../../constants';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const clickHandler = () => setIsMenuOpen(!isMenuOpen);

  const onClick = () => setIsMenuOpen(false);

  const menuButtonClassNames = cn('header__btn', {
    'header__btn--close': isMenuOpen,
    'header__btn--open': !isMenuOpen,
  });

  const menuClassNames = cn('header__nav', {
    'header__nav--hide': !isMenuOpen,
    'header__nav--show': isMenuOpen,
  });

  const headerClassNames = cn('header', {
    'header--close': !isMenuOpen,
    'header--open': isMenuOpen,
  });

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  return (
    <header className={headerClassNames}>
      <div className="wrapper">
        <div className="header__inner">
          <a className="header__logo">
            <img src="logo.png" alt="Geoconect Logo" />
          </a>
          <nav className={menuClassNames}>
            <ul className="header__nav-list">
              {headerList.map(({ href, name }, index) => (
                <li onClick={onClick} key={index} className="header__nav-item">
                  <a href={href}>{name}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__btn--wrapper">
            <button onClick={clickHandler} className={menuButtonClassNames}>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
