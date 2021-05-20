const sections = $('section');
const display  = $('.maincontent');
const fixedMenuList = $('.fixed__menu_list');
const fixedMenuItems = fixedMenuList.find(".fixed__menu_item");
let inScroll = false; // скролится ли экран

const mobileDetect = new MobileDetect(window.navigator.userAgent); //https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.5/mobile-detect.min.js добавили чтобы определять с какого устройсва произошел вход
const isMobile = mobileDetect.mobile();

sections.first().addClass('active'); // по умолчанию на парвую секцию добавили active

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;// на сколько скролить
   
  if (isNaN(position)) {
    console.error('передано не верное значение в countSectionPosition');
    return 0;
  }
  return position;
} 

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq); 
  const menuTheme = currentSection.attr("data-fixMen");
  const activeClass = "shadowed";
  
   if (menuTheme == "shadowed") {  //  условие для  смены цвета fixed menu по data атрибуту в html
     fixedMenuList.addClass(activeClass);
   } else {
     fixedMenuList.removeClass(activeClass);
   }
};

const scrollSection = sectionEq => {
    if (inScroll) return;    

    inScroll = true;   // без смены inscroll скрол не будет происходить 

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(sections, sectionEq, 'active');
    
    setTimeout(() =>  // устанавливается таймер, чтобы нельзя было скролить пока секция не перейдет на следующую
    {inScroll = false;
      resetActiveClassForItem(fixedMenuItems, sectionEq, 'active');           // у конктерного fixed__menu_item добавляем активный класс, у соседей убираем

    },700); // количество милисекунд, через которое можно сделать скрол (.maincontent transition .4s + инерция .3s)
  
  
};

const viewportScroller = () => {               // от активного section можно скролить вверх и вниз
  const activeSection = sections.filter('.active')
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length){ 
        scrollSection(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length){
        scrollSection(prevSection.index());
      }
    }
  }
}
  
$(window).on('wheel', e => {             // как окно понимает скролить вверх или вниз
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if(deltaY > 0) {
    scroller.next();
  }

  if(deltaY < 0) {
    scroller.prev();
  }
});

$(window).on('keydown', (e) => {            // перемещение по клавишам
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == "input" || tagName == 'textarea';// если курсор находится в инпуте, то стрелки не скролят 
  const scroller = viewportScroller();

  if(userTypingInInputs) return;

    switch (e.keyCode) {
      case 38:
        scroller.prev();
        break;
      
      case 40:
        scroller.next();
        break;
    }
});

$('.wrapper').on('touchmove', e => e.preventDefault()); //убираем touchmove, чтобы safari  не дергался

$("[data-scroll-to]").click(e => {  // навигация heder  при нажатии на ссылку скролит к привязанной секции
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  scrollSection(reqSection.index());
})

if (isMobile) {
  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  $("body").swipe({
    swipe: function(
      event,
      direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";
      
      if (direction == "up") scrollDirection = 'next'
      if (direction == "down") scrollDirection = 'prev'
      
      scroller[scrollDirection]();  
    },
  });
}