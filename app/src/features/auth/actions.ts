'use server';

import { redirect } from 'next/navigation';
import { sendLoginCode, verifyCode } from './services';
import { cookies } from 'next/headers';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'Email is required' };
  }

  try {
    await sendLoginCode(email);
  } catch (error: any) {
    return { error: error.message || 'Failed to send code' };
  }

  redirect(`/verify?email=${encodeURIComponent(email)}`);
}

export async function verifyAction(prevState: any, formData: FormData) {
  const code = formData.get('code') as string;
  const email = formData.get('email') as string;

  if (!code || !email) {
    return { error: 'Código e Email são obrigatórios' };
  }

  try {
    const { cookie } = await verifyCode(email, code);

    if (cookie) {
      const [nameValue] = cookie.split(';');
      const [name, value] = nameValue.split('=');

      cookies().set({
        name,
        value,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      });
    }
  } catch (error: any) {
    return { error: error.message || 'Falha ao verificar código' };
  }

  redirect('/dashboard');
}

export async function logoutAction() {
  cookies().delete('auth');
  redirect('/');
}
