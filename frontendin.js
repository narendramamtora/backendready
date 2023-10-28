document.addEventListener('DOMContentLoaded', () => {
    const Email = document.getElementById('email');
    const Password = document.getElementById('password');
    const Login = document.getElementById('login');
    const LoginList = document.getElementById(('loginlist'));

    Login.addEventListener('click', async (event) => {
        event.preventDefault(); 
        const EmailValue = Email.value;
        const PasswordValue = Password.value;

        if ( EmailValue === '' || PasswordValue === '') {
            console.log('Please fill in all the fields');
            return; // Prevent the request if any field is empty
        }
        try {
            const response = await axios.post('http://localhost:3000/user/login', {
                email: EmailValue,
                password: PasswordValue
            });
            if (response.status === 200) {
                console.log(response.data.message);
            } else if (response.status === 201) {
                console.log(response.data.error);
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'User not exists';
                errorMessage.style.color = 'red';
                LoginList.appendChild(errorMessage);
            } else {
                console.log('i am in else');
                console.log('Unexpected status code:', response.status);
            }
        } catch (err) {
            console.error(err);
        }
    });
});
