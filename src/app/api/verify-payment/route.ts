import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature found' }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(body);
    const { payment_id, order_id, status } = payload.payload.payment.entity;

    if (status === 'captured') {
      // Update user's subscription status in Firebase
      // You'll need to store the user ID with the order ID when creating the order
      const orderRef = doc(db, 'orders', order_id);
      const orderDoc = await getDoc(orderRef);

      if (orderDoc.exists()) {
        const { userId } = orderDoc.data();
        const userRef = doc(db, 'users', userId);

        await updateDoc(userRef, {
          isPremium: true,
          subscriptionDetails: {
            paymentId: payment_id,
            orderId: order_id,
            subscribedAt: new Date().toISOString(),
            status: 'active',
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
