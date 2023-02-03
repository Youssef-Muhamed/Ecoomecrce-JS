token = localStorage.getItem("token");
let categoryId = location.search.split("?")[1];


var logindroplist = document.getElementById("drop");
var btn = document.getElementsByClassName("bootn");
function usercheck() {
  if (token) {
    btn[0].style.display = "none";
    btn[1].style.display = "none";
    // logindroplist.style.display = "block";
    fetch("http://localhost:3000/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => profile(res));

    function profile(data) {
      // console.log(data);

      document.getElementById("button").innerHTML = data.data.name;
    }
  } else {
    logindroplist.style.display = "none";
    btn[0].style.display = "block";
    btn[1].style.display = "block";
  }
}

usercheck();
var logout = document.getElementById("logout");
logout.addEventListener("click", function () {
  localStorage.removeItem("token");
  location.reload()
});

// console.log(id); // to check
// function viewuswer() {
// var id = location.search.split("?")[1];

//   fetch(`http://localhost:3000/pro/singleProduct/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//   })
//     .then((res) => res.json())
//     .then((res)=>getuser(res));
// }
// viewuswer();





url = "http://localhost:3000/cat/show";
// get gategory
fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
})
  .then((res) => res.json())
  .then((res) => cats(res));
function cats(data) {
    allcats = document.getElementById("cats");
    data.cat.forEach(function (c,index) {
    allcats.innerHTML += `
    <li class = "nav-item px-2 py-2" >
    <a class = "nav-link text-uppercase text-dark" href="?${c._id}">${c.name}</a>
    </li>
    `;
  });

}


//  get profuct


token = localStorage.getItem("token");
url = "http://localhost:3000/pro/products";
fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
})
  .then((res) => res.json())
  .then((res) =>products(res));
//   products

function products(data) {
   
let allProducts = document.getElementById("products");
data.data.filter((p,i)=>{
    defaultImg = 'default.jpg'
    if(p.pro.images.length){
        p.pro.images.forEach((img)=>{defaultImg = img.image})
    } else {defaultImg}
    if(p.pro.catId == categoryId){
        allProducts.innerHTML += `
    <div class = "col-md-6 col-lg-4 col-xl-3 p-2">
                    <div class = "special-img position-relative overflow-hidden">
                        <img src = "../../e-commerce/uploads/products/${defaultImg}" class = "w-100">
                        <span class = "position-absolute d-flex align-items-center justify-content-center text-primary fs-4">
                            <i class = "fas fa-heart"></i>
                        </span>
                    </div>
                    <div class = "text-center">
                        <p class = "text-capitalize mt-3 mb-1">${p.pro.name}</p>
                        <span class = "fw-bold d-block">${p.pro.price}</span>
                        <a href = "#" id="delFave" class = "btn btn-primary mt-3" onclick="addFave('${p.pro._id}')">Add to favorite</a>
                        <a href = "../singleProduct/index.html?${p.pro._id}" class = "btn btn-primary mt-3">View Product</a>
                    </div>
                </div>
    `;        
    } else if (typeof categoryId =="undefined"){
      document.getElementById('options').innerHTML +=`
      <option id="${p.pro._id}" value="${p.pro.name}">
      `
        allProducts.innerHTML += `
    <div class = "col-md-6 col-lg-4 col-xl-3 p-2">
                    <div class = "special-img position-relative overflow-hidden">
                        <img src = "../../e-commerce/uploads/products/${defaultImg}" class = "w-100">
                        <span class = "position-absolute d-flex align-items-center justify-content-center text-primary fs-4">
                            <i class = "fas fa-heart"></i>
                        </span>
                    </div>
                    <div class = "text-center">
                        <p class = "text-capitalize mt-3 mb-1">${p.pro.name}</p>
                        <span class = "fw-bold d-block">${p.pro.price}</span>
                        <a href = "#" id="delFave" class = "btn btn-primary mt-3" onclick="addFave('${p.pro._id}',${i})">Add to favorite</a>
                        <a href = "../singleProduct/index.html?${p.pro._id}" class = "btn btn-primary mt-3">View Product</a>
                    </div>
                </div>
    `;  
    // console.log(p);
    
    // console.log(JSON.parse(localStorage.getItem('myFave')));
  //   if(){
  //     document.querySelectorAll('#delFave')[i]
  // }
    }
})



// data.data.forEach(function (p,index) {
//     //  console.log(p.pro.name);
//         defaultImg = 'default.jpg'
//         if(p.pro.images.length){
//             p.pro.images.forEach((img)=>{defaultImg = img.image})
//         } else {defaultImg}
//         allProducts.innerHTML += `
//         <div class = "col-md-6 col-lg-4 col-xl-3 p-2">
//                         <div class = "special-img position-relative overflow-hidden">
//                             <img src = "../../e-commerce/uploads/products/${defaultImg}" class = "w-100">
//                             <span class = "position-absolute d-flex align-items-center justify-content-center text-primary fs-4">
//                                 <i class = "fas fa-heart"></i>
//                             </span>
//                         </div>
//                         <div class = "text-center">
//                             <p class = "text-capitalize mt-3 mb-1" onclick="addFave('${p.pro._id}')">${p.pro.name}</p>
//                             <span class = "fw-bold d-block">${p.pro.price}</span>
//                             <a href = "#" class = "btn btn-primary mt-3" >Add to favorite</a>
//                             <a href = "../singleProduct/singleProduct.html?${p.pro._id}" class = "btn btn-primary mt-3">View Product</a>
//                         </div>
//                     </div>
//         `;
//       });



}

function load(){
    const fave = []
    if(!localStorage.getItem("myFave")){
        localStorage.setItem('myFave',JSON.stringify(fave))
    }
}
function addToLocalStorage(fave) {
    if(localStorage.getItem("myFave")){
        localStorage.setItem('myFave',JSON.stringify(fave))
    }
}
function addFave(id,i){
  document.querySelectorAll('#delFave')[i].style.display='none'
    fetch(`http://localhost:3000/pro/singleProduct/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) =>{
            const getFave = JSON.parse(localStorage.getItem('myFave'))
            getFave.push(res.data[0])
            // console.log(getFave);
            addToLocalStorage(getFave)
            // window.location.reload()
        });
}

load()



