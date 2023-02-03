var email = document.getElementById("Email");
alertMessage = document.getElementById("alert");
var password = document.getElementById("password");
var btn = document.getElementById("btn");
var span = document.getElementById("spa");
form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  validation();
  apifetch();
});

function apifetch() {
  fetch(`http://localhost:3000/user/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.apiStatus) {
        console.log(data.apiStatus);
        alertMessage.style.cssText = "display:none";
        console.log(data.apiStatus);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", data.data.user.name);
        window.location.href =
          "../home/index.html";
      } else {
        alertMessage.style.cssText = "display:block";
        alertMessage.innerHTML = `<div class="alert  alert-danger" role="alert">
            Email Or Password Invalid !!
          </div>`;
      }
    });
}

// function checkData() {
//   fetch(`http://localhost:3000/user/register`, {
//     method: "POST",
//     body: JSON.stringify({
//       name: username,
//       password: password,
//     }),
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => location.replace(""));
// }

// const isValidEmail = (email) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };

// function validate() {
//   if (re.tes) {
//     span.style.display = "flex";
//   }
//   //   } else if (!isValidEmail(emailValue)) {
//   //     setError(email, "Provide a valid email address");
//   //   } else {
//   //     setSuccess(email);
//   //   }
// }

function validation() {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regexEmail.test(email.value) || email.value == "") {
    email.nextElementSibling.innerText = "Email isn't valid";
    email.nextElementSibling.style.color = "Red";
    email.style.border = "2px solid red";
  } else {
    email.nextElementSibling.innerText = "";
    email.nextElementSibling.style.color = "green";
    email.style.border = "2px solid green";
  }
}
