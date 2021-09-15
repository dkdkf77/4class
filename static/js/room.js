

$(document).ready(function () {
  showgets();
});



function registration() {
  let textinput = $('#comment').val() 
  $.ajax({
    type : "POST",
    url : "/room",
    data: {comment_give : comment},
    success: function(response) {
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
      let gets = response['all_gets']
      for (let i = 0; i< gets.length; i++) {
        let comment = gets[i]['comment']
        
        let temp_html = `<div class="container my-img">
                          <div class="item item1">${comment}</div>
                         </div>`
      }
    }
  })
}