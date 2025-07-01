
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Award, Gift, Percent, Star, Zap } from 'lucide-react';

const promotions = [
  {
    title: 'Diskon 50% Pengguna Baru',
    description: 'Nikmati potongan setengah harga untuk pesanan pertamamu! Berlaku untuk semua restoran.',
    image: 'https://placehold.co/600x400.png',
    hint: 'discount sale',
    cta: 'Klaim Sekarang',
  },
  {
    title: 'Gratis Ongkir Sepuasnya',
    description: 'Pesan makanan favoritmu tanpa khawatir biaya pengiriman. Minimal pemesanan Rp 50.000.',
    image: 'https://placehold.co/600x400.png',
    hint: 'delivery scooter',
    cta: 'Lihat Resto',
  },
  {
    title: 'Cashback 20% Setiap Hari',
    description: 'Dapatkan cashback 20% untuk setiap pesanan yang kamu selesaikan. Maksimal cashback Rp 20.000.',
    image: 'https://placehold.co/600x400.png',
    hint: 'wallet money',
    cta: 'Pesan Sekarang',
  },
   {
    title: 'Paket Bundling Hemat',
    description: 'Pilih paket bundling dari restoran partner dan hemat hingga 30% untuk setiap pesanan.',
    image: 'https://placehold.co/600x400.png',
    hint: 'food platter',
    cta: 'Cek Paketnya',
  },
];

export default function PromotionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Promo & Penawaran Spesial</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Jangan lewatkan diskon, penawaran, dan keuntungan eksklusif dari Serenity Food and Delivery.
            </p>
          </div>
        </section>

        <section id="current-offers" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-headline text-center mb-12">Diskon & Penawaran Terkini</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {promotions.map((promo, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                   <Image
                      src={promo.image}
                      alt={promo.title}
                      width={600}
                      height={400}
                      className="w-full h-56 object-cover"
                      data-ai-hint={promo.hint}
                    />
                  <CardHeader>
                    <CardTitle>{promo.title}</CardTitle>
                    <CardDescription>{promo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">{promo.cta}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="loyalty-program" className="bg-background py-20">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline">Program Loyalitas Serenity</h2>
                    <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                        Kami menghargai setiap pesanan Anda. Bergabunglah dengan program loyalitas kami dan nikmati keuntungan tanpa batas.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <Card className="p-6 border-0 shadow-lg">
                        <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                            <Star className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold font-headline">Kumpulkan Poin</h3>
                        <p className="text-muted-foreground mt-2">Dapatkan poin untuk setiap rupiah yang Anda belanjakan di aplikasi kami.</p>
                    </Card>
                    <Card className="p-6 border-0 shadow-lg">
                        <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                           <Gift className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold font-headline">Tukarkan Hadiah</h3>
                        <p className="text-muted-foreground mt-2">Tukarkan poin Anda dengan diskon, makanan gratis, atau voucher eksklusif.</p>
                    </Card>
                     <Card className="p-6 border-0 shadow-lg">
                        <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                           <Award className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold font-headline">Naik Level</h3>
                        <p className="text-muted-foreground mt-2">Capai level keanggotaan yang lebih tinggi untuk mendapatkan keuntungan yang lebih besar.</p>
                    </Card>
                </div>
                 <div className="text-center mt-12">
                    <Button asChild size="lg">
                        <Link href="/auth/register">Daftar & Mulai Kumpulkan Poin</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
