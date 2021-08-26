"use strict";

var elements = {
  menu: document.querySelector('.js__menu'),
  btn: document.querySelector('.js__btn'),
  header: document.querySelector('.js__header'),
  body: document.body
};
var state = {
  isMenuOpen: false
};

var render = function render() {
  var menuStyle = state.isMenuOpen ? 'block' : 'none';
  var headerClasse = "header js__header header--".concat(state.isMenuOpen ? 'open' : 'closed');
  var btnStateClass = "header__btn js__btn header__btn--".concat(state.isMenuOpen ? 'close' : 'open');
  elements.menu.style.display = menuStyle;
  elements.btn.className = btnStateClass;
  elements.header.className = headerClasse;
  elements.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
};

var toggleState = function toggleState() {
  state.isMenuOpen = !state.isMenuOpen;
  render();
};

elements.btn.addEventListener('click', toggleState);
//# sourceMappingURL=main.js.map
