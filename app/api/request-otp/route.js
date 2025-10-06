import { NextResponse } from 'next/server';
import axios from 'axios';
import { redis } from '@/lib/redis';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get('number');

  if (!number) {
    return NextResponse.json(
      { success: false, message: 'Phone number required' },
      { status: 400 }
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const limitKey = `limit:${number}`;
  const otpKey = `otp:${number}`;

  // Rate limit: allow 5 OTP requests per hour
  const currentCount = await redis.incr(limitKey);
  if (currentCount === 1) {
    await redis.expire(limitKey, 3600); // 1 hour
  }

  if (currentCount > 5) {
    return NextResponse.json(
      { success: false, message: 'Too many OTP requests. Please try later.' },
      { status: 429 }
    );
  }

  await redis.set(otpKey, otp, { ex: 300 }); // 5 minutes

  const message = `Dear customer, use this One Time Password ${otp} to log in to your Bookmipg Hotel account. This OTP will be valid for the next 5 mins.`;
  const SMSAPIKEY = process.env.ACCOUNT_KEY;
  const SMSSENDERID = process.env.SENDER_ID;
  const SMSTEMPLATEID = process.env.OTP_TEMPLATE_ID;

  await axios.get(
    ` http://site.ping4sms.com/api/smsapi?key=${SMSAPIKEY}&route=2&sender=${SMSSENDERID}&number=${number}&sms=${encodeURIComponent(
      message
    )}&templateid=${SMSTEMPLATEID}`
  );

  return NextResponse.json({ success: true, message: 'OTP sent' });
}
