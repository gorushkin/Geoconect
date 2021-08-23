"use strict";

var elements = {
  menu: document.querySelector('.js__menu'),
  btn: document.querySelector('.js__btn')
};
var state = {
  isMenuOpen: false
};

var render = function render() {
  var menuStyle = state.isMenuOpen ? 'block' : 'none';
  elements.menu.style.display = menuStyle;
  var btnStateClass = "header__btn js__btn header__btn--".concat(state.isMenuOpen ? 'close' : 'open');
  console.log('btnStateClass: ', btnStateClass); // elements.btn.setAttribute.class = btnStateClass;

  elements.btn.className = btnStateClass;
};

var toggleState = function toggleState() {
  state.isMenuOpen = !state.isMenuOpen;
  render();
};

elements.btn.addEventListener('click', toggleState);
//# sourceMappingURL=main.js.map
