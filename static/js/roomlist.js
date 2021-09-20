window.addEventListener("load", function () {
  loadList();
});

let uid = "";
const loadList = () => {
  fetch("/roomlist/number", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      const team = response.team;
      const name = response.name;
      uid = response.id;
      // 미리 만들어진 방 번호를 서버에서 받아온다.
      const roomsArray = response.listArray;
      const roomlistWrap = document.querySelector(".roomlist-wrap");
      // 서버에서 받아온 방 번호들은 배열의 형태임으로
      // for문으로 돌면서 하나씩 추가해준다.
      for (let i = 0; i < roomsArray.length; i++) {
        roomlistWrap.innerHTML += `
                <div class="roomlist ${roomsArray[i]}"  onclick="userRoomCheck(event,${team},'${name}','${uid}')">
                  <p class="room-team-number">${roomsArray[i]}팀</p>
                </div>

            `;
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
};

// 방을 클릭했을때 회원가입시 입력한 팀 번호와, 클릭한 방의 번호가 같은지 확인하는 함수
function userRoomCheck(e, team, name) {
  const userRoomNumber = parseInt(team);
  const userName = name;
  // 클릭 이벤트가 발생한 타겟의 클래스명이 무엇인지 확인할 것
  let clickRoom = e.currentTarget.className;
  // 클릭한 방의 클래스명에 방번호만 찾기
  clickRoom = parseInt(clickRoom.split(" ").reverse()[0]);
  // 클릭한 방 번호와 회원가입시 입력한 방번호가 맞지 않으면
  if (clickRoom !== userRoomNumber) {
    alert(
      `${userName} 회원님의 팀 번호는 ${userRoomNumber}팀 입니다. 다른 팀 방에는 입장할 수 없습니다`
    );
  } else {
    // 그 외(방 번호가 맞을경우)
    alert(`${userName} 회원님의 ${userRoomNumber}팀 방명록으로 이동합니다.`);
    window.location.href = "/room";
  }
}

const changeTeamBtn = document.getElementsByClassName("team-change-btn")[0];
const changePopup = document.getElementsByClassName("team-popup-bg")[0];
const changeCloseBtn = document.getElementsByClassName("team-popup-close")[0];
changeTeamBtn.addEventListener("click", (e) => {
  changePopup.classList.add("show");
});
changePopup.addEventListener("click", (e) => {
  hidePopup(e, changePopup);
});
changeCloseBtn.addEventListener("click", (e) => {
  hidePopup(e, changePopup);
});
const hidePopup = (e, tag) => {
  if (e.target.className !== e.currentTarget.className) {
    return null;
  }
  return tag.classList.remove("show");
};

const changeTeamNumber = document.getElementById("change-team-number");
const changeBtn = document.getElementById("change-btn");

changeBtn.addEventListener("click", (e) => {
  console.log("uid = ", uid);
  if (changeTeamNumber.value === "") {
    alert("변경할 팀 번호를 입력해주세요");
  }
  if (isNaN(changeTeamNumber.value)) {
    alert("변경할 팀 번호는 숫자로 입력해주세요");
  }
  if (changeTeamNumber.value !== "" && !isNaN(changeTeamNumber.value)) {
    fetch("/roomlist/change/number", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid_give: uid,
        changeTeam_give: changeTeamNumber.value,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.msg);
        window.location.href = "/roomlist";
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
});
