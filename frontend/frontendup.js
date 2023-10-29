document.addEventListener('DOMContentLoaded', () => {
    const Name = document.getElementById('name');
    const Email = document.getElementById('email');
    const Password = document.getElementById('password');
    const SignUp = document.getElementById('signup');
    const UserList = document.getElementById(('userlist'));

    SignUp.addEventListener('click', async (event) => {
        event.preventDefault(); 
        const NameValue = Name.value;
        const EmailValue = Email.value;
        const PasswordValue = Password.value;

        if (NameValue === '' || EmailValue === '' || PasswordValue === '') {
            console.log('Please fill in all the fields');
            return; 
        }
        try {
            const response = await axios.post('http://localhost:3000/user/signup', {
                name: NameValue,
                email: EmailValue,
                password: PasswordValue
            });
            if (response.status === 200) {
                console.log(response.data.message);
            } else if (response.status === 201) {
                console.log(response.data.error);
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'User already exists status code 403';
                errorMessage.style.color = 'red';
                UserList.appendChild(errorMessage);
            } else {
                console.log('i am in else');
                console.log('Unexpected status code:', response.status);
            }
        } catch (err) {
            console.error(err);
        }
    });
});
