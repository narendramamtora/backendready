const Sib=require('sib-api-v3-sdk')
require('dotenv').config()

const sendResetEmail = (EEmail) => {
const client =Sib.ApiClient.instance
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
    if {{params.role}} you forget the password then you can reset from here
    `,
    params:{
        role:'Frontend'
    }
})
};

module.exports =sendResetEmail ;