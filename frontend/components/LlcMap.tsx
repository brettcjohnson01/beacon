'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LlcEntry } from '@/lib/llcData';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet default icon issue in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const orangeIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LlcMapProps {
  entries: LlcEntry[];
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export default function LlcMap({
  entries,
  height = '400px',
  center = [38, -97],
  zoom = 4,
}: LlcMapProps) {
  useEffect(() => {
    // intentionally empty — CSS is imported at module level
  }, []);

  return (
    <MapContainer center={center} zoom={zoom} style={{ height, width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {entries.map((entry, i) => (
        <Marker key={i} position={[entry.lat, entry.lng]} icon={orangeIcon}>
          <Popup>
            <strong>{entry.llcName}</strong>
            <br />
            {entry.company}
            <br />
            {entry.project}
            <br />
            <em>{entry.status.replace('_', ' ')}</em>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
