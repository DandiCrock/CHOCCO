const hamburger = document.querySelector('#openFullscreenMenu');
const fullMenu = document.querySelector('#fullscreenMenu');
const fullMenuClose = document.querySelector('#fullscreenMenuClose');
const menuVert = document.querySelector('#menuVertical');


hamburger.addEventListener('click', e => {
  e.preventDefault();
  fullMenu.style.display = 'flex';
})

fullMenu.addEventListener('click', e => {
  if (e.target.classList.contains("fulscreen-menu")) {
    fullMenu.style.display = 'none';
  }
  
  if (e.target == fullMenuClose) {
    e.preventDefault();
    fullMenu.style.display = 'none';
  }

})
