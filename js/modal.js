$('.form').submit(e => { 
  e.preventDefault();

  const form =$(e.currentTarget);               //выражаем  input name="" в переменные, чтобы мы могли к ним обращаться
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");  
  
  //проводим цикл по имени, телефону, коменту и убираем input-error,если содержание пусрое val() или пробелы trim(), то вешаем эрор
  [name,phone, comment, to].forEach(field => { 
    field.removeClass("input-error");
    if (field.val().trim() == ""){
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");  // в текущем элементе найди ".input-error
  const modal = $('#modal');
  const modalContent = modal.find('.modal__content');

  modal.removeClass('modal__error'); //каждый раз убираем ошибку с .modal (color: red)
  
  if (errorFields.hasClass("input-error")){ // если есть эрор, то не отправляем запрос 
    e.preventDefault();
  }  else {     //  если эрора нет, то выполняем форму запрос
    $.ajax({
      url: 'https://webdev-api.loftschool.com/sendmail',
      method: 'post',
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
      success: data => {
        modalContent.text(data.message);
        console.log(data);
        $.fancybox.open({  // открываем модальное окно с помощью фенсибокс
          src: '#modal',
          type: 'inline'
        });
      },
      error:data => {
        const message = data.responseJSON.message;
        modalContent.text(message);
        modal.addClass('modal__error');
        $.fancybox.open({  // открываем модальное окно с помощью фенсибокс
          src: '#modal',
          type: 'inline'
        });
      }
    });
  }
});

$('.app-close-modal').click(e => { // кик по крестику в модалке - закрыть модалку
  e.preventDefault();

  $.fancybox.close();
});