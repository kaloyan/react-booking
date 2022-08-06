import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css"
import styles from "./MapBox.module.css";

export default function MapBox() {
  const position = [51.505, -0.09];

  return (
    <section className={styles["map-container"]} id="map">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}
