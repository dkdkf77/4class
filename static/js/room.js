

$(document).ready(function () {
  showgets();
});

function registration() {

  let textinput = $('#textinput').val();

  $.ajax({
      type: "POST",
      url: "/room",
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
    url: "/room",
    data: {},
    success: function (response) {
      let roomget = response['roomgets']
      for (let i= 0; i<roomget.length; i++) {
        let gets = allget[i]['roomget']
        let temp_html = `<div class="container my-img">
                          <div class="item item1">${gets}</div>
                         </div>`
      $('#item').append(temp_html);                   
      } 
    }
  })
}