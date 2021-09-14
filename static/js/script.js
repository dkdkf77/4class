const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");

if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    console.log("login btn click");
  });
}
if (signupBtn) {
  signupBtn.addEventListener("click", (e) => {
    console.log("signup btn click");
  });
}
