'use client';
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip } from 'react-leaflet';
import type { LlcEntry } from '@/lib/llcData';
import 'leaflet/dist/leaflet.css';

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
  return (
    <MapContainer center={center} zoom={zoom} style={{ height, width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {entries.map((entry, i) => (
        <CircleMarker
          key={i}
          center={[entry.lat, entry.lng]}
          radius={7}
          pathOptions={{
            fillColor: '#f5a623',
            fillOpacity: 1,
            color: '#ffffff',
            weight: 2,
          }}
          eventHandlers={{
            mouseover: (e) => e.target.setRadius(10),
            mouseout: (e) => e.target.setRadius(7),
          }}
        >
          <Tooltip sticky>
            <span className="font-semibold">{entry.llcName}</span>
            <br />
            {entry.company}
          </Tooltip>
          <Popup>
            <strong>{entry.llcName}</strong>
            <br />
            {entry.company}
            <br />
            {entry.project}
            <br />
            <em>{entry.status.replace(/_/g, ' ')}</em>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
