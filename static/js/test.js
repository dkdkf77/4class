window.addEventListener("load", function () {
  teamRoomLoad();
});

function teamRoomLoad() {
  fetch("/test/list", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("response == ", response);
      const roomWrap = document.querySelector("#room-wrap");
      const teamMessage = response.teamMessage;
      const loginUser = response.login_user;

      for (let i = 0; i < teamMessage.length; i++) {
        let temp_html = `
        <div class="room-message-wrap">
            <span class="name">${teamMessage[i].name}</span>
            <p class="message">${teamMessage[i].speak}</p>
            <span class="datetime">${teamMessage[i].date}</span>
            <div class="button-wrap">
                <button class="delete-btn" onclick="delete_word('${teamMessage[i].uid}','${teamMessage[i].id}','${loginUser}')">삭제</button>
            </div>
        </div>
        `;
        roomWrap.innerHTML += temp_html;
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}

function delete_word(uid, id, loginId) {
  if (id !== loginId) {
    alert(`${loginId} 님이 작성한 글만 삭제할 수 있습니다.`);
  } else {
    fetch("/test/delete", {
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
        window.location.href = "/testroom";
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
}

function registration() {
  let textinput = $("#textinput").val();
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
