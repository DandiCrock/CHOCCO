const hamburger = document.querySelector('#openFullscreenMenu');
const fullMenu = $('#fullscreenMenu');
const fullMenuClose = document.querySelector('#fullscreenMenuClose');
const menuVert = document.querySelector('#menuVertical');
const menuLink = fullMenu.find(".fulscreen-menu__link");


hamburger.addEventListener('click', e => { //по нажатию на гамбургер открывается фулскрин меню
  e.preventDefault();
  $(fullMenu).css('display', 'flex');
})

$(fullMenu).click( e => {               //по клику вне списка закрыть

  $(fullMenu).css('display','none');

})
