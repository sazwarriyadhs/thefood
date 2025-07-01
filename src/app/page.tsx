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
import type { RestaurantSuggestOutput } from "@/ai/flows/restaurant-suggester-flow";

const featuredRestaurants = [
  { name: "Sari Nusantara", category: "Masakan Indonesia", image: "https://placehold.co/600x400.png", hint: "nasi rames" },
  { name: "La Pizzeria", category: "Masakan Italia", image: "https://placehold.co/600x400.png", hint: "wood-fired pizza" },
  { name: "Sakura Sushi Bar", category: "Masakan Jepang", image: "https://placehold.co/600x400.png", hint: "sushi roll" },
  { name: "Big Bite Burgers", category: "Masakan Amerika", image: "https://placehold.co/600x400.png", hint: "cheeseburger fries" },
  { name: "Warung Sunda Asri", category: "Masakan Sunda", image: "https://placehold.co/600x400.png", hint: "nasi liwet" },
  { name: "Rendang Express", category: "Masakan Padang", image: "https://placehold.co/600x400.png", hint: "rendang sapi" },
  { name: "Captain's Catch", category: "Makanan Laut", image: "https://placehold.co/600x400.png", hint: "grilled seafood" },
  { name: "Mie Juara", category: "Mi & Bakso", image: "https://placehold.co/600x400.png", hint: "mie ayam" },
  { name: "Kopi Sudut", category: "Kafe", image: "https://placehold.co/600x400.png", hint: "cappuccino pastry" },
  { name: "Golden Wok", category: "Masakan Cina", image: "https://placehold.co/600x400.png", hint: "kung pao" },
  { name: "El Agave", category: "Masakan Meksiko", image: "https://placehold.co/600x400.png", hint: "tacos burritos" },
  { name: "Bangkok Street", category: "Masakan Thailand", image: "https://placehold.co/600x400.png", hint: "pad thai" },
  { name: "Seoul Garden", category: "Masakan Korea", image: "https://placehold.co/600x400.png", hint: "korean bbq" },
  { name: "Delhi Spice", category: "Masakan India", image: "https://placehold.co/600x400.png", hint: "butter chicken" },
  { name: "Grill House", category: "Steakhouse", image: "https://placehold.co/600x400.png", hint: "ribeye steak" },
  { name: "Dapur Ibu", category: "Masakan Rumahan", image: "https://placehold.co/600x400.png", hint: "home cooking" },
  { name: "Salad Story", category: "Makanan Sehat", image: "https://placehold.co/600x400.png", hint: "fresh salad" },
  { name: "Sweet Treats", category: "Dessert", image: "https://placehold.co/600x400.png", hint: "chocolate cake" },
  { name: "Bebek Renyah", category: "Masakan Bali", image: "https://placehold.co/600x400.png", hint: "crispy duck" },
  { name: "Soto Legendaris", category: "Soto & Sup", image: "https://placehold.co/600x400.png", hint: "soto ayam" },
  { name: "Pasta Fresca", category: "Masakan Italia", image: "https://placehold.co/600x400.png", hint: "handmade pasta" },
  { name: "Ramen Ichiban", category: "Masakan Jepang", image: "https://placehold.co/600x400.png", hint: "tonkotsu ramen" },
  { name: "The Grill Sergeant", category: "Masakan Amerika", image: "https://placehold.co/600x400.png", hint: "bbq ribs" },
  { name: "Saung Kuring", category: "Masakan Sunda", image: "https://placehold.co/600x400.png", hint: "gurame bakar" },
  { name: "Simpang Raya", category: "Masakan Padang", image: "https://placehold.co/600x400.png", hint: "ayam pop" },
  { name: "Crab Shack", category: "Makanan Laut", image: "https://placehold.co/600x400.png", hint: "chilli crab" },
  { name: "Bakso President", category: "Mi & Bakso", image: "https://placehold.co/600x400.png", hint: "bakso urat" },
  { name: "Morning Brew", category: "Kafe", image: "https://placehold.co/600x400.png", hint: "espresso croissant" },
  { name: "Peking Duck House", category: "Masakan Cina", image: "https://placehold.co/600x400.png", hint: "peking duck" },
  { name: "Taco Fiesta", category: "Masakan Meksiko", image: "https://placehold.co/600x400.png", hint: "street tacos" },
  { name: "Thai Orchid", category: "Masakan Thailand", image: "https://placehold.co/600x400.png", hint: "green curry" },
  { name: "Kimchi Jjigae", category: "Masakan Korea", image: "https://placehold.co/600x400.png", hint: "kimchi stew" },
  { name: "Ganesha's Kitchen", category: "Masakan India", image: "https://placehold.co/600x400.png", hint: "naan bread" },
  { name: "The Butcher's Table", category: "Steakhouse", image: "https://placehold.co/600x400.png", hint: "t-bone steak" },
  { name: "Warisan Nenek", category: "Masakan Rumahan", image: "https://placehold.co/600x400.png", hint: "grandma recipe" },
  { name: "Green Goodness", category: "Makanan Sehat", image: "https://placehold.co/600x400.png", hint: "smoothie bowl" },
  { name: "Gelato Paradise", category: "Dessert", image: "https://placehold.co/600x400.png", hint: "italian gelato" },
  { name: "Ayam Betutu Khas", category: "Masakan Bali", image: "https://placehold.co/600x400.png", hint: "balinese chicken" },
  { name: "Sup Buntut Juara", category: "Soto & Sup", image: "https://placehold.co/600x400.png", hint: "oxtail soup" },
  { name: "Nasi Goreng Gila", category: "Masakan Indonesia", image: "https://placehold.co/600x400.png", hint: "crazy fried-rice" },
  { name: "Trattoria Romana", category: "Masakan Italia", image: "https://placehold.co/600x400.png", hint: "lasagna classic" },
  { name: "Udon Master", category: "Masakan Jepang", image: "https://placehold.co/600x400.png", hint: "tempura udon" },
  { name: "Diner 66", category: "Masakan Amerika", image: "https://placehold.co/600x400.png", hint: "milkshake pancakes" },
  { name: "Cibiuk Resto", category: "Masakan Sunda", image: "https://placehold.co/600x400.png", hint: "sambal dadak" },
  { name: "Garuda Restaurant", category: "Masakan Padang", image: "https://placehold.co/600x400.png", hint: "gulai otak" },
  { name: "The Holy Crab", category: "Makanan Laut", image: "https://placehold.co/600x400.png", hint: "cajun seafood" },
  { name: "Kwetiau Akang", category: "Mi & Bakso", image: "https://placehold.co/600x400.png", hint: "fried kwetiau" },
  { name: "Daily Grind Cafe", category: "Kafe", image: "https://placehold.co/600x400.png", hint: "americano coffee" },
  { name: "Imperial Kitchen", category: "Masakan Cina", image: "https://placehold.co/600x400.png", hint: "lamian noodles" },
  { name: "Hola Amigo", category: "Masakan Meksiko", image: "https://placehold.co/600x400.png", hint: "quesadilla cheese" },
  { name: "Tom Yum Goong", category: "Masakan Thailand", image: "https://placehold.co/600x400.png", hint: "spicy soup" },
  { name: "Bulgogi Brothers", category: "Masakan Korea", image: "https://placehold.co/600x400.png", hint: "beef bulgogi" },
  { name: "Queen's Tandoor", category: "Masakan India", image: "https://placehold.co/600x400.png", hint: "tandoori chicken" },
  { name: "AB Steak", category: "Steakhouse", image: "https://placehold.co/600x400.png", hint: "dry-aged steak" },
  { name: "Pondok Lauk", category: "Masakan Rumahan", image: "https://placehold.co/600x400.png", hint: "fish dishes" },
  { name: "Veggie Victory", category: "Makanan Sehat", image: "https://placehold.co/600x400.png", hint: "vegan burger" },
  { name: "Crepe Signature", category: "Dessert", image: "https://placehold.co/600x400.png", hint: "sweet crepe" },
  { name: "Warung Babi Guling", category: "Masakan Bali", image: "https://placehold.co/600x400.png", hint: "suckling pig" },
  { name: "Rawon Setan", category: "Soto & Sup", image: "https://placehold.co/600x400.png", hint: "beef black-soup" },
  { name: "Sate Padang Ajo Ramon", category: "Masakan Indonesia", image: "https://placehold.co/600x400.png", hint: "padang satay" },
  { name: "Osteria Gia", category: "Masakan Italia", image: "https://placehold.co/600x400.png", hint: "classic italian" },
  { name: "Kintan Buffet", category: "Masakan Jepang", image: "https://placehold.co/600x400.png", hint: "yakiniku buffet" },
  { name: "Texas Chicken", category: "Masakan Amerika", image: "https://placehold.co/600x400.png", hint: "fried chicken" },
  { name: "Alam Sunda", category: "Masakan Sunda", image: "https://placehold.co/600x400.png", hint: "sundanese buffet" },
  { name: "Sederhana Bintaro", category: "Masakan Padang", image: "https://placehold.co/600x400.png", hint: "padang buffet" },
  { name: "Cut The Crab", category: "Makanan Laut", image: "https://placehold.co/600x400.png", hint: "seafood boil" },
  { name: "Bakmi Aloi", category: "Mi & Bakso", image: "https://placehold.co/600x400.png", hint: "pork noodle" },
  { name: "Anomali Coffee", category: "Kafe", image: "https://placehold.co/600x400.png", hint: "indonesian coffee" },
  { name: "Din Tai Fung", category: "Masakan Cina", image: "https://placehold.co/600x400.png", hint: "xiao long-bao" },
  { name: "Gonzo's Tex-Mex", category: "Masakan Meksiko", image: "https://placehold.co/600x400.png", hint: "nachos grande" },
  { name: "Santhai", category: "Masakan Thailand", image: "https://placehold.co/600x400.png", hint: "mango sticky-rice" },
  { name: "Oppa Dak", category: "Masakan Korea", image: "https://placehold.co/600x400.png", hint: "korean fried-chicken" },
  { name: "The Royal Kitchen", category: "Masakan India", image: "https://placehold.co/600x400.png", hint: "biryani rice" },
  { name: "Wolfgang's Steakhouse", category: "Steakhouse", image: "https://placehold.co/600x400.png", hint: "porterhouse steak" },
  { name: "Kedai Kita", category: "Masakan Rumahan", image: "https://placehold.co/600x400.png", hint: "family restaurant" },
  { name: "Fedwell", category: "Makanan Sehat", image: "https://placehold.co/600x400.png", hint: "healthy bowl" },
  { name: "D'Crepes", category: "Dessert", image: "https://placehold.co/600x400.png", hint: "savory crepe" },
  { name: "Naughty Nuri's", category: "Masakan Bali", image: "https://placehold.co/600x400.png", hint: "bbq pork-ribs" },
  { name: "Coto Makassar", category: "Soto & Sup", image: "https://placehold.co/600x400.png", hint: "makassar soup" },
  { name: "Pempek Pak Raden", category: "Masakan Indonesia", image: "https://placehold.co/600x400.png", hint: "fish cake" },
  { name: "Mamma Rosy", category: "Masakan Italia", image: "https://placehold.co/600x400.png", hint: "homestyle italian" },
  { name: "Genki Sushi", category: "Masakan Jepang", image: "https://placehold.co/600x400.png", hint: "conveyor belt-sushi" },
  { name: "Carl's Jr.", category: "Masakan Amerika", image: "https://placehold.co/600x400.png", hint: "western burger" },
  { name: "Talaga Sampireun", category: "Masakan Sunda", image: "https://placehold.co/600x400.png", hint: "floating restaurant" },
  { name: "Pagi Sore Rawamangun", category: "Masakan Padang", image: "https://placehold.co/600x400.png", hint: "jengkol balado" },
  { name: "Bandar Djakarta", category: "Makanan Laut", image: "https://placehold.co/600x400.png", hint: "live seafood" },
  { name: "Mie Gacoan", category: "Mi & Bakso", image: "https://placehold.co/600x400.png", hint: "spicy noodle" },
  { name: "Starbucks Reserve", category: "Kafe", image: "https://placehold.co/600x400.png", hint: "premium coffee" },
  { name: "The Duck King", category: "Masakan Cina", image: "https://placehold.co/600x400.png", hint: "roasted duck" },
  { name: "Super Loco", category: "Masakan Meksiko", image: "https://placehold.co/600x400.png", hint: "mexican corn" },
  { name: "Greyhound Cafe", category: "Masakan Thailand", image: "https://placehold.co/600x400.png", hint: "thai fusion" },
  { name: "Mujigae", category: "Masakan Korea", image: "https://placehold.co/600x400.png", hint: "bibimbap bowl" },
  { name: "Accha", category: "Masakan India", image: "https://placehold.co/600x400.png", hint: "indian street-food" },
  { name: "Bistecca", category: "Steakhouse", image: "https://placehold.co/600x400.png", hint: "florentine steak" },
  { name: "Kafe Betawi", category: "Masakan Rumahan", image: "https://placehold.co/600x400.png", hint: "betawi food" },
  { name: "Burgreens", category: "Makanan Sehat", image: "https://placehold.co/600x400.png", hint: "plant-based food" },
  { name: "Shihlin Taiwan Street Snacks", category: "Jajanan", image: "https://placehold.co/600x400.png", hint: "xxl crispy-chicken" }
];

type DisplayRestaurant = {
  name: string;
  category: string;
  image: string;
  hint: string;
  reason?: string;
};


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedRestaurants, setDisplayedRestaurants] = useState<DisplayRestaurant[]>(featuredRestaurants);
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
      const restaurantDataForAI = featuredRestaurants.map(({ name, category }) => ({ name, category }));
      const result = await suggestRestaurants({
        query: searchQuery,
        restaurants: restaurantDataForAI,
      });

      if (result && result.suggestions.length > 0) {
        setAiMessage(result.responseMessage);
        const suggestedRestaurantMap = new Map(
          result.suggestions.map(s => [s.name, s.reason])
        );

        const newDisplayedRestaurants = featuredRestaurants
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
    setDisplayedRestaurants(featuredRestaurants);
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
                  {displayedRestaurants.map((resto) => (
                    <Card key={resto.name} className="overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
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
                  <Link href="#">Daftarkan Restoran Anda</Link>
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
                            <Link href="#">Gabung Sekarang</Link>
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
