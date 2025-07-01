import Link from "next/link";
import { ChefHat, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-2xl">Serenity</span>
            </Link>
            <p className="text-muted-foreground">
              Your peaceful journey to delicious food.
            </p>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Restaurants</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Become a Partner</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Serenity Food and Delivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
