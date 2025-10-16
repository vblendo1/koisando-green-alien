import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Buraco } from "@/types/buraco";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface BuracosMapProps {
  buracos: Buraco[];
}

// Coordenadas de Manacapuru-AM
const MANACAPURU_CENTER = [-3.2994, -60.6206] as L.LatLngExpression;

const MapUpdater = ({ center }: { center: L.LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    if (Array.isArray(center)) {
      map.setView(center as [number, number], 13);
    }
  }, [center, map]);
  return null;
};

export const BuracosMap = ({ buracos }: BuracosMapProps) => {
  return (
    <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden border border-primary/20 alien-glow">
      <MapContainer
        // @ts-ignore - react-leaflet types issue
        center={MANACAPURU_CENTER}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          // @ts-ignore - react-leaflet types issue
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={MANACAPURU_CENTER} />
        
        {buracos
          .filter((b) => b.latitude && b.longitude)
          .map((buraco) => (
            <Marker key={buraco.id} position={[buraco.latitude!, buraco.longitude!]}>
              <Popup>
                <div className="font-space">
                  <p className="font-bold text-sm">{buraco.localizacao}</p>
                  <p className="text-xs text-gray-600 mt-1">{buraco.descricao}</p>
                  <p className="text-xs text-gray-500 mt-1">Por: {buraco.autor}</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};
