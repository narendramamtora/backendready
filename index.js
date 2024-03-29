const Sib=require('sib-api-v3-sdk')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
const linkid= uuidv4();
const sendResetEmail = (EEmail) => {
const client =Sib.ApiClient.instance

console.log('first and from index.js',linkid);
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY
const tranEmailApi=new Sib.TransactionalEmailsApi()
const sender={
    email:'narendramamtora91@gmail.com',
    name:'Narendra Mamtora Admin'
}
const receivers=[
    {
        email:EEmail
    }
]
tranEmailApi.sendTransacEmail({
    sender,
    to:receivers,
    subject:"Reset your password",
    textContent:`
    click in this link {{params.role}} to reset your password
    `,
    params:{
        role:`http://localhost:3000/password/resetpassword/${linkid}`
    }
})
};

module.exports ={sendResetEmail,linkid} ;