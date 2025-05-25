import { loadScript } from '@/utils/loadScript';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const initializeRazorpay = async (): Promise<boolean> => {
  try {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      throw new Error('Razorpay SDK failed to load');
    }
    return true;
  } catch (error) {
    console.error('Razorpay SDK Error:', error);
    return false;
  }
};

export const createRazorpayOrder = async (amount: number): Promise<string> => {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const initiatePayment = async (
  options: Omit<RazorpayOptions, 'key' | 'order_id'>
): Promise<void> => {
  try {
    const isLoaded = await initializeRazorpay();
    if (!isLoaded) {
      throw new Error('Razorpay SDK failed to load');
    }

    const orderId = await createRazorpayOrder(options.amount);

    const razorpayOptions: RazorpayOptions = {
      ...options,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      order_id: orderId,
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    console.error('Payment initiation error:', error);
    throw error;
  }
};
