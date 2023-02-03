document.getElementById('username').innerHTML ='Welcome '+ localStorage.getItem('username')
let token = localStorage.getItem("token");

// if(!token) {
//     window.location.replace('google.com')
// } else {
    let username = document.getElementById('name')
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    let phone = document.getElementById('phone')
    let gender = document.getElementById('gender')
    let image = document.getElementById('image')
    let addUser = document.getElementById('addUser')
    let showErrors = document.getElementById('showErrors')
    let validRegex = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
    addUser.addEventListener('click',()=>{
        // Validation on form
        errors = []
        // name validation
        if(username.value == ''){errors['name'] = '* Name cant be empty'}
        else if(username.value.length < 3){errors['name'] = '* Name shuld be greater than 3 character'}
         // password validation
        if(password.value == ''){errors['password'] = '* password cant be empty'}
        else if(password.value.length < 4){errors['password'] = '* password shuld be greater than 4 character'}
        // password validation
        if(email.value == ''){errors['email'] = '* email cant be empty'}
        else if(email.value.match(validRegex)){errors['email'] = '* email shuld be valid'}
        // Phone validation
        if(phone.value == ''){errors['email'] = '* phone cant be empty'}
        else if(phone.value.match("/^\d{10}$/")){errors['phone'] = '* phone shuld be valid'}
        // gender validation
        if(gender.value == ''){errors['gender'] = '* choose your gender'}

        if(Object.keys(errors).length === 0 ){
            // console.log(errors);
            fetch('http://localhost:3000/user/addAdmin', {
                method:'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                     Authorization: token,
                },
                body: JSON.stringify({
                    "name" : username.value,
                    "email" : email.value,
                    "phone" : phone.value,
                    "password" : password.value,
                    "gender":gender.value,
                    // "image" :image.value
                })
            }) 
            .then(res=>res.json())
            .then(data=>{
                if(data.apiStatus == true){
                    console.log(data);
                    window.location.href = '../showusers/showusers.html';
                }else {
                    console.log(data);
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
    // console.log(username.value,email.value,password.value,phone.value,gender.value,image.value);
    })
// }
