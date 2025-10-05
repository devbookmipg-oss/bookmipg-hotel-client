import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req) {
  const { amount } = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // amount in paise
    currency: 'INR',
    receipt: 'receipt_order_001',
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
