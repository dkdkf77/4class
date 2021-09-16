const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  $.ajax({
    type: "GET",
    url: "/test",
    data: {},
    success: function (response) {
      console.log("response = ", response);
    },
  });
});
