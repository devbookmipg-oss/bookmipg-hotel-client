import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(req) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, message: 'Missing phone or OTP' },
        { status: 400 }
      );
    }

    const otpKey = `otp:value:${phone}`;
    const attemptsKey = `otp:attempts:${phone}`;

    // -------------------------------------------
    // Brute-force protection: 5 attempts max
    // -------------------------------------------
    const attempts = await redis.incr(attemptsKey);
    if (attempts === 1) await redis.expire(attemptsKey, 300);

    if (attempts > 5) {
      return NextResponse.json(
        { success: false, message: 'Too many attempts. OTP locked.' },
        { status: 429 }
      );
    }

    // -------------------------------------------
    // Validate OTP
    // -------------------------------------------
    const storedOtp = await redis.get(otpKey);

    if (!storedOtp) {
      return NextResponse.json(
        { success: false, message: 'OTP expired or not found' },
        { status: 400 }
      );
    }

    if (storedOtp.toString() !== otp.toString()) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // -------------------------------------------
    // OTP correct → delete OTP + attempts
    // -------------------------------------------
    await redis.del(otpKey);
    await redis.del(attemptsKey);

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
