let id = location.search.split("?")[1];
let token = localStorage.getItem("token");
let catName = document.getElementById('name')
let parentDiv = document.getElementById('parent')
let opParent = document.querySelector('.opParent')
let editCat = document.getElementById('editCat')

url = "http://localhost:3000/cat/show";

fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => res.cat.forEach(cat=> {
        
        if(cat._id ==id){
            catName.value = cat.name
        }
        // if(cat.parent == 0){
        //     parentDiv.innerHTML += `<option value="${cat._id}" class="opchild" >${cat.name}</option>`
        // }
  }));

  editCat.addEventListener('click',()=>{
    fetch(`http://localhost:3000/cat/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name: catName.value,
        // parent: parentDiv.value,
      }),
    })
    .then((res) => res.json())
    .then((res)=>{
        if(res.apiStatus){
            location.href = '../showcat/showcat.html'
        }
    })
  })