let catname = document.getElementById('name')
let parentDiv = document.getElementById('parent')
let addCat = document.getElementById('addCat')
let token = localStorage.getItem("token");
url = "http://localhost:3000/cat/show";

// fetch(url, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: token,
//   },
// })
//   .then((res) => res.json())
//   .then((res) => res.allcat.forEach(cat=> {
//     if(cat.parent ==0){
//         parentDiv.innerHTML += `<option value="${cat._id}" >${cat.name}</option>`
//     }
// }));

addCat.addEventListener('click',()=>{
    fetch('http://localhost:3000/cat/add', {
                method:'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                     Authorization: token,
                },
                body: JSON.stringify({
                    "name" : catname.value,
                    // "parent":parentDiv.value
                })
            })
            .then(res=>res.json())
            .then((res)=>window.location.href = '../showcat/showcat.html')
})