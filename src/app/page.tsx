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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative bg-secondary/50 py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Find your next meal with Serenity
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover local restaurants and get your favorite food delivered right to your door.
            </p>
            <div className="mt-8 max-w-2xl mx-auto">
              <form className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="text" placeholder="Food, restaurant..." className="pl-10 h-12 text-base" />
                </div>
                <Button type="submit" size="lg" className="h-12 text-base">
                  Search
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold">How It Works</h2>
              <p className="text-muted-foreground mt-2">Get your food in 3 simple steps.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Choose a Restaurant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Browse through hundreds of local restaurants and menus.</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    <ClipboardList className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Place Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Add your favorite dishes to the cart and checkout securely.</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Get It Delivered</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Track your order in real-time and enjoy your meal.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="featured" className="bg-secondary/50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold">Featured Restaurants</h2>
              <p className="text-muted-foreground mt-2">Handpicked selection of the best places to eat.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "The Green Leaf", category: "Italian", image: "https://placehold.co/600x400.png", hint: "italian pasta" },
                { name: "Ocean's Catch", category: "Seafood", image: "https://placehold.co/600x400.png", hint: "seafood dish" },
                { name: "Burger Bliss", category: "American", image: "https://placehold.co/600x400.png", hint: "gourmet burger" },
                { name: "Tokyo Nites", category: "Japanese", image: "https://placehold.co/600x400.png", hint: "sushi platter" },
              ].map((resto) => (
                <Card key={resto.name} className="overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-0">
                    <Image src={resto.image} alt={resto.name} width={600} height={400} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={resto.hint} />
                    <div className="p-4">
                      <h3 className="font-headline text-xl font-semibold">{resto.name}</h3>
                      <p className="text-muted-foreground">{resto.category}</p>
                      <div className="flex items-center mt-2">
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
          </div>
        </section>

        <section id="categories" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold">Popular Categories</h2>
              <p className="text-muted-foreground mt-2">Explore food from a wide range of categories.</p>
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

        <section id="partner" className="bg-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold">Become a Partner</h2>
            <p className="mt-2 max-w-2xl mx-auto">
              Grow your business and reach more customers by joining our platform.
            </p>
            <Button asChild size="lg" className="mt-6 bg-background text-primary hover:bg-background/90">
              <Link href="#">Register your Restaurant</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
