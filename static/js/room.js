

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
      let registers = response['register'];
      for (let i = 0; i < register.length; i++) {
        let gets = roomget[i]['speak']
        console.log(gets)
        let temp_html = `<div class="container my-img">
                          <div class="item itam1">${gets}</div>
                         </div>`
       $('#postbox').append(temp_html);                   
      } 
    }
  })
}
    