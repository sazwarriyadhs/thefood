
'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';

const baseSchema = z.object({
  name: z.string().min(2, { message: 'Nama harus memiliki setidaknya 2 karakter.' }),
  email: z.string().email({ message: 'Harap masukkan alamat email yang valid.' }),
  password: z.string().min(6, { message: 'Kata sandi harus memiliki setidaknya 6 karakter.' }),
});

export const registerSchema = z.discriminatedUnion('role', [
  z.object({
    role: z.literal('customer'),
    address: z.string().min(10, { message: 'Alamat lengkap harus diisi.' }),
    customerPhoneNumber: z.string().min(9, { message: 'Nomor telepon harus valid.' }),
    photoUrl: z.string().url({ message: 'URL foto tidak valid.' }).optional().or(z.literal('')),
  }),
  z.object({
    role: z.literal('restaurant'),
    restaurantName: z.string().min(2, { message: 'Nama restoran harus memiliki setidaknya 2 karakter.' }),
    address: z.string().min(10, { message: 'Alamat harus memiliki setidaknya 10 karakter.' }),
    postalCode: z.string().min(5, { message: 'Kode pos harus terdiri dari 5 digit.' }),
    latitude: z.coerce.number().min(-90, 'Latitude tidak valid.').max(90, 'Latitude tidak valid.'),
    longitude: z.coerce.number().min(-180, 'Longitude tidak valid.').max(180, 'Longitude tidak valid.'),
    photoUrl: z.string().url({ message: 'Harap masukkan URL foto yang valid.' }),
    restaurantPhoneNumber: z.string().min(9, { message: 'Nomor telepon harus valid.' }),
  }),
  z.object({
    role: z.literal('courier'),
    courierPhoneNumber: z.string().min(9, { message: 'Nomor telepon harus valid.' }),
    vehicleType: z.string().min(3, { message: 'Jenis kendaraan harus diisi.' }),
    licensePlate: z.string().min(3, { message: 'Nomor plat harus diisi.' }),
    vehicleColor: z.string().min(3, { message: 'Warna kendaraan harus diisi.' }),
    photoUrl: z.string().url({ message: 'Harap masukkan URL foto yang valid.' }),
  }),
]).and(baseSchema);


export async function registerUser(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: 'Input tidak valid.' };
  }

  const { name, email, password, role } = validatedFields.data;
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      await client.query('ROLLBACK');
      return { success: false, message: 'Email sudah terdaftar.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserResult = await client.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, hashedPassword, role]
    );
    const userId = newUserResult.rows[0].id;

    if (validatedFields.data.role === 'customer') {
      const { address, customerPhoneNumber, photoUrl } = validatedFields.data;
      await client.query(
        'INSERT INTO customers (user_id, address, phone_number, photo_url) VALUES ($1, $2, $3, $4)',
        [userId, address, customerPhoneNumber, photoUrl || null]
      );
    } else if (validatedFields.data.role === 'restaurant') {
      const { restaurantName, address, restaurantPhoneNumber, postalCode, latitude, longitude, photoUrl } = validatedFields.data;
      await client.query(
        'INSERT INTO restaurants (user_id, restaurant_name, address, phone_number, postal_code, latitude, longitude, photo_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [userId, restaurantName, address, restaurantPhoneNumber, postalCode, latitude, longitude, photoUrl]
      );
    } else if (validatedFields.data.role === 'courier') {
      const { courierPhoneNumber, vehicleType, licensePlate, vehicleColor, photoUrl } = validatedFields.data;
      await client.query(
        'INSERT INTO couriers (user_id, phone_number, vehicle_type, license_plate, vehicle_color, photo_url) VALUES ($1, $2, $3, $4, $5, $6)',
        [userId, courierPhoneNumber, vehicleType, licensePlate, vehicleColor, photoUrl]
      );
    }

    await client.query('COMMIT');
    return { success: true, message: 'Pengguna berhasil dibuat.' };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Kesalahan pendaftaran:', error);
    return { success: false, message: 'Terjadi kesalahan pada server.' };
  } finally {
    client.release();
  }
}


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginUser(values: z.infer<typeof loginSchema>) {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, message: 'Input tidak valid.' };
    }

    const { email, password } = validatedFields.data;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return { success: false, message: 'Email tidak ditemukan.' };
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return { success: false, message: 'Kata sandi salah.' };
        }

        // Jangan sertakan kata sandi dalam data yang dikembalikan
        const { password: _, ...userWithoutPassword } = user;
        
        return { success: true, user: userWithoutPassword };

    } catch (error) {
        console.error('Kesalahan login:', error);
        return { success: false, message: 'Terjadi kesalahan pada server.' };
    }
}
