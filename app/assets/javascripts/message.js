$(function(){

  function buildHTML(message){

    if (message.image) {
      var html = `<div class="image_on_upper-message">
                    <div class="image_on_upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="image_on_upper-message__date">
                      ${ message.date }
                    </div>
                  </div>
                  <div class="image_on_lower-message__content>
                    <p class="image_on_lower-message__content_directly">
                      ${ message.content }
                    </p>
                    <img src="${message.image }">
                  </div>`
        
    } else {
      var html = `<div class="message_name">
                      ${ message.user_name}
                    </div>
                    <div class="message_time">
                      ${ message.date }
                    </div>
                  </div>
                    <p class="message_content_directly">
                      ${ message.content }
                    </p>
                  </div>`
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    console.log(this)
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
  })
})