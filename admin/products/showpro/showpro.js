
token = localStorage.getItem("token");
url = "http://localhost:3000/pro/allproducts";
fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
})
  .then((res) => res.json())
  .then((res) => products(res));


function products(data) {
   
let allProducts = document.getElementById("products");

data.pro.forEach(function (p,index) {
 
    defaultImg = 'default.jpg'
    if(p.images.length){
       p.images.forEach((img)=>{defaultImg = img.image})
    } else {defaultImg}
    allProducts.innerHTML += `
    <tr>
    <td>${index+1}</td>
    <td>${p.name}</td>
    <td>${p.description}</td>
    <td>${p.price}</td>
    <td>${p.country_made}</td>
    <td>${p.status}</td>
    <td class="userpro"></td>
    <td class="catpro"></td>
    <td><img width="50" height= "50" src="../../../e-commerce/uploads/products/${defaultImg}" /></td>
    <td><a href="../editpro/editpro.html?${p._id}" class="btn btn-info m-2 p-2"><i class="fas fa-pencil-alt">
    </i> Edit</a>
    <a href="#" class="btn btn-danger" onclick="deleteProduct('${p._id}')"> <i class="fas fa-trash">
    </i> Delet</a>
    <a href="#" class="btn btn-success" id="aproveBtn"  onclick="aprove('${p._id}')"> <i class="fa fa-check">
    </i> Approve</a>
    </td>
  </tr>
    `;
   user(p.userId,index)
   cat(p.catId,index)
   if(p.approve){
    document.querySelectorAll('#aproveBtn')[index].style.display = 'none'
  }
  });
}

function aprove(id){
  fetch(`http://localhost:3000/pro/approve/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    },
    })
    .then((res) => res.json())
    .then((res) => location.reload());
}
function user(id,i){
    fetch(`http://localhost:3000/user/all/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            })
            .then((res) => res.json())
            .then((res) => {document.querySelectorAll('.userpro')[i].innerHTML = res.data.name});
}
function cat(id,i){
    fetch(`http://localhost:3000/cat/showsub/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            })
            .then((res) => res.json())
            .then((res) => {document.querySelectorAll('.catpro')[i].innerHTML = res.category[0]['name']});
}



// delete Product

function deleteProduct(id){
    fetch(`http://localhost:3000/pro/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
      })
        .then((res) => res.json())
        .then(()=>location.reload());
}