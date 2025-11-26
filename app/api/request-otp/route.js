import { NextResponse } from 'next/server';
import axios from 'axios';
import { redis } from '@/lib/redis';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const number = searchParams.get('number');

    if (!number) {
      return NextResponse.json(
        { success: false, message: 'Phone number required' },
        { status: 400 }
      );
    }

    // -------------------------------------------
    // RATE LIMIT: 5 requests per hour
    // -------------------------------------------
    const limitKey = `otp:req:${number}`;
    let currentCount;

    try {
      currentCount = await redis.incr(limitKey);
    } catch {
      currentCount = 1;
      await redis.set(limitKey, 1, { ex: 3600 });
    }

    if (currentCount === 1) {
      await redis.expire(limitKey, 3600);
    }

    if (currentCount > 5) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many OTP requests. Try again after 1 hour.',
        },
        { status: 429 }
      );
    }

    // -------------------------------------------
    // Generate OTP
    // -------------------------------------------
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpKey = `otp:value:${number}`;

    await redis.set(otpKey, otp, { ex: 300 }); // 5 min expiry

    // -------------------------------------------
    // Send SMS
    // -------------------------------------------
    const SMSAPIKEY = process.env.ACCOUNT_KEY;
    const SMSSENDERID = process.env.SENDER_ID;
    const SMSTEMPLATEID = process.env.OTP_TEMPLATE_ID;

    const message = `Dear customer, use this One Time Password ${otp} to log in to your Bookmipg Hotel account. This OTP will be valid for the next 5 mins.`;

    try {
      await axios.get(
        `http://site.ping4sms.com/api/smsapi?key=${SMSAPIKEY}&route=2&sender=${SMSSENDERID}&number=${number}&sms=${encodeURIComponent(
          message
        )}&templateid=${SMSTEMPLATEID}`
      );
    } catch (err) {
      return NextResponse.json(
        { success: false, message: 'Failed to send SMS' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
