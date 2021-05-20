const slider = $('.products').bxSlider({
  pager:false,
  controls: false
});

$('.products_slider-arow--prev').click((e) =>{
  e.preventDefault();
  
  slider.goToPrevSlide();
});

$('.products_slider-arow--next').click((e) =>{
  e.preventDefault();
  
  slider.goToNextSlide();
});