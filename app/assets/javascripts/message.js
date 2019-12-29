$(function(){
  

  function buildHTML(message){
    if (message.content && message.image) {
      var html = `<div class="message", data-message-id="${message.id}">
                    <div class="message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="message__date">
                      ${ message.date }
                    </div>
                    <p class="message__content_directly">
                      ${ message.content }
                    </p>
                      <img src="${ message.image }" alt="lower-message__image">
                  </div>`
        
    } else if (message.content) {
      var html = `<div class="message", data-message-id="${message.id}">
                    <div class="message_name">
                      ${ message.user_name}
                    </div>
                    <div class="message_time">
                      ${ message.date }
                    </div>
                    <p class="message_content_directly">
                      ${ message.content }
                    </p>
                  </div>`
    } else if (message.image) {
      var html = `<div class="message", data-message-id="${message.id}">
                    <div class="message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="message__date">
                      ${ message.date }
                    </div>
                      <img src="${message.image }" alt="lower-message__image">
                  </div>`
        }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('create')
    
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-view').append(html);
      $('.chat-view').animate({ scrollTop: $('.chat-view')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.submit').prop('disabled', false);
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    })
    return false;
  })

  var reloadMessages = function() {
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
      });
      $('.chat-view').append(insertHTML);
      $('.chat-view').animate({ scrollTop: $('.chat-view')[0].scrollHeight});
      $(".new_message")[0].reset();
      $('.submit').prop("disabled", false);
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  
}

setInterval(reloadMessages, 7000);
})

