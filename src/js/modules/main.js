const elements = {
  menu: document.querySelector('.js__menu'),
  btn: document.querySelector('.js__btn'),
};

const state = {
  isMenuOpen: false,
};

const render = () => {
  const menuStyle = state.isMenuOpen ? 'block' : 'none';
  elements.menu.style.display = menuStyle;
  const btnStateClass = `header__btn js__btn header__btn--${state.isMenuOpen ? 'close' : 'open'}`;
  console.log('btnStateClass: ', btnStateClass);
  // elements.btn.setAttribute.class = btnStateClass;
  elements.btn.className = btnStateClass;
};

const toggleState = () => {
  state.isMenuOpen = !state.isMenuOpen;
  render();
};

elements.btn.addEventListener('click', toggleState);
