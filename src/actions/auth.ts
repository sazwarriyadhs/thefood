
'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['customer', 'restaurant', 'courier']),
});

export async function registerUser(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: 'Input tidak valid.' };
  }

  const { name, email, password, role } = validatedFields.data;

  try {
    // Periksa apakah pengguna sudah ada
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return { success: false, message: 'Email sudah terdaftar.' };
    }

    // Hash kata sandi
    const hashedPassword = await bcrypt.hash(password, 10);

    // Masukkan pengguna baru ke database
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
      [name, email, hashedPassword, role]
    );

    return { success: true, message: 'Pengguna berhasil dibuat.' };
  } catch (error) {
    console.error('Kesalahan pendaftaran:', error);
    return { success: false, message: 'Terjadi kesalahan pada server.' };
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
