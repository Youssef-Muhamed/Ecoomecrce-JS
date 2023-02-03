
// console.log(JSON.parse(localStorage.getItem('myFave')));
JSON.parse(localStorage.getItem('myFave')).filter((p,i)=>{
console.log(p);
    defaultImg = 'default.jpg'
    if(p.pro.images.length){
        p.pro.images.forEach((img)=>{defaultImg = img.image})
    } else {defaultImg}

    document.getElementById('favs').innerHTML +=`
    <div class="row">
                        
    <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            <!-- Image -->
                            <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                            <img src = "../../e-commerce/uploads/products/${defaultImg}"
                                    class="w-100" />
                                
                            </div>
                            <!-- Image -->
                        </div>
                        <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            <!-- Data -->
                            <p><strong>${p.pro.name}</strong></p>
                            <p>${p.pro.description}</p>
                            <!-- Price -->
                            <p class="text-startr">
                                <strong>$17.99</strong>
                            </p>
                            <!-- Price -->
                            <button type="button" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                                title="Remove item text-xl" onclick="del(${i})">
                                <i class="fas fa-trash text-xl"></i>
                            </button>

                            <!-- Data -->
                        </div>
                        </div>
            <hr>
    ` 
    
});

function addToLocalStorage(fave) {
    if(localStorage.getItem("myFave")){
        localStorage.setItem('myFave',JSON.stringify(fave))
    }
}
function del(i){
    myFaves = JSON.parse(localStorage.getItem('myFave'))
    myFaves.splice(i,1);
    addToLocalStorage(myFaves)
    window.location.reload()
}
