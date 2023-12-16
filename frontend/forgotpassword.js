document.addEventListener('DOMContentLoaded', () => {
    const Email = document.getElementById('email');
    const ForgotP = document.getElementById(('forgotpassword'));
    const MessageList = document.getElementById(('messagelist'));

    ForgotP.addEventListener('click', async (event) => {
        event.preventDefault(); 
        const EmailValue=Email.value; 
        console.log('123456',EmailValue);
        if ( EmailValue === '') {
            console.log('Please fill in all the fields');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/password/forgotpassword', {
                email: EmailValue, 
            });
           if (response.status === 200){
            const SuccessMessage = document.createElement('div');
            SuccessMessage.textContent = 'please check your email to reset the password';
            SuccessMessage.style.color = 'blue';
            MessageList.appendChild(SuccessMessage);
               console.log('we have this mail');
           }else if(response.status === 203) {
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'email did not matched';
            errorMessage.style.color = 'red';
            MessageList.appendChild(errorMessage);
            console.log('we are in the else of frontend forgetpassword');
           }
            else{
            console.log('we are in the else of frontend forgetpassword');
           }
            }
         catch (err) {
            console.log('we do not have this mail');
            console.error(err);
        }
    });
});

