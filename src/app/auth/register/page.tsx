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
import Image from 'next/image';
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
    <div className="flex items-center justify-center min-h-screen bg-secondary/50 py-8">
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
                        {['customer', 'restaurant', 'courier'].map((r) => (
                          <FormItem key={r}>
                            <RadioGroupItem value={r} id={r} className="peer sr-only" />
                            <FormLabel htmlFor={r} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                              {r === 'customer' ? 'Pelanggan' : r === 'restaurant' ? 'Restoran' : 'Kurir'}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Detail Akun Dasar</h3>
                {['name', 'email', 'password'].map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as 'name' | 'email' | 'password'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{fieldName === 'name' ? 'Nama Lengkap' : fieldName === 'email' ? 'Email' : 'Kata Sandi'}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={fieldName === 'email' ? 'email@contoh.com' : fieldName === 'password' ? '********' : 'Nama Anda'}
                            type={fieldName === 'password' ? 'password' : 'text'}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {role === 'customer' && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Detail Pelanggan</h3>
                    {['address', 'customerPhoneNumber', 'photoUrl'].map((fieldName) => (
                      <FormField
                        key={fieldName}
                        control={form.control}
                        name={fieldName as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{fieldName === 'address' ? 'Alamat Lengkap' : fieldName === 'customerPhoneNumber' ? 'Nomor Telepon' : 'URL Foto Profil'}</FormLabel>
                            <FormControl>
                              <Input placeholder={`Masukkan ${fieldName}`} {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </>
              )}

              {role === 'restaurant' && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Detail Restoran</h3>
                    {[
                      { name: 'restaurantName', label: 'Nama Restoran' },
                      { name: 'address', label: 'Alamat Lengkap' },
                      { name: 'postalCode', label: 'Kode Pos' },
                      { name: 'restaurantPhoneNumber', label: 'Nomor Telepon Restoran' },
                      { name: 'photoUrl', label: 'URL Foto Restoran' },
                    ].map(({ name, label }) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Input placeholder={label} {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                      {['latitude', 'longitude'].map((coord) => (
                        <FormField
                          key={coord}
                          control={form.control}
                          name={coord as 'latitude' | 'longitude'}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{coord.charAt(0).toUpperCase() + coord.slice(1)}</FormLabel>
                              <FormControl>
                                <Input placeholder={coord === 'latitude' ? '-6.2' : '106.8'} {...field} disabled={isLoading} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {role === 'courier' && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Detail Kurir</h3>
                    {[
                      { name: 'courierPhoneNumber', label: 'Nomor Telepon Anda' },
                      { name: 'vehicleType', label: 'Jenis Kendaraan' },
                      { name: 'licensePlate', label: 'Nomor Plat Kendaraan' },
                      { name: 'vehicleColor', label: 'Warna Kendaraan' },
                      { name: 'photoUrl', label: 'URL Foto Profil' },
                    ].map(({ name, label }) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Input placeholder={label} {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
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
