

// $(document).ready(function () {
//   showgets();
// });

// function registration() {
//   // 화면에 입력어 있는 제목, 저자, 리뷰 내용을 가져옵니다.
//   let textinput = $('#textinput').val();

//   // POST /review 에 저장(Create)을 요청합니다.
//   $.ajax({
//       type: "POST",
//       url: "/room",
//       data: { comment_give : textinput },
//       success: function (response) {
//           alert(response["msg"]);
//           window.location.reload();
//       }
//   })
// }


// function showgets() {
//   $.ajax({
//     type: "GET",
//     url: "/room",
//     data: {},
//     success: function (response) {
//       let allget = response['allgets']
//       for (let i = 0; i< allget.length; i++) {
//         let comment = allget[i]['comment']

//         let temp_html = `<div class="container my-img">
//                           <div class="item item1">${comment}</div>
//                          </div>`

//         $('#item').append(temp_html);
//       }
//     }
//   })
// }