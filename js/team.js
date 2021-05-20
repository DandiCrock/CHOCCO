 const openItem = (item)  => {
    const container = item.closest('.team__item'); //нашел блок обертку чтобы найти внутри лежащую разметку
    const contentBlock = container.find('.team__content');//нашел блок лежащий внутри блока обертки .find  ищет в глубь
    const textBlock = contentBlock.find('.team__content-block');//нашли блок с которого будем брать высоту
    const reqHeight = textBlock.height(); //нашли высоту .team__content-block 
  
    container.addClass('active'); //при открытии добавляем класс
    contentBlock.height(reqHeight);// team__content приенили высоту team__content-block
  }

  const closeEveryItem = (container) => {             
    const items = container.find('.team__content');
    const itemContainer = container.find('.team__item');

    itemContainer.removeClass('active');
    items.height(0);
  }
  

  $('.team__title').click((e) => {        //нашли кнопку, повесили обработчик событий клик
    const $this = $(e.currentTarget);     // сделали чтобы конкретная кнопка кликалась
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.team__item');
    
    if (elemContainer.hasClass('active')) {   //если элемент открыт
      closeEveryItem(container);
    } else {                                  //если закрыт
      closeEveryItem(container);
      openItem($this); 
    }
  });


