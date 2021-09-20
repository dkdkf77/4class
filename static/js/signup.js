const signupBtn = document.querySelector(".signup-btn");
const idCheckBtn = document.querySelector(".id-check");
const signupId = document.querySelector(".signup-id");
const signupPw = document.querySelector(".signup-pw");
const signupCheckPw = document.querySelector(".signup-check-pw");
const signupName = document.querySelector(".signup-name");
const signupTeam = document.querySelector(".signup-team");
// help text
let helpId = document.querySelector(".help-text-id");
let helpPw = document.querySelector(".help-text-pw");
let helpCheckPw = document.querySelector(".help-text-check-pw");
let helpName = document.querySelector(".help-text-name");
let helpTeam = document.querySelector(".help-text-team");

// 아이디 중복 확인 버튼 클릭했는지 확인하는 변수
let checkId = false;
// 회원가입 버튼 클릭 했을 때
signupBtn.addEventListener("click", () => {
  // 해당 input값에 값이 없거나 있을때 checkText함수로 문구 제어
  if (signupId.value === "") checkText("signupId");
  if (signupId.value !== "") checkText("signupId-hidden");
  if (signupPw.value === "") checkText("signupPw");
  if (signupPw.value !== "") checkText("signupPw-hidden");
  if (signupCheckPw.value === "") checkText("signupCheckPw");
  if (signupCheckPw.value !== "") checkText("signupCheckPw-hidden");
  if (signupPw.value !== signupCheckPw.value) checkText("signupCheckPw-check");
  if (signupName.value === "") checkText("signupName");
  if (signupName.value !== "") checkText("signupName-hidden");
  if (signupTeam.value === "") checkText("signupTeam");
  if (signupTeam.value !== "") checkText("signupTeam-hidden");
  if (isNaN(signupTeam.value)) checkText("signupTeam-number");

  // 아이디 중복체크를 하지 않으면 return되게 조건처리
  if (!checkId) {
    checkText("signupId-reg-Btn");
    return null;
  } else if (
    // 아이디 중복체크를 하고, input의 모든 값이 입력되었으면 통신을 시작
    checkId &&
    signupId.value !== "" &&
    signupPw.value !== "" &&
    signupPw.value === signupCheckPw.value &&
    signupName.value !== "" &&
    signupTeam.value !== "" &&
    // 팀 번호의 값이 숫자여야만 함
    !isNaN(signupTeam.value)
  ) {
    fetch("/signup/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid_give: signupId.value,
        password_give: signupPw.value,
        username_give: signupName.value,
        userteam_give: signupTeam.value,
      }),
    })
      .then((res) => res.json())
      .then((response) => alert(response.result))
      .then(() => (window.location.href = "/"))
      .catch((error) => {
        alert(error);
        console.error("Error:", error);
      });
  }
});

idCheckBtn.addEventListener("click", () => {
  helpId.style.color = "#fa5252";
  // 입력한 id의 값이 정규표현식을 통과한 값이 아니면 return
  if (!is_id(signupId.value)) {
    checkText("signupId-reg");
    return null;
  }
  // 입력한 id의 값이 정규표현식을 통과한 값이면 checkId의 변수의 상태를 변경
  if (is_id(signupId.value)) {
    checkText("signupId-reg-check");
    checkId = true;
  }
  fetch("/signup/check_dup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid_give: signupId.value }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.exists) {
        // 중복된 아이디일때
        checkText("signupId-haveId");
      } else {
        checkId = true;
        helpId.style.color = "#4dabf7";
        checkText("signupId-reg-check");
      }
    });
});

// id 값 정규표현식
function is_id(value) {
  // 영어로 시작하고 영어+숫자 포함한 6자리 이상 20자리 미만
  const regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
  return regExp.test(value);
}
