var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var password2 = document.getElementById("checkpassword");
var form = document.getElementById("form");
var button = document.getElementById("btn");
var gender = document.getElementById("gender");
var phone = document.getElementById("phoneNumber");
var image = document.getElementById("image");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
  creatUser();
});
function creatUser() {
  fetch(`http://localhost:3000/user/register`, {
    method: "POST",
    body: JSON.stringify({
      name: username.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      gender: gender.value,
      image: image.value,
    }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then(apicomes);
}

function uploadImg(id) {
  let formData = new FormData();
  formData.append("profile", image.files[0]);
  fetch("http://localhost:3000/user/profileImg/" + id, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) =>{
       if(res.apiStatus){
      window.location.href = "../login/login.html"

    }})
}

function apicomes(user) {
  if (user.apiStatus) {
    console.log(user.apiStatus);
    uploadImg(user.data._id);
  } else {
    console.log(user);
    setError(email, "your email is already required");
  }
}

const setError = (element, message) => {
  //div
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// var lowerCaseLetters = /[a-z]/g;
//   if(myInput.value.match(lowerCaseLetters)) {
//     letter.classList.remove("invalid");
//     letter.classList.add("valid");
//   } else {
//     letter.classList.remove("valid");
//     letter.classList.add("invalid");
// }

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  const lowerCaseLetters = /[a-z]/g;
  if (usernameValue === "") {
    setError(username, "Username is required");
  } else if (usernameValue.length < 3) {
    setError(username, "Username must be at least 4 character");
  } else if (!username.value.match(lowerCaseLetters)) {
    setError(username, "Username must be strings only");
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 6) {
    setError(password, "Password must be at least 8 character.");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "Please confirm your password");
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords doesn't match");
  } else {
    setSuccess(password2);
  }
};

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   checkInputs();
// });
// function checkInputs() {
//   const usernameValue = username.value.trim();
//   const emailValue = email.value.trim();
//   const passwordValue = password.value.trim();
//   const checkpasswordValue = checkPassword.value.trim();
// }
