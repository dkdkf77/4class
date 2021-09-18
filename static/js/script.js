const logoutBtn = document.querySelector(".logout-btn");
// 로그아웃 버튼이 아직 파싱되지 않았을 경우를 대비
if (logoutBtn) {
  // 로그아웃 버튼을 클릭하면 cookie에 예전 시간 값을 줘서 토큰을 만료시킨다
  logoutBtn.addEventListener("click", () => {
    document.cookie = `port-token = expires=Thu, 01 Jan 1999 00:00:10 GMT;`;
    window.location.href = "/";
  });
}

// 회원가입 로그인시 필수 입력값을 입력하지 않으면 나오는 문구 함수
function checkText(value) {
  // 매개변수로 받는 value값과 일치하면 해당하는 위치에 문구가 나오게 switch로 작성
  switch (value) {
    case "signupId":
      helpId.innerHTML = `아이디를 입력해주세요`;
      break;
    case "signupId-reg":
      helpId.innerHTML = `아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자만 가능합니다`;
      break;
    case "signupId-reg-Btn":
      helpId.innerHTML = `아이디 중복 체크를 확인해주세요.`;
      break;
    case "signupId-reg-check":
      helpId.innerHTML = `사용할 수 있는 아이디입니다.`;
      break;
    case "signupId-haveId":
      helpId.innerHTML = `중복된 아이디 입니다.`;
      break;
    case "signupId-hidden":
      helpId.innerHTML = ``;
      break;
    case "signupPw":
      helpPw.innerHTML = `비밀번호를 입력해주세요`;
      break;
    case "signupPw-hidden":
      helpPw.innerHTML = ``;
      break;
    case "signupCheckPw":
      helpCheckPw.innerHTML = `비밀번호를 한번 더 입력해주세요`;
      break;
    case "signupCheckPw-check":
      helpCheckPw.innerHTML = `동일한 비밀번호를 입력해주세요`;
      break;
    case "signupCheckPw-hidden":
      helpCheckPw.innerHTML = ``;
      break;
    case "signupName":
      helpName.innerHTML = `이름을 입력해주세요`;
      break;
    case "signupName-hidden":
      helpName.innerHTML = ``;
      break;
    case "signupTeam":
      helpTeam.innerHTML = `조를 입력해주세요`;
      break;
    case "signupTeam-number":
      helpTeam.innerHTML = `숫자로만 입력해주세요`;
      break;
    case "signupTeam-hidden":
      helpTeam.innerHTML = ``;
      break;
    case "loginid":
      helploginId.innerHTML = `아이디를 입력해주세요`;
      break;
    case "loginid-hidden":
      helploginId.innerHTML = ``;
      break;
    case "loginpw":
      helploginPw.innerHTML = `비밀번호를 입력해주세요`;
      break;
    case "loginpw-hidden":
      helploginPw.innerHTML = ``;
      break;
    default:
      console.log("check check!!");
  }
}
