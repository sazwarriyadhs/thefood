'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default icon issue with Leaflet in React
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

export default function VendorMap() {
  return (
    <MapContainer center={[-6.2088, 106.8456]} zoom={12} scrollWheelZoom={false} className="h-[500px] w-full rounded-lg shadow-xl">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vendors.map(vendor => (
        <Marker key={vendor.name} position={[vendor.position[0], vendor.position[1]]} icon={defaultIcon}>
          <Popup>
            <div className="font-headline font-semibold">{vendor.name}</div>
            <div>{vendor.category}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
