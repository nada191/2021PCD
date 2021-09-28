import { useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip,Popup } from "react-leaflet";
import '../components/Style.css'

const Map:React.FC = () => {
  
  return (
        <MapContainer center={[37.2666656 ,9.8666632]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[37.2666656 ,9.8666632]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>

  
  )
}
export default Map;