'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Separator,
} from '@/components/ui';

import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { registerUser, registerSchema } from '@/actions/auth';
import { Loader2 } from 'lucide-react';

const formSchema = registerSchema;

export default function RegisterClient() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const roleFromQuery = searchParams.get('role');
  const validRoles = ['customer', 'restaurant', 'courier'];
  const defaultRole = (validRoles.includes(roleFromQuery as string) ? roleFromQuery : 'customer') as
    | 'customer'
    | 'restaurant'
    | 'courier';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: defaultRole,
      address: '',
      customerPhoneNumber: '',
      restaurantName: '',
      postalCode: '',
      latitude: '',
      longitude: '',
      restaurantPhoneNumber: '',
      courierPhoneNumber: '',
      vehicleType: '',
      licensePlate: '',
      vehicleColor: '',
      photoUrl: '',
    },
  });

  const role = form.watch('role');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await registerUser(values);
      if (result.success) {
        toast({
          title: 'Pendaftaran Berhasil',
          description: 'Akun Anda telah berhasil dibuat.',
        });
        router.push('/auth/login');
      } else {
        toast({
          variant: 'destructive',
          title: 'Pendaftaran Gagal',
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Terjadi Kesalahan',
        description: 'Tidak dapat mendaftar saat ini. Silakan coba lagi nanti.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader className="text-center">
        <Link href="/" className="inline-block mb-4">
          <Image src="/images/logo.png" alt="Serenity Logo" width={80} height={80} className="mx-auto mix-blend-multiply" />
        </Link>
        <CardTitle className="text-2xl font-bold font-headline">Buat Akun</CardTitle>
        <CardDescription>Isi formulir di bawah ini untuk memulai.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Role selection, etc. */}
            {/* Seluruh isi form yang tadi kamu buat: copy-paste dari kode kamu */}
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="underline">
            Masuk
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
