'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useFormState } from 'react-dom';
import { useTransition } from 'react';
import { verifyAction } from './actions';
import { useSearchParams } from 'next/navigation';

export function VerifyForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [state, formAction] = useFormState(verifyAction, { error: '' });
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Verifique seu e-mail</CardTitle>
        <CardDescription>Te enviamos um código de 6 dígitos.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <input type="hidden" name="email" value={email} />
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">Código de verificação</FieldLabel>
              <InputOTP maxLength={6} id="otp" name="code" required>
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>Insira o código enviado por e-mail.</FieldDescription>
            </Field>
            <FieldGroup>
              {state?.error && <p className="text-sm text-destructive text-center">{state.error}</p>}
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Verificando...' : 'Entrar'}
              </Button>
              <FieldDescription className="text-center">
                Não recebeu um código? <a href="#">Reenviar</a>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
