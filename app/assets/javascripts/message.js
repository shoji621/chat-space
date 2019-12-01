$(function(){

  function buildHTML(message){
    let image = message.image ? `<img class="lower-message__image" src="${message.image}">` : " " ;
    let html =
      `<div class="message" data-message-id ="${message.id}">
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
      alert('非同期通信に失敗しました');
    })
    .always(function() {
      $('.form__submit').removeAttr("disabled");
    });
  })

  let reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      const httpId = location.href.match(/\/groups\/\d+/);
      let last_message_id = $('.message').last().data('messageId');

        $.ajax({
          url: `${httpId}/api/messages`,
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
          insertHTML += buildHTML(message);
          });
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
        })
        .fail(function() {
          alert('メッセージ取得に失敗しました');
        });
    }
    else {
      clearInterval(intarval);
    }
  };

  let intarval = setInterval(function() {
    reloadMessages();
  },5000);
});