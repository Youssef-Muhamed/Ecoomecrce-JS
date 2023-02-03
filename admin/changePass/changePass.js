token = localStorage.getItem('token')
email = document.getElementById('inputEmail3')
password = document.getElementById('inputPassword3')
submmit = document.getElementById('btn-submit')
alertMessage = document.getElementById('alert')
url = 'http://localhost:3000/user/changePass'

submmit.addEventListener('click',(e)=>{
    fetch(url, {
        method:'POST',
        headers:
        {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({
            "email" : email.value,
            "password" : password.value,        
        })
    }) 
    .then(res=>res.json())
    .then(data=>{
        if(data.apiStatus){
            window.location.href = '../login/login.html'
            
        } else {
            alertMessage.innerHTML = `<div class="alert alert-danger" role="alert">
            Email Or Password Invalid !!
          </div>`
        }
    });
})

