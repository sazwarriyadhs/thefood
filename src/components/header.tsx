
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export default function Header() {
  const navLinks = [
    { href: "/restaurants", label: "Restoran" },
    { href: "/promotions", label: "Promo" },
    { href: "/#categories", label: "Kategori" },
    { href: "/#partner", label: "Jadi Mitra" },
    { href: "/#courier", label: "Jadi Kurir" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/images/logo.png" alt="Serenity Logo" width={40} height={40} className="h-8 w-8 object-contain mix-blend-multiply" />
          <span className="font-bold font-headline text-lg">Serenity</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Masuk</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Daftar</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="grid gap-4 py-6">
                <Link href="/" className="mb-4 flex items-center space-x-2">
                  <Image src="/images/logo.png" alt="Serenity Logo" width={40} height={40} className="h-8 w-8 object-contain mix-blend-multiply" />
                  <span className="font-bold font-headline text-lg">Serenity</span>
                </Link>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
