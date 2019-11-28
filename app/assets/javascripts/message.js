$(function(){
  function buildHTML(message){
    
    let image = message.image ? `<img class="lower-message__image" src="${message.image}">` : " " ;

    let html =
      `<div class="message" "data-message-id"="${message.id}">
        <div class="message__upper-info">
          <p class="message__upper-info__user-name">
            ${message.user_nickname}
          </p>
          <p class="message__upper-info__date">
            ${message.date}
          </p>
        </div>
        <p class="message__lower">
          <p class="message__lower__content">
            ${message.content}
          </p>
          ${image}
        </p>
      </div>`
    return html;
    }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
      timeout: 10000
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.form__submit').removeAttr("disabled");
    });
  })
});