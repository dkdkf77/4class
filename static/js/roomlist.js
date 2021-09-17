window.addEventListener("load", function () {
  loadList();
});

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
      let roomsArray = response.listArray;
      const roomlistWrap = document.querySelector(".roomlist-wrap");
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

function userRoomCheck(e, team, name, id) {
  const userRoomNumber = parseInt(team);
  const userName = name;
  let clickRoom = e.currentTarget.className;
  clickRoom = parseInt(clickRoom.split(" ").reverse()[0]);
  // console.log(name);
  // if (id === "admin1") {
  //   window.location.href = "/room";
  // }
  if (clickRoom !== userRoomNumber && id !== "admin1") {
    alert(
      `${userName} 회원님의 팀 번호는 ${userRoomNumber}팀 입니다. 다른 팀 방에는 입장할 수 없습니다`
    );
  } else {
    alert(`${userName} 회원님의 ${userRoomNumber}팀 방명록으로 이동합니다.`);
    window.location.href = "/room";
  }
}
