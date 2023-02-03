token = localStorage.getItem("token");
console.log(token);

function getdata() {
  fetch("http://localhost:3000/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => profile(res));
}
getdata();
function profile(data) {
  // console.log(data);
  document.getElementById("name").innerHTML = data.data.name;
  document.getElementById("username").innerHTML = data.data.name;
  document.getElementById("email").innerHTML = data.data.email;
  document.getElementById("phone").innerHTML = data.data.phone;
  document.getElementById("gender").innerHTML = data.data.gender;
  console.log(data.data._id);

  getImage(data.data._id)
}
function getImage(id){
  fetch(`http://localhost:3000/user/all/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res)=>{
      console.log(res.data.image);
document.getElementById('imageProfile').src = `../../e-commerce/uploads/users/${res.data.image}`
    });
}
logout = document.getElementById("logout");
logout.addEventListener("click", function () {
  localStorage.removeItem("token");
});

function getprouct() {
  fetch("http://localhost:3000/pro/myProduct", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then(product);
}
getprouct();
function product(prodata) {
  console.log(prodata.data[0].name);
  let div = document.getElementById("card");

  prodata.data.forEach((el) => {
    if(el.images.length){
      el.images.forEach((img)=>{defaultImg = img.image})
  } else {defaultImg}
    div.innerHTML += ` 
    <div class="col-3" >
    <div class="item">
      <div class="card-body " style="margin:10px">
        <a href="" class="text-reset">
          <img src="../../e-commerce/uploads/products/${defaultImg}"
            class="w-100" />
          <a href="#!">
            <div class="mask">
              <div class="d-flex justify-content-start align-items-end h-100">
                <h5><span class="badge bg-primary ms-2">New</span></h5>
              </div>
            </div>
            <div class="hover-overlay">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </div>
          </a>
          <h5 class="card-title mb-3">${el.name}</h5>
        </a>
        <a href="" class="text-reset">
          <p>${el.description}</p>
        </a>
        <h6 class="mb-3">${el.price}</h6>
      </div>
    </div>
  </div>
  `;
  });
}


