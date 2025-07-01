
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Utensils, ChefHat, ArrowLeft, ShoppingCart } from 'lucide-react';

import { allRestaurants } from '@/lib/restaurant-data';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function RestaurantDetailPage() {
  const params = useParams();
  const { slug } = params;
  const { toast } = useToast();

  const restaurant = allRestaurants.find((r) => r.slug === slug);

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Restoran tidak ditemukan</h1>
          <p className="text-muted-foreground">Restoran yang Anda cari tidak ada.</p>
           <Button asChild className="mt-4">
              <Link href="/restaurants">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Restoran
              </Link>
            </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = (itemName: string) => {
    toast({
      title: "Ditambahkan ke Keranjang",
      description: `${itemName} telah ditambahkan ke keranjang belanja Anda.`,
    });
    // Di masa mendatang, di sini Anda akan menambahkan logika untuk manajemen state keranjang belanja.
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button asChild variant="outline">
              <Link href="/restaurants">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Restoran
              </Link>
            </Button>
          </div>

          <Card className="overflow-hidden shadow-lg">
            <div className="relative h-64 w-full">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint={restaurant.hint}
              />
            </div>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">{restaurant.category}</Badge>
              <CardTitle className="text-4xl font-headline">{restaurant.name}</CardTitle>
              {restaurant.address && (
                <CardDescription className="flex items-center pt-2 text-base">
                  <MapPin className="w-5 h-5 mr-2" />
                  {restaurant.address}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {restaurant.menu && restaurant.menu.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold font-headline mb-4 flex items-center">
                    <Utensils className="w-6 h-6 mr-3 text-primary" />
                    Menu
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurant.menu.map((item, index) => (
                      <div key={index} className="p-4 bg-background rounded-lg border flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-muted-foreground">Rp {item.price}</p>
                        </div>
                        <Button size="sm" onClick={() => handleAddToCart(item.name)}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Tambah
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <ChefHat className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">Menu Segera Hadir</h3>
                  <p className="mt-1 text-muted-foreground">
                    Restoran ini belum mempublikasikan menunya. Silakan periksa kembali nanti.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
