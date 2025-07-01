
import Image from "next/image";
import { Utensils, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const restaurants = [
  {
    name: "Sari Nusantara",
    address: "Jl. Jendral Sudirman No. 1, Jakarta",
    image: "https://placehold.co/600x400.png",
    hint: "nasi rames",
    category: "Masakan Indonesia",
    latitude: -6.2088,
    longitude: 106.8456,
    menu: [
      { name: "Nasi Goreng Spesial", price: "45.000" },
      { name: "Rendang Daging", price: "55.000" },
      { name: "Sate Ayam (10 tusuk)", price: "50.000" },
    ],
  },
  {
    name: "La Pizzeria",
    address: "Jl. Kemang Raya No. 15, Jakarta Selatan",
    image: "https://placehold.co/600x400.png",
    hint: "wood-fired pizza",
    category: "Masakan Italia",
    latitude: -6.2622,
    longitude: 106.8141,
    menu: [
      { name: "Margherita Pizza", price: "85.000" },
      { name: "Fettuccine Carbonara", price: "95.000" },
      { name: "Tiramisu", price: "60.000" },
    ],
  },
  {
    name: "Sakura Sushi Bar",
    address: "Plaza Senayan, Lt. 3, Jakarta Pusat",
    image: "https://placehold.co/600x400.png",
    hint: "sushi roll",
    category: "Masakan Jepang",
    latitude: -6.2252,
    longitude: 106.7997,
    menu: [
      { name: "Salmon Sashimi (5 pcs)", price: "75.000" },
      { name: "Dragon Roll", price: "110.000" },
      { name: "Chicken Katsu Don", price: "80.000" },
    ],
  },
  {
    name: "Big Bite Burgers",
    address: "Jl. Panglima Polim No. 9, Jakarta Selatan",
    image: "https://placehold.co/600x400.png",
    hint: "cheeseburger fries",
    category: "Masakan Amerika",
    latitude: -6.2480,
    longitude: 106.8010,
    menu: [
      { name: "Classic Cheeseburger", price: "70.000" },
      { name: "BBQ Bacon Burger", price: "85.000" },
      { name: "Loaded Fries", price: "50.000" },
    ],
  },
  {
    name: "Warung Sunda Asri",
    address: "Jl. Pajajaran No. 45, Bogor",
    image: "https://placehold.co/600x400.png",
    hint: "nasi liwet",
    category: "Masakan Sunda",
    latitude: -6.5950,
    longitude: 106.8070,
    menu: [
      { name: "Nasi Timbel Komplit", price: "65.000" },
      { name: "Gurame Bakar", price: "90.000" },
      { name: "Sayur Asem", price: "25.000" },
    ],
  },
  {
    name: "Rendang Express",
    address: "Jl. Sabang No. 21, Jakarta Pusat",
    image: "https://placehold.co/600x400.png",
    hint: "rendang sapi",
    category: "Masakan Padang",
    latitude: -6.1820,
    longitude: 106.8240,
    menu: [
      { name: "Paket Rendang", price: "35.000" },
      { name: "Ayam Pop", price: "28.000" },
      { name: "Gulai Tunjang", price: "30.000" },
    ],
  },
  {
    name: "Golden Wok",
    address: "Jl. Mangga Besar Raya No. 100, Jakarta Barat",
    image: "https://placehold.co/600x400.png",
    hint: "kung pao",
    category: "Masakan Cina",
    latitude: -6.1510,
    longitude: 106.8200,
    menu: [
      { name: "Ayam Kung Pao", price: "75.000" },
      { name: "Sapo Tahu Seafood", price: "80.000" },
      { name: "Fuyunghai", price: "65.000" },
    ],
  },
  {
    name: "El Agave",
    address: "Cilandak Town Square, Lt. 1, Jakarta Selatan",
    image: "https://placehold.co/600x400.png",
    hint: "tacos burritos",
    category: "Masakan Meksiko",
    latitude: -6.2860,
    longitude: 106.7990,
    menu: [
      { name: "Tacos al Pastor (3 pcs)", price: "90.000" },
      { name: "Chicken Burrito", price: "105.000" },
      { name: "Nachos Grande", price: "85.000" },
    ],
  },
  {
    name: "Seoul Garden",
    address: "Gandaria City, Lt. UG, Jakarta Selatan",
    image: "https://placehold.co/600x400.png",
    hint: "korean bbq",
    category: "Masakan Korea",
    latitude: -6.2440,
    longitude: 106.7840,
    menu: [
      { name: "Beef Bulgogi Set", price: "150.000" },
      { name: "Kimchi Jjigae", price: "95.000" },
      { name: "Japchae", price: "85.000" },
    ],
  },
  {
    name: "Delhi Spice",
    address: "Jl. Pasar Baru No. 5, Jakarta Pusat",
    image: "https://placehold.co/600x400.png",
    hint: "butter chicken",
    category: "Masakan India",
    latitude: -6.1700,
    longitude: 106.8310,
    menu: [
      { name: "Butter Chicken", price: "110.000" },
      { name: "Lamb Biryani", price: "130.000" },
      { name: "Garlic Naan", price: "30.000" },
    ],
  },
];

export default function RestaurantsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-secondary/50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold">Jelajahi Restoran</h1>
            <p className="text-muted-foreground mt-2">
              Temukan tempat makan terbaik di kota.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {restaurants.map((resto, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <Image
                      src={resto.image}
                      alt={resto.name}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      data-ai-hint={resto.hint}
                    />
                  </div>
                  <div className="md:w-2/3 flex flex-col">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">{resto.category}</Badge>
                      <CardTitle>{resto.name}</CardTitle>
                      <CardDescription className="flex items-center pt-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        {resto.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <h4 className="font-semibold text-md mb-2 flex items-center">
                            <Utensils className="w-4 h-4 mr-2" />
                            Menu Unggulan
                        </h4>
                        <ul className="space-y-1 text-muted-foreground">
                            {resto.menu.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span className="font-medium text-foreground">Rp {item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
