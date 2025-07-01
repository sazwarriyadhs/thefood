
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { registerUser, registerSchema } from '@/actions/auth';
import { Loader2 } from 'lucide-react';
import Image from "next/image";
import { Separator } from '@/components/ui/separator';

const formSchema = registerSchema;

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const roleFromQuery = searchParams.get('role');
  const validRoles = ['customer', 'restaurant', 'courier'];
  const defaultRole = (validRoles.includes(roleFromQuery as string) ? roleFromQuery : 'customer') as 'customer' | 'restaurant' | 'courier';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: defaultRole,
      restaurantName: '',
      address: '',
      restaurantPhoneNumber: '',
      courierPhoneNumber: '',
      vehicleType: '',
      licensePlate: '',
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
    <div className="flex items-center justify-center min-h-screen bg-secondary/50 py-8">
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader className="text-center">
             <Link href="/" className="inline-block mb-4">
               <Image src="/images/logo.png" alt="Serenity Logo" width={80} height={80} className="mx-auto mix-blend-multiply" />
            </Link>
          <CardTitle className="text-2xl font-bold font-headline">Buat Akun</CardTitle>
          <CardDescription>
            Isi formulir di bawah ini untuk memulai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Daftar sebagai</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-2"
                        disabled={isLoading}
                      >
                        <FormItem>
                          <RadioGroupItem value="customer" id="customer" className="peer sr-only" />
                          <FormLabel htmlFor="customer" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            Pelanggan
                          </FormLabel>
                        </FormItem>
                         <FormItem>
                          <RadioGroupItem value="restaurant" id="restaurant" className="peer sr-only" />
                          <FormLabel htmlFor="restaurant" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            Restoran
                          </FormLabel>
                        </FormItem>
                         <FormItem>
                          <RadioGroupItem value="courier" id="courier" className="peer sr-only" />
                          <FormLabel htmlFor="courier" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            Kurir
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Detail Akun Dasar</h3>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Anda" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@contoh.com"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata Sandi</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {role === 'restaurant' && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Detail Restoran</h3>
                    <FormField
                      control={form.control}
                      name="restaurantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Restoran</FormLabel>
                          <FormControl>
                            <Input placeholder="Sari Nusantara" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat Restoran</FormLabel>
                          <FormControl>
                            <Input placeholder="Jl. Raya No. 123" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="restaurantPhoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor Telepon Restoran</FormLabel>
                          <FormControl>
                            <Input placeholder="08123456789" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {role === 'courier' && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Detail Kurir</h3>
                    <FormField
                      control={form.control}
                      name="courierPhoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor Telepon Anda</FormLabel>
                          <FormControl>
                            <Input placeholder="08987654321" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jenis Kendaraan</FormLabel>
                          <FormControl>
                            <Input placeholder="Motor Vario 150" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor Plat Kendaraan</FormLabel>
                          <FormControl>
                            <Input placeholder="B 1234 ABC" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full !mt-8" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Daftar'}
              </Button>
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
    </div>
  );
}
