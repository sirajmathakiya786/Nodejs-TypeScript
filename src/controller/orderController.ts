import { Request, Response } from 'express';
import { handleErrorResponse } from "../services/commonService";
import razorpay from '../services/razorPayInstance';
import Order from '../model/order';
import { StatusCodes } from 'http-status-codes';
import { message } from '../services/ResponseMessage';
import crypto from 'crypto';

const createOrder = async(req: Request,res: Response)=>{
    try {
        const { amount } = req.body;
        const options = {
            amount: amount*100,
            currency: 'INR',
            receipt: 'order_receipt_' + Date.now(),
        }
        const order = await razorpay.orders.create(options)
                
        const newOrder = new Order({
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            //paymentId: paymentId
        })
        await newOrder.save();
        return res.status(201).send({ status: StatusCodes.CREATED, message:message.ORDER_CREATED, data: newOrder});
    } catch (error) {
        console.log(error);
        
        return handleErrorResponse(req, res, error as Error);
    }
}


const verifyPayment = async(req: Request, res: Response)=>{
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const order = await Order.findOne({ receipt: razorpay_order_id });
    
        if (!order) {
          return res.status(404).json({ status: StatusCodes.NOT_FOUND, message: 'Order not found' });
        }
    
        const secret = 'HH2pz5aWazW0tkJ5AI8XnZXc';
        const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    
        const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

        if (expectedSignature !== razorpay_signature) {
        return res
            .status(400)
            .json({ status: StatusCodes.BAD_REQUEST, message: 'Invalid Razorpay signature' });
        }
        order.paymentStatus = 'success';
        await order.save();

        return res.status(200).json({
            status: StatusCodes.OK,
            message: 'Payment verified successfully',
            data: order,
        });
      
    } catch (error) {
        return handleErrorResponse(req,res, error as Error);
    }
}
export { createOrder,verifyPayment }