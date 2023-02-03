token = localStorage.getItem("token");
url = "http://localhost:3000/cat/show";
{/* <button class="btn" onclick='showsub("${c.cat.category._id}")' type="button" data-toggle="collapse" data-target="#'${c.cat.category.name}'" aria-expanded="false" aria-controls="collapseExample">
    ${c.cat.category.name}
    </button>

    <div class="collapse" id="'${c.cat.category.name}'">
        <p class='showSub'></p>
  </div>  */}
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
    <tr>
    <td>${index+1}</td>
    <td>    
    ${c.name}
    </td>
    <td><a href="../editcat/editcat.html?${c._id}" class="btn btn-info m-2 p-2"><i class="fas fa-pencil-alt">
    </i> Edit</a>
    <a href="#" class="btn btn-danger" onclick="deleteCat('${c._id}')"> <i class="fas fa-trash">
    </i> Delet</a></td>
  </tr>
    `;
  });

}
// show sub category
// function showsub(id){
// let showSub = document.querySelectorAll('.showSub')

//    fetch(`http://localhost:3000/cat/showsub/${id}`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: token,
//             },
//           })
//             .then((res) => res.json())
//             .then((res) => {
//                 if(res.cat.length > 0){
//                     for (sCat in res.cat) {
//                         showSub[sCat].innerHTML = ''
//                         showSub[sCat].innerHTML +=   `<ul class="list-group">
//                         <li class="list-group-item ">${ res.cat[sCat].name}
//                         <a href="../editcat/editcat.html?${res.cat[sCat]._id}" class="btn btn-info mx-4"><i class="fas fa-pencil-alt">
//                            </i> Edit</a>
//                         <a href="#" class="btn btn-danger mx-4" onclick="deleteCat('${res.cat[sCat]._id}')"> <i class="fas fa-trash">
//                          </i> Delet</a>
//                         </li>
//                       </ul>`
//                     }
//                 }
//             })
            
// }
// delete Category

function deleteCat(id){
    fetch(`http://localhost:3000/cat/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
      })
        .then((res) => res.json())
        .then(()=>location.reload());
}