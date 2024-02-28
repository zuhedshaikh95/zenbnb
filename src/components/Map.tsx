"use client";
import Leaflet from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

// @ts-ignore
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface Props {
  center?: [number, number];
}

const Map: React.FC<Props> = ({ center }) => {
  return (
    <MapContainer
      center={center || [51, -0.09]}
      zoom={center ? 8 : 2}
      scrollWheelZoom={false}
      className="h-full md:h-[40vh] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {center && <Marker position={center} />}
    </MapContainer>
  );
};

export default Map;
