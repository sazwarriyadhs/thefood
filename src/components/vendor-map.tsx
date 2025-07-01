'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function VendorMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Mencegah peta untuk diinisialisasi ulang jika sudah ada
    if (mapRef.current && !mapInstanceRef.current) {
      // @ts-ignore: Inisialisasi peta pada elemen ref
      mapInstanceRef.current = L.map(mapRef.current).setView([-6.2088, 106.8456], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);

      const defaultIcon = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const vendors = [
        { name: "The Green Leaf", position: [-6.2088, 106.8456], category: "Italian" },
        { name: "Ocean's Catch", position: [-6.1751, 106.8650], category: "Seafood" },
        { name: "Burger Bliss", position: [-6.2297, 106.8063], category: "American" },
        { name: "Tokyo Nites", position: [-6.2146, 106.8451], category: "Japanese" },
      ];
      
      vendors.forEach(vendor => {
        // @ts-ignore: Menambahkan marker ke instance peta
        L.marker(vendor.position, { icon: defaultIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<div class="font-headline font-semibold">${vendor.name}</div><div>${vendor.category}</div>`);
      });
    }

    // Fungsi pembersihan untuk menghancurkan instance peta saat komponen di-unmount
    return () => {
      if (mapInstanceRef.current) {
        // @ts-ignore: Menghapus instance peta
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Array dependensi kosong memastikan efek ini hanya berjalan sekali setelah mount

  return (
    <div ref={mapRef} className="h-[500px] w-full rounded-lg shadow-xl" />
  );
}
