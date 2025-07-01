
'use client';

import Image from "next/image";
import Link from "next/link";
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
import { allRestaurants } from "@/lib/restaurant-data";

export default function RestaurantsPage() {
  const restaurantsWithDetails = allRestaurants.filter(r => r.address && r.menu);

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
            {restaurantsWithDetails.map((resto) => (
              <Link key={resto.slug} href={`/restaurants/${resto.slug}`} className="block">
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="md:flex h-full">
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
                              {resto.menu?.slice(0, 3).map((item, itemIndex) => (
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
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
