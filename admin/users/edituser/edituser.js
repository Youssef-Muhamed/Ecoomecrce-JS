document.getElementById("username").innerHTML =
  "Welcome " + localStorage.getItem("username");
let token = localStorage.getItem("token");
let id = location.search.split("?")[1];
// if(!token) {
//     window.location.replace('google.com')
// } else {
let username = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let phone = document.getElementById("phone");
let gender = document.getElementById("gender");
let image = document.getElementById("image");
let addUser = document.getElementById("addUser");
let showErrors = document.getElementById("showErrors");
let showImage = document.getElementById('showImage')

let validRegex =
  "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";

// Get user
fetch(`http://localhost:3000/user/all/${id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
})
  .then((res) => res.json())
  .then(getuser);

function getuser(data) {
    username.value = data.data.name;
    email.value = data.data.email;
    phone.value = data.data.phone;
    if(data.data.gender == 'male'){document.getElementById('male').setAttribute('selected',null)}
    else{document.getElementById('female').setAttribute('selected',null)}
    defaultImg = 'default.png'
    if(data.data.image !== ''){defaultImg = data.data.image} else {defaultImg}
    showImage.src = `../../../e-commerce/uploads/users/${defaultImg}`
  }

addUser.addEventListener("click", () => {
  // Validation on form
  errors = [];
  // name validation
  if (username.value == "") {
    errors["name"] = "* Name cant be empty";
  } else if (username.value.length < 3) {
    errors["name"] = "* Name shuld be greater than 3 character";
  }
  // password validation
//   if (password.value == "") {
//     errors["password"] = "* password cant be empty";
//   } else if (password.value.length < 4) {
//     errors["password"] = "* password shuld be greater than 4 character";
//   }
  // password validation
  if (email.value == "") {
    errors["email"] = "* email cant be empty";
  } else if (email.value.match(validRegex)) {
    errors["email"] = "* email shuld be valid";
  }
  // Phone validation
  if (phone.value == "") {
    errors["email"] = "* phone cant be empty";
  } else if (phone.value.match("/^d{10}$/")) {
    errors["phone"] = "* phone shuld be valid";
  }
  // gender validation
  if (gender.value == "") {
    errors["gender"] = "* choose your gender";
  }

  if (Object.keys(errors).length === 0) {
    // console.log(errors);
    fetch(`http://localhost:3000/user/all/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        phone: phone.value,
        // password: password.value,
        gender: gender.value,
        // "image" :image.value
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.apiStatus == true) {
          uploadImg(data.data._id)
        } else {
          console.log(data);
        }
      });
  } else {
    for (key in errors) {
      showErrors.innerHTML += `
                <div class="alert alert-danger" role="alert">
                  ${key}: ${errors[key]} 
                </div>
                `;
    }
  }
});
function uploadImg(id){
  let formData = new FormData();
  formData.append('profile', image.files[0]);
  fetch('http://localhost:3000/user/profileImg/'+id, {
      method:'POST',
      headers:
      {
           Authorization: token,
      },
      body: formData,
  }) 
  .then(res=>res.json())
  .then((res)=> window.location.href = '../showusers/showusers.html')
}
// }
