const elements = {
  menu: document.querySelector('.js__menu'),
  btn: document.querySelector('.js__btn'),
  header: document.querySelector('.js__header'),
  body: document.body,
};

const state = {
  isMenuOpen: false,
};

const render = () => {
  const menuStyle = state.isMenuOpen ? 'block' : 'none';
  const headerClasse = `header js__header header--${state.isMenuOpen ? 'open' : 'closed'}`;
  const btnStateClass = `header__btn js__btn header__btn--${state.isMenuOpen ? 'close' : 'open'}`;

  elements.menu.style.display = menuStyle;
  elements.btn.className = btnStateClass;
  elements.header.className = headerClasse;
  elements.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
};

const toggleState = () => {
  state.isMenuOpen = !state.isMenuOpen;
  render();
};

elements.btn.addEventListener('click', toggleState);
