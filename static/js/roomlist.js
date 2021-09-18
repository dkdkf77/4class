window.addEventListener("load", function () {
  loadList();
});
// roomlist 페이지에 들어오면
function loadList() {
  fetch("/roomlist/number", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      let team = response.team;
      let name = response.name;
      let id = response.id;
      // 미리 만들어진 방 번호를 서버에서 받아온다.
      let roomsArray = response.listArray;
      const roomlistWrap = document.querySelector(".roomlist-wrap");
      // 서버에서 받아온 방 번호들은 배열의 형태임으로
      // 고차함수 map으로 돌면서 하나씩뷰에 보여준다.
      roomsArray.map((rooms) => {
        roomlistWrap.innerHTML += `
                <div class="roomlist ${rooms}"  onclick="userRoomCheck(event,${team},'${name}','${id}')">
                  <p class="room-team-number">${rooms}팀</p>
                </div>
            `;
      });
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}

// 방을 클릭했을때 회원가입시 입력한 팀 번호와, 클릭한 방의 번호가 같은지 확인하는 함수
function userRoomCheck(e, team, name, id) {
  const userRoomNumber = parseInt(team);
  const userName = name;
  // 클릭한 타겟의 부모 클래스명이 무엇인지 확인할 것
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
