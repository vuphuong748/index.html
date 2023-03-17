let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let btnLogin = document.querySelector(".btn-login");

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  let user = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  console.log(user);
  let json = JSON.stringify(user);
  if (!username.value || !email.value || !password.value) {
    alert("Vui Lòng Nhập Đầy Đủ Thông Tin");
  }
  if (localStorage.getItem(username.value) == json) {
    alert("Đăng Nhập Thành Công");
    window.location.href = "trangchu.html";
  } else {
    alert("Đăng Nhập Thất Bại");
  }
});
