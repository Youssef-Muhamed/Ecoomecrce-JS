
let token = localStorage.getItem("token");
let id = location.search.split("?")[1];

let proname = document.getElementById('name')
let description = document.getElementById('description')
let price = document.getElementById('price')
let country_made = document.getElementById('country_made')
let statusPro = document.getElementById('status')
let category = document.getElementById('category')
let image = document.getElementById('image')
let showImage = document.getElementById('showImage')
let addPro = document.getElementById('addPro')
let showErrors = document.getElementById('showErrors')


fetch("http://localhost:3000/cat/show", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => cats(res));
  function cats(data) {

      data.cat.forEach(function (c) {
        category.innerHTML += `<option value="${c._id}">${c.name}</option> `;
    });
  
  }

// Get product
fetch(`http://localhost:3000/pro/singleProduct/${id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
})
  .then((res) => res.json())
  .then(getproduct);

function getproduct(data) {
    proname.value = data.data[0].pro.name;
    description.value = data.data[0].pro.description;
    price.value =  Number(data.data[0].pro.price.split('$')[0]);
    country_made.value =  data.data[0].pro.country_made;
    for(i=0;i<statusPro.length;i++){
        if(statusPro[i].value == data.data[0].pro.status) statusPro[i].setAttribute('selected',null)
    }
    // for(i=0;i<category.length;i++){
    //     // if(category[i].value == data.data[0].pro.catId) category[i].setAttribute('selected',null)
    // }
    defaultImg = 'default.png'
  //   if(p.images.length){
  //     p.images.forEach((img)=>{defaultImg = img.image})
  //  } else {defaultImg}

    if(data.data[0].pro.images.length){
      data.data[0].pro.images.forEach((img)=>{defaultImg = img.image})} 
      else {defaultImg}
    showImage.src = `../../../e-commerce/uploads/products/${defaultImg}`
  }

  addPro.addEventListener("click", () => {
  // Validation on form
  errors = [];
  // name proname
  if (proname.value == "") {errors["name"] = "* Name cant be empty"};
  if (description.value == "") {errors["description"] = "* description cant be empty"};
  if (price.value == "") {errors["price"] = "* price cant be empty"};
  if (country_made.value == "") {errors["country made"] = "* country made cant be empty"};
  if (category.value == "") {errors["category"] = "* category cant be empty"};
  

  if (Object.keys(errors).length === 0) {
    fetch(`http://localhost:3000/pro/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        "name" : proname.value,
        "description":description.value,
        "price":price.value+" $",
        "country_made":country_made.value,
        "status":statusPro.value,
        "tags":"descount",
        "catId":category.value,
        "image" :image.value
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
  formData.append('product', image.files[0]);
  fetch('http://localhost:3000/pro/productImg/'+id, {
      method:'POST',
      headers:
      {
           Authorization: token,
      },
      body: formData,
  }) 
  .then(res=>res.json())
  .then((res) => window.location.href = '../showpro/showpro.html')
}
