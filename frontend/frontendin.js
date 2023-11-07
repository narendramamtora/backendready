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
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/user/login', {
                email: EmailValue, 
                password: PasswordValue 
            });
            if (response.status === 200) {
                const alertMessage = response.data.alert;
                console.log(response.data.alert);
                window.alert(alertMessage);
                localStorage.setItem('token',response.data.token)
               window.location.href = 'file:///F:/javascript/01%20Expense%20Tracker%20-%20Node.js%20Project/frontend/expense.html';
            } else if (response.status === 203) {
                console.log(response.data.message);
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'password is not correct status code 404';
                errorMessage.style.color = 'red';
                LoginList.appendChild(errorMessage);
            } else if (response.status === 204) {
                console.log(response.data.message);
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'user not found status code 404';
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
