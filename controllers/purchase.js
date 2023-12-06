const Order = require('../models/orders');
const Razorpay = require('razorpay');
const User = require('../models/user');

exports.PurchasePre = async (req, res, next) => {
    try {
        console.log('Entering PurchasePre function');
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const amount = 2500;
        const order = await new Promise((resolve, reject) => {
            rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
                if (err) {
                    console.error('Razorpay API Error:', err.error.description, err.error.code);
                    reject(err);
                } else {
                    resolve(order);
                }
            });
        });

        await req.user.createOrder({ orderId: order.id, status: 'PENDING' });
       // console.log('Order created successfully:', order);
       console.log('Exiting PurchasePre function');
        return res.status(201).json({ order, key_id: rzp.key_id });

    } catch (err) {
        console.log('you are in the 10 error', err);
        res.status(403).json({ message: 'something failed', error: err });
    }
}

exports.UpdateTransaction = async (req, res, next) => {
    try {
        const { payment_id, order_id,status } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id} });
     //   console.log('you are in the success block',req.body,order_id,status);
       // if(payment_id.req.body=payment_id){
        console.log();
            await order.update({ paymentId: payment_id, status: status });
            await req.user.update({ isPremiumUser: true });
            return res.status(202).json({ success: true, message: "transaction DONE" });
    } catch (err) {
        const { payment_id, order_id,status } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id} });
        await order.update({ paymentId: payment_id, status:status });
        console.log('The transaction has failed 1001'); 
        console.log('you are in the 4 error', err);
        res.status(403).json({ message: 'something is wrong 3 ', error: err });
        console.log('you are in the else');
    }
}   
