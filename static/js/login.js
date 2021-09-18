const loginId = document.querySelector(".login-id");
const loginPw = document.querySelector(".login-pw");
const loginBtn = document.querySelector(".login-btn");

// help text
let helploginId = document.querySelector(".help-text-login-id");
let helploginPw = document.querySelector(".help-text-login-pw");

// 로그인 버튼을 클릭하면 발생하는 함수
loginBtn.addEventListener("click", () => {
  // 해당 input값에 값이 없거나 있을때 checkText함수로 문구 제어
  if (loginId.value === "") checkText("loginid");
  if (loginId.value !== "") checkText("loginid-hidden");
  if (loginPw.value === "") checkText("loginpw");
  if (loginPw.value !== "") checkText("loginpw-hidden");

  // 로그인 id, pw 값이 모두 있어야 서버와 통신을 시작
  if (loginId.value !== "" && loginPw.value !== "") {
    fetch("/login/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loginid_give: loginId.value,
        loginpw_give: loginPw.value,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        // 로그인 성공시 cookie에 토큰을 저장한다.
        if (response.result === "success") {
          document.cookie = `port-token=${response.token}`;
          // 토큰을 저장후 메인페이지로 이동한다
          document.location.href = "roomlist";
        } else if (response.result === "fail") {
          // 실패시 실패 메세지를 띄워준다.
          alert(response.msg);
        }
      })
      .catch((error) => {
        alert(error);
        console.log("error = ", error);
      });
  }
});
