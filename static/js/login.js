const loginId = document.querySelector(".login-id");
const loginPw = document.querySelector(".login-pw");
const loginBtn = document.querySelector(".login-btn");

// help text
let helploginId = document.querySelector(".help-text-login-id");
let helploginPw = document.querySelector(".help-text-login-pw");

function checkTextLogin(value) {
  switch (value) {
    case "loginid":
      helploginId.classList.add("show");
      helploginId.innerHTML = `아이디를 입력해주세요`;
      break;
    case "loginid-hidden":
      helploginId.classList.remove("show");
      helploginId.innerHTML = ``;
      break;
    case "loginpw":
      helploginPw.classList.add("show");
      helploginPw.innerHTML = `비밀번호를 입력해주세요`;
      break;
    case "loginpw-hidden":
      helploginPw.classList.remove("show");
      helploginPw.innerHTML = ``;
      break;
    default:
      console.log("check check!!");
  }
}

loginBtn.addEventListener("click", () => {
  if (loginId.value === "") checkTextLogin("loginid");
  if (loginId.value !== "") checkTextLogin("loginid-hidden");
  if (loginPw.value === "") checkTextLogin("loginpw");
  if (loginPw.value !== "") checkTextLogin("loginpw-hidden");

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
        if (response.result === "success") {
          document.cookie = `port-token=${response.token}`;
          document.location.href = "roomlist";
        } else if (response.result === "fail") {
          alert(response.msg);
        }
      })
      .catch((error) => {
        alert(error);
        console.log("error = ", error);
      });
  }
});
