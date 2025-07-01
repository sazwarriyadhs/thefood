
'use client';

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChefHat,
  MapPin,
  ClipboardList,
  Truck,
  Star,
  Pizza,
  Beef,
  Fish,
  Soup,
  Search,
  Bike,
  Loader2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MapLoader from "@/components/map-loader";
import { suggestRestaurants } from "@/ai/flows/restaurant-suggester-flow";
import { allRestaurants } from "@/lib/restaurant-data";
import type { Restaurant } from "@/lib/restaurant-data";

type DisplayRestaurant = Restaurant & {
  reason?: string;
};


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedRestaurants, setDisplayedRestaurants] = useState<DisplayRestaurant[]>(allRestaurants);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiSearch, setIsAiSearch] = useState(false);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setAiMessage(null);
    setIsAiSearch(true);

    try {
      const restaurantDataForAI = allRestaurants.map(({ name, category }) => ({ name, category }));
      const result = await suggestRestaurants({
        query: searchQuery,
        restaurants: restaurantDataForAI,
      });

      if (result && result.suggestions.length > 0) {
        setAiMessage(result.responseMessage);
        const suggestedRestaurantMap = new Map(
          result.suggestions.map(s => [s.name, s.reason])
        );

        const newDisplayedRestaurants = allRestaurants
          .filter(resto => suggestedRestaurantMap.has(resto.name))
          .map(resto => ({
            ...resto,
            reason: suggestedRestaurantMap.get(resto.name),
          }));
        
        setDisplayedRestaurants(newDisplayedRestaurants);
      } else {
        setAiMessage("Maaf, saya tidak dapat menemukan restoran yang cocok. Coba kata kunci lain.");
        setDisplayedRestaurants([]);
      }
    } catch (error) {
      console.error("AI search failed:", error);
      setAiMessage("Oops! Terjadi kesalahan saat mencari. Silakan coba lagi.");
      setDisplayedRestaurants([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetSearch = () => {
    setDisplayedRestaurants(allRestaurants);
    setSearchQuery("");
    setAiMessage(null);
    setIsAiSearch(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative bg-secondary/50 py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <Image
              src="/images/logo.png"
              alt="Serenity Logo"
              width={120}
              height={120}
              className="mx-auto mb-6 mix-blend-multiply"
            />
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Temukan makanan Anda berikutnya dengan Serenity
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Temukan restoran lokal dan dapatkan makanan favorit Anda diantar langsung ke pintu Anda.
            </p>
            <div className="mt-8 max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent" />
                  <Input
                    type="text"
                    placeholder="Cari dengan AI: 'masakan sunda pedas'..."
                    className="pl-10 h-12 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 text-base" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Search className="mr-2" /> Cari
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold">Bagaimana Caranya</h2>
              <p className="text-muted-foreground mt-2">Dapatkan makanan Anda dalam 3 langkah mudah.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Pilih Restoran</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Jelajahi ratusan restoran dan menu lokal.</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    <ClipboardList className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Pesan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Tambahkan hidangan favorit Anda ke troli dan checkout dengan aman.</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Diantar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Lacak pesanan Anda secara real-time dan nikmati makanan Anda.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="featured" className="bg-secondary/50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold">
                {isAiSearch ? "Hasil Pencarian AI" : "Restoran Unggulan"}
              </h2>
               {aiMessage && (
                  <p className="text-muted-foreground mt-2 bg-primary/10 p-3 rounded-md border border-primary/20">
                    <Sparkles className="inline-block w-4 h-4 mr-2 text-accent" />{aiMessage}
                  </p>
              )}
               {!aiMessage && !isAiSearch && (
                 <p className="text-muted-foreground mt-2">Pilihan tempat makan terbaik yang dipilih sendiri.</p>
               )}
               {isAiSearch && (
                <Button onClick={resetSearch} variant="link" className="mt-2">
                  Tampilkan semua restoran
                </Button>
               )}
            </div>
             {displayedRestaurants.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {displayedRestaurants.slice(0, 12).map((resto) => (
                    <Link key={resto.slug} href={`/restaurants/${resto.slug}`} className="flex">
                      <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col h-full w-full">
                        <CardContent className="p-0 flex flex-col flex-grow">
                          <Image src={resto.image} alt={resto.name} width={600} height={400} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={resto.hint} />
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-headline text-xl font-semibold">{resto.name}</h3>
                            <p className="text-muted-foreground">{resto.category}</p>
                            <div className="flex-grow mt-2">
                                {resto.reason && (
                                    <p className="text-sm text-primary/80 bg-primary/5 p-2 rounded-md border border-primary/10 h-full">
                                        <Sparkles className="inline-block w-4 h-4 mr-1 text-accent" />
                                        <span className="font-semibold">Saran AI:</span> {resto.reason}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center mt-2 pt-2 border-t border-dashed">
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <Star className="w-5 h-5 text-yellow-400/50 fill-current" />
                              <span className="ml-2 text-sm text-muted-foreground">4.5 (120)</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <p>Tidak ada restoran yang ditampilkan. Coba hapus pencarian untuk melihat semua restoran.</p>
                </div>
            )}
          </div>
        </section>

        <section id="map" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold">Temukan Kami di Dekat Anda</h2>
              <p className="text-muted-foreground mt-2">Jelajahi restoran di peta.</p>
            </div>
            <MapLoader />
          </div>
        </section>

        <section id="categories" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold">Kategori Populer</h2>
              <p className="text-muted-foreground mt-2">Jelajahi makanan dari berbagai kategori.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Pizza", icon: Pizza },
                { name: "Burgers", icon: Beef },
                { name: "Sushi", icon: Fish },
                { name: "Soups", icon: Soup },
              ].map((cat) => (
                <Link key={cat.name} href="#" className="block">
                  <div className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-300">
                    <cat.icon className="h-10 w-10 mb-2" />
                    <span className="font-semibold">{cat.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="partner" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="font-headline text-3xl font-bold">Jadi Mitra Restoran</h2>
                <p className="mt-4 text-muted-foreground max-w-lg mx-auto md:mx-0">
                  Kembangkan bisnis Anda dan jangkau lebih banyak pelanggan dengan bergabung di platform kami. Daftarkan restoran Anda dan lihat pesanan Anda bertambah.
                </p>
                <Button asChild size="lg" className="mt-6">
                  <Link href="/auth/register?role=restaurant">Daftarkan Restoran Anda</Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/mitraresto.png"
                  alt="Restaurant owner smiling"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="restaurant owner"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="courier" className="bg-secondary/50 py-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 flex justify-center">
                        <Image
                            src="/images/serenitcourier.png"
                            alt="Courier on a mobile phone"
                            width={500}
                            height={400}
                            className="rounded-lg shadow-xl"
                            data-ai-hint="delivery scooter"
                        />
                    </div>
                    <div className="order-1 md:order-2 text-center md:text-left">
                        <h2 className="font-headline text-3xl font-bold">Jadilah Kurir Mobile</h2>
                        <p className="mt-4 text-muted-foreground max-w-lg mx-auto md:mx-0">
                            Dapatkan penghasilan fleksibel dengan menjadi mitra kurir kami. Antar pesanan dan dapatkan bayaran sesuai jadwal Anda.
                        </p>
                        <Button asChild size="lg" className="mt-6">
                            <Link href="/auth/register?role=courier">Gabung Sekarang</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
