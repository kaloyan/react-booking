import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MapBox.module.css";

export default function MapBox({ data }) {
  const [position, setPosition] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const address = `${data.address}, ${data.city}, ${data.country}`;

    if (data.address) {
      fetch(`//nominatim.openstreetmap.org/search?format=json&q=${address}`)
        .then((res) => res.json())
        .then((res) => {
          if (res[0]?.lat) {
            setPosition([Number(res[0].lat), Number(res[0].lon)]);
          } else {
            setNotFound(true);
          }
        });
    }
  }, [data]);

  return (
    <section className={styles["map-container"]} id="map">
      {position && (
        <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={position}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          />
        </MapContainer>
      )}

      {notFound && (
        <div className={styles["not-found"]}>
          <h2>Sorry, can't find the address.</h2>
        </div>
      )}
    </section>
  );
}
