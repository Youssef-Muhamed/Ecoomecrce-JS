// document.getElementById('username').innerHTML ='Welcome '+ localStorage.getItem('username')
let token = localStorage.getItem("token");
let category = document.getElementById('category')

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
  
    let proname = document.getElementById('name')
    let description = document.getElementById('description')
    let price = document.getElementById('price')
    let country_made = document.getElementById('country_made')
    let statusPro = document.getElementById('status')
    let image = document.getElementById('image')
    let addPro = document.getElementById('addPro')
    let showErrors = document.getElementById('showErrors')


   
    addPro.addEventListener('click',()=>{
        // Validation on form
        showErrors.innerHTML = ''
        errors = []
        // name validation
        if(proname.value == ''){errors['name'] = '* Name cant be empty'}  
        if(description.value == ''){errors['description'] = '* description cant be empty'}  
        if(statusPro.value == ""){errors['status'] = '* status cant be empty'}  
        if(category.value == ''){errors['category'] = '* category cant be empty'}  
       
        if(Object.keys(errors).length === 0 ){
            fetch('http://localhost:3000/pro/add', {
                method:'POST',
                headers:
                {
                    'Content-Type': 'application/json',
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
                })
            }) 
            .then(res=>res.json())
            .then(data=>{
                if(data.apiStatus == true){
                    uploadImg(data.product._id)
                   
                }else {
                    showErrors.innerHTML += `
                    <div class="alert alert-danger" role="alert">
                      ${data.message}
                    </div>
                    `
                }
            });
        } else {
            for( key in errors){
                showErrors.innerHTML += `
                <div class="alert alert-danger" role="alert">
                  ${key}: ${errors[key]} 
                </div>
                `
            }
        }
    })
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
        .then((res)=> window.location.href = '../home/index.html')
    }
