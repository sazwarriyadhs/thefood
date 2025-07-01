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
        const menuHtml = resto.menu.map(item => `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <span>${item.name}</span>
            <span style="font-weight: 500; white-space: nowrap; padding-left: 16px;">Rp ${item.price}</span>
          </div>
        `).join('');

        const popupContent = `
          <div style="font-family: sans-serif; max-width: 250px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0 0 4px 0;">${resto.name}</h3>
            <p style="font-size: 0.9rem; color: #6b7280; margin: 0 0 8px 0;">${resto.category}</p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 8px 0;" />
            <div style="font-size: 0.9rem; display: flex; flex-direction: column;">
              ${menuHtml}
            </div>
            <button 
              onclick="alert('Fungsi pesan belum diimplementasikan!')" 
              style="margin-top: 12px; width: 100%; padding: 8px; background-color: #59B88D; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-align: center;"
            >
              Pesan Sekarang
            </button>
          </div>
        `;
        // @ts-ignore: Menambahkan marker ke instance peta
        L.marker([resto.latitude, resto.longitude], { icon: defaultIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(popupContent);
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
