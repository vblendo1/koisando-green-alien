import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Buraco } from "@/types/buraco";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
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
const MANACAPURU_CENTER: [number, number] = [-3.2994, -60.6206];

export const BuracosMap = ({ buracos }: BuracosMapProps) => {
  return (
    <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden border border-primary/20 alien-glow">
      <MapContainer
        center={MANACAPURU_CENTER}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
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
