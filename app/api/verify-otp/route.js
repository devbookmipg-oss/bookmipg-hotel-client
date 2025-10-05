import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(req) {
  const { phone, otp } = await req.json();

  if (!phone || !otp) {
    return NextResponse.json(
      { success: false, message: 'Missing fields' },
      { status: 400 }
    );
  }

  const storedOtp = await redis.get(`otp:${phone}`);
  if (!storedOtp) {
    return NextResponse.json(
      { success: false, message: 'OTP expired or not found' },
      { status: 400 }
    );
  }

  if (storedOtp != otp) {
    return NextResponse.json(
      { success: false, message: 'Invalid OTP' },
      { status: 400 }
    );
  }

  await redis.del(`otp:${phone}`);

  // Normally you’d issue a JWT here
  return NextResponse.json({
    success: true,
    message: 'OTP verified successfully',
  });
}
