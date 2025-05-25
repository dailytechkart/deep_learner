'use server';

import { setCookie } from '../utils/cookies';

export async function setPromoStripVisibility(visible: boolean) {
  setCookie('promoStripVisible', visible.toString(), {
    maxAge: 24 * 60 * 60, // 24 hours
  });
  return { success: true };
} 