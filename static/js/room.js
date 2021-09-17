$(document).ready(function () {
  teamRoomLoad();
});

function teamRoomLoad() {
  console.log("room js 가 나와야 하는데?");
  $.ajax({
    type: "GET",
    url: "/room/comment",
    data: {},
    success: function (response) {
      let teamMessage = response["teamMessage"];
      let loginUser = response["login_user"];
      for (let i = 0; i < teamMessage.length; i++) {
        let speak = teamMessage[i]["speak"];
        let name = teamMessage[i]["name"];
        let date = teamMessage[i]["date"];
        let uid = teamMessage[i]["uid"];
        let id = teamMessage[i]["id"];

        let temp_html = `<div class="room-message-wrap">
                            <span class="name">${name}</span>
                            <p class="message">${speak}</p>
                            <span class="datetime">${date}</span>
                            <div class="button-wrap">
                         
                              <button class="delete-btn" onclick="delete_word('${uid}','${id}','${loginUser}')">삭제</button>
                            </div>
                        </div>`;
        $("#room-wrap").append(temp_html);
      }
    },
  });
}

// window.addEventListener("load", function () {
//   teamRoomLoad();
// });
// function teamRoomLoad() {
//   fetch("/room/comment", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((response) => {
//       console.log("response == ", response);
//       const roomWrap = document.querySelector("#room-wrap");
//       const teamMessage = response.teamMessage;
//       const loginUser = response.login_user;
//
//       for (let i = 0; i < teamMessage.length; i++) {
//         let temp_html = `
//         <div class="room-message-wrap">
//             <span class="name">${teamMessage[i].name}</span>
//             <p class="message">${teamMessage[i].speak}</p>
//             <span class="datetime">${teamMessage[i].date}</span>
//             <div class="button-wrap">
//                 <button class="delete-btn" onclick="delete_word('${teamMessage[i].uid}','${teamMessage[i].id}','${loginUser}')">삭제</button>
//             </div>
//         </div>
//         `;
//         roomWrap.innerHTML += temp_html;
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       alert(error);
//     });
// }

// ajax로 만들 delete

// function delete_word(uid, id, loginId) {
//   $.ajax({
//     type: "POST",
//     url: `/room/delete`,
//     data: {
//       uid_give: uid,
//       id_give: id,
//     },
//     success: function (response) {
//       if (id !== loginId) {
//         alert("${loginId} 님이 작성한 글만 삭제할 수 있습니다.");
//       } else {
//         alert(response["msg"]);
//         window.location.href = "/room";
//       }
//     },
//   });
// }

// 기존 미다님의 Delete 코드

function delete_word(uid, id, loginId) {
  if (id !== loginId) {
    alert(`${loginId} 님이 작성한 글만 삭제할 수 있습니다.`);
  } else {
    fetch("/room/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid_give: uid,
        id_give: id,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        alert("삭제되었습니다.");
        window.location.href = "/room";
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
}

function registration() {
  let textinput = $("#textinput").val();
  if (textinput === "") {
    alert("내용을 입력해주세요");
  } else {
    $.ajax({
      type: "POST",
      url: "/room/room_post",
      data: { comment_give: textinput },
      success: function (response) {
        alert(response["msg"]);
        window.location.reload();
      },
    });
  }
}

// function delete_word() {
//   $.ajax({
//     type: "POST",
//     url: `/room/delete`,
//     data: {
//       speak_give: "{{ speak }}",
//     },
//     success: function (response) {
//       alert(response["msg"]);
//       window.location.reload();
//     },
//   });
// }

// function showgets() {
//   $.ajax({
//     type: "GET",
//     url: "/room/room_get",
//     data: {},
//     success: function (response) {
//       let db_comment = response["register"];
//       for (let i = 0; i < db_comment.length; i++) {
//         let gets = db_comment[i]["speak"];

//         let temp_html = `<div class="room-message-wrap">
//                             <span class="name">이미다</span>
//                             <p class="message">${gets}</p>
//                             <span class="datetime">2021년 09월 15일</span>
//                             <div class="button-wrap">
//                               <button class="edit-btn">수정</button>
//                               <button class="delete-btn">삭제</button>
//                             </div>
//                         </div>`;
//         $("#room-wrap").append(temp_html);
//       }
//     },
//   });
// }
