email = document.getElementById('inputEmail3')
password = document.getElementById('inputPassword3')
submmit = document.getElementById('btn-submit')
alertMessage = document.getElementById('alert')
url = 'http://localhost:3000/user/admin'

submmit.addEventListener('click',(e)=>{
    fetch(url, {
        method:'POST',
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email" : email.value,
            "password" : password.value,        
        })
    }) 
    .then(res=>res.json())
    .then(data=>{
        if(data.apiStatus){
            localStorage.setItem('token',data.data.token)
            localStorage.setItem('username',data.data.user.name)
            window.location.href = '../index.html'
        } else {
            alertMessage.innerHTML = `<div class="alert alert-danger" role="alert">
            Email Or Password Invalid !!
          </div>`
        }
    });
})

