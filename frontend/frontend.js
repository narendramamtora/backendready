document.addEventListener('DOMContentLoaded', () => {
    const Name = document.getElementById('name');
    const Email = document.getElementById('email');
    const Password = document.getElementById('password');
    const SignUp = document.getElementById('signup');
    const UserList=document.getElementById(('userlist'))

    SignUp.addEventListener('click', () => {
        const NameValue=Name.value;
        const EmailValue=Email.value;
        const PasswordValue=Password.value; 
        
        axios.post('http://localhost:3000/user/signup', {
            name:NameValue,
            email:EmailValue,
            password:PasswordValue
        })
            .then(response => {
                console.log('let me check if the console is working');
                if (response.status === 200) {  
                    console.log('email added');
                    const doneMessage = document.createElement('div');
                    doneMessage.textContent = 'Email is added';
                    doneMessage.style.color = 'blue';
                    UserList.appendChild(doneMessage);
                  
                }else if(response.status === 403){
                    console.log('email is already used');
                  const errorMessage = document.createElement('div');
                    errorMessage.textContent = 'User already exists';
                    errorMessage.style.color = 'red';
                    UserList.appendChild(errorMessage);
                }
                
                
                else {
                    console.log('Unexpected status code:', response.status);
                }
            })
            .catch(err => console.error(err));
    });
});