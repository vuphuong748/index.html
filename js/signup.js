let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let btnSignup = document.querySelector(".btn-signup");
let btnLogin = document.querySelector(".btn-login");

btnSignup.addEventListener("click", (e) => {
  e.preventDefault();
  let user = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  let json = JSON.stringify(user);
  if (!username.value || !email.value || !password.value) {
    alert("Vui Lòng Nhập Đầy Đủ Thông Tin");
  } else {
    localStorage.setItem(username.value,json );
    alert("Đăng Ký Thành Công");
    window.location.href = "dangnhap.html";
  }
});
