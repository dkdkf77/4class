const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    document.cookie = `port-token = expires=Thu, 01 Jan 1999 00:00:10 GMT;`;
    window.location.href = "/";
  });
}
