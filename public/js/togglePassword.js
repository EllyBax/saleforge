//togglePassword
document.addEventListener("DOMContentLoaded", () => {
  const passwordToggle = document.getElementById("togglePassword");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  passwordToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      password.type = "text";
      confirmPassword.type = "text";
    } else {
      password.type = "password";
      confirmPassword.type = "password";
    }
  });
});
