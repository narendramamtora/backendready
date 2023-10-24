document.addEventListener('DOMContentLoaded', () => {
    const Name = document.getElementById('name');
    const Email = document.getElementById('email');
    const Password = document.getElementById('password');
    const SignUp = document.getElementById('signup');


    SignUp.addEventListener('click', () => {
        const NameValue=Name.value;
        const EmailValue=Email.value;
        const PasswordValue=Password.value; 
        
        axios.post('http://localhost:3000/user/signup', {
            namev:NameValue,
            emailv:EmailValue,
            passwordv:PasswordValue
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Successfully posted a book');
                    fetchBooks();
                } else {
                    console.log('Unexpected status code:', response.status);
                }
            })
            .catch(err => console.error(err));
    });
});
