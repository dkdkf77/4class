// 등록 클릭 시 자동 새로고침 함수
$(document).ready(function () {
  teamRoomLoad();
});

let team = 0;
// 댓글, 이름, 날짜, uid, id를 받아 뿌려주는 get 요청 함수
function teamRoomLoad() {
  $.ajax({
    type: "GET",
    url: "/room/comment",
    data: {},
    success: function (response) {
      console.log("response = ?");
      team = response.team;
      // db에 등록 된 정보를 받아온다.
      let teamMessage = response["teamMessage"];
      let loginUser = response["login_user"];
      // db 정보를 반복문으로 돌려 준다.
      for (let i = 0; i < teamMessage.length; i++) {
        let speak = teamMessage[i]["speak"];
        let name = teamMessage[i]["name"];
        let date = teamMessage[i]["date"];
        let uid = teamMessage[i]["uid"];
        let id = teamMessage[i]["id"];
        // 화면에 받아온 정보를 뿌려준다.
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

// 기존 미다님의 Delete 코드
// 삭제 버튼을 클릭했을 때 필요한 매개변수를 받는다(글 작성시 생성된 uid, 로그인한 회원의 id, 글작성한 사람의 id)
const delete_word = (uid, id, loginId) => {
  // 로그인한 id와 글 작성한 사람의 id가 같지 않으면 경고창을 띄워준다.
  if (id !== loginId) {
    alert(`${loginId} 님이 작성한 글만 삭제할 수 있습니다.`);
  } else {
    // 그 외(글 작성한 사람의 id와 로그인한 사람의 id가 같을 경우)
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
};

// 대화창에 입력 후 등록 버튼 클릭시 등록이 되게 끔 해주는 함수
function registration() {
  let textinput = $("#textinput").val();
  if (textinput === "") {
    alert("내용을 입력해주세요");
  } else {
    // 버튼 클릭시 텍스트를 등록 후 경고 창 출력 그리고 새로고침을 해주는 함수
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

const allDeleteBtn = document.getElementById("all-delete");
allDeleteBtn.addEventListener("click", () => {
  fetch("/room/delete/all", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      team_give: team,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.msg);
      window.location.href = "/room";
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
});
// window.addEventListener("load", function () {
//   teamRoomLoad();
// });
// 방에 입장했을 때 발생하는 함수
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
