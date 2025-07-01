'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { restaurants } from '@/app/restaurants/page';

export default function VendorMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Mencegah peta untuk diinisialisasi ulang jika sudah ada
    if (mapRef.current && !mapInstanceRef.current) {
      // @ts-ignore: Inisialisasi peta pada elemen ref
      mapInstanceRef.current = L.map(mapRef.current).setView([-6.59, 106.80], 12);

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
      
      restaurants.forEach(resto => {
        // @ts-ignore: Menambahkan marker ke instance peta
        L.marker([resto.latitude, resto.longitude], { icon: defaultIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<div class="font-headline font-semibold">${resto.name}</div><div>${resto.category}</div>`);
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
