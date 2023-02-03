var tokens = localStorage.getItem("token");
var logindroplist = document.getElementById("drop");
var btn = document.getElementsByClassName("bootn");
// function usercheck() {
//   if (tokens) {
//     btn[0].style.display = "none";
//     btn[1].style.display = "none";
//     // logindroplist.style.display = "block";
//     fetch("http://localhost:3000/user/me", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: tokens,
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => profile(res));

//     function profile(data) {
//       // console.log(data);

//       document.getElementById("button").innerHTML = data.data.email;
//     }
//   } else {
//     logindroplist.style.display = "none";
//     btn[0].style.display = "block";
//     btn[1].style.display = "block";
//   }
// }

// usercheck();
// var logout = document.getElementById("logout");
// logout.addEventListener("click", function () {
//   localStorage.removeItem("token");
// });

// console.log(id); // to check
function viewuswer() {
var id = location.search.split("?")[1];

  fetch(`http://localhost:3000/pro/singleProduct/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokens,
    },
  })
    .then((res) => res.json())
    .then((res)=>getuser(res));
}
viewuswer();
function getuser(data) {
mydiv = document.getElementById("mydiv");
  data.data.forEach(p => {
    console.log(p);
cDate = p.pro.createdAt.split('T')[0]

    if(p.pro.images.length){
      p.pro.images.forEach((img)=>{defaultImg = img.image})
  } else {defaultImg}
    console.log(p.pro.name);
      mydiv.innerHTML += ` <div class="row gx-4 gx-lg-5 align-items-center m-3" style="margin-top: 500px;">
  <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="../../e-commerce/uploads/products/${defaultImg}" alt="..." /></div>
  <div class="col-md-6">
      <h1 class="display-5 fw-bolder"> ${p.pro.name}</h1>
      <div class="fs-5 mb-2">

          <span>Price: ${p.pro.price}</span> <br>
      </div>
      <p class="lead">Description: ${p.pro.description}</p>
      <p class="lead">Country Made: ${p.pro.country_made}</p>
      <p class="lead">Status: ${p.pro.status}</p>
      <div>
          
          <p>Date: ${cDate}</p>
          <p>Category: ${p.catName}</p>
          <p>Ad Owner: ${p.user}</p>
          <p>Owner Phone: ${p.phone}</p>
      </div>
      <button class="btn btn-outline-dark flex-shrink-0" type="button" onclick="addFave('${p.pro._id}')"">
             
              Add to favorite
          </button> 
  </div>
</div>`;
  });
}
// function load(){
//   const fave = []
//   if(!localStorage.getItem("myFave")){
//       localStorage.setItem('myFave',JSON.stringify(fave))
//   }
// }
// function addToLocalStorage(fave) {
//   if(localStorage.getItem("myFave")){
//       localStorage.setItem('myFave',JSON.stringify(fave))
//   }
// }

function addFave(id){
  fetch(`http://localhost:3000/pro/singleProduct/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokens,
      },
    })
      .then((res) => res.json())
      .then((res) =>{
          const getFave = JSON.parse(localStorage.getItem('myFave'))
          getFave.push(res.data[0])
          console.log(getFave);
          addToLocalStorage(getFave)
          // window.location.reload()
      });
}

// load()