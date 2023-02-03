token = localStorage.getItem("token");
url = "http://localhost:3000/user/all";

fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
})
  .then((res) => res.json())
  .then((res) => users(res));
function users(data) {
allUsers = document.getElementById("users");

  data.data.forEach(function (user,index) {
    regDate = user.createdAt.split('T')[0]
    defaultImg = 'default.png'
    if(user.image !== ''){defaultImg = user.image} else {defaultImg}
    allUsers.innerHTML += `
    <tr>
    <td>${index+1}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.phone}</td>
    <td>${user.type}</td>
    <td>${regDate}</td>
    <td><img width="50" height= "50" src="../../../e-commerce/uploads/users/${defaultImg}" /></td>
    <td><a href="../edituser/edituser.html?${user._id}" class="btn btn-info m-2 p-2"><i class="fas fa-pencil-alt">
    </i> Edit</a>
    <a href="#" class="btn btn-danger" onclick="deleteuser('${user._id}')"> <i class="fas fa-trash">
    </i> Delet</a></td>
  </tr>
    `;
  });
}


// delete user

function deleteuser(id){
    fetch(`http://localhost:3000/user/del/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
      })
        .then((res) => res.json())
        .then(()=>location.reload());
}