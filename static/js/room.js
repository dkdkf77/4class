

$(document).ready(function () {
  showgets();
});

function registration() {

  let textinput = $('#textinput').val();

  $.ajax({
      type: "POST",
      url: "/room/room_post",
      data: { comment_give : textinput },
      success: function (response) {
          alert(response["msg"]);
          window.location.reload();
      }
  })
}


function showgets() {
  $.ajax({
    type: "GET",
    url: "/room/room_get",
    data: {},
    success: function (response) {
      let db_comment = response['register'];
      for (let i = 0; i < db_comment.length; i++) {
        let gets = db_comment[i]['speak']
        
        let temp_html = `<div class="room-message-wrap">
                            <span class="name">이미다</span>
                            <p class="message">${gets}</p>
                            <span class="datetime">2021년 09월 15일</span>
                            <div class="button-wrap">
                              <button class="edit-btn">수정</button>
                              <button class="delete-btn">삭제</button>
                            </div>
                        </div>`
       $('#room-wrap').append(temp_html);                   
      } 
    }
  })
}

function delete_word() {
    $.ajax({
        type: "POST",
        url: `/room/delete`,
        data: {
           speak_give: "{{ speak }}"
        },
        success: function (response) {
            alert(response["msg"])
            window.location.reload();
        }
    });
}
    