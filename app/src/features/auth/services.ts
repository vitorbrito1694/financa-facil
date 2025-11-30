import { appClient } from '@/lib/api-client';

export const sendLoginCode = async (email: string) => {
  return await appClient('/auth/send-code', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const verifyCode = async (email: string, code: string) => {
  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/auth/verify-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, code }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to verify code');
  }

  const cookie = response.headers.get('Set-Cookie');
  const data = await response.json();

  return { data, cookie };
};
