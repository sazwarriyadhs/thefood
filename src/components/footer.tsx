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
              Perjalanan damai Anda menuju makanan lezat.
            </p>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary">Beranda</Link></li>
              <li><Link href="#featured" className="text-muted-foreground hover:text-primary">Restoran</Link></li>
              <li><Link href="#partner" className="text-muted-foreground hover:text-primary">Jadi Mitra Restoran</Link></li>
              <li><Link href="#courier" className="text-muted-foreground hover:text-primary">Jadi Mitra Kurir</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Ketentuan Layanan</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Kebijakan Privasi</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Ikuti Kami</h3>
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
          <p>&copy; {new Date().getFullYear()} Serenity Food and Delivery. Hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
}
