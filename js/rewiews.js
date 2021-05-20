/* const findBlockByAlias = (alias) => {
  return $('.rewiews__display').filter((ndx, item) => {
    return $(item).attr('data-link') == alias;
  });
};

$('.interactive-avatar__link').click((e) => { //1когда кликается аватар
  e.preventDefault();

  const $this = $(e.currentTarget); 
  const target= $this.attr('data-open');
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest('.rewiews__switcher-item');

  itemToShow.addClass('active').siblings().removeClass('active');
  curItem.addClass('active').siblings().removeClass('active');

}); */

const findBlockByData = (data) =>{
  return $('.rewiews__display').filter((ndx, item) =>{
    return $(item).attr('data-link') == data;
  });
};

$('.interactive-avatar__link').click((e) => {// по клику на аватар
 e.preventDefault();

  const $this = $(e.currentTarget);   // находим элемент на который кликнули
  const target = $this.attr('data-open')
  const itemToShow = findBlockByData(target);
  const curItem = $this.closest('.rewiews__switcher-item');  //когда кликаем на аватар, находим родителя 
 

  itemToShow.addClass('active').siblings().removeClass('active'); 
  curItem.addClass('active').siblings().removeClass('active'); //родителю аватара даём класс, а у других удаляем
 console.log($this);
});

