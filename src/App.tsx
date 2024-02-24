import { useEffect, useState } from 'react';
import './App.css';
import MarkerIcon from './assets/marker.svg';
import Leaflet from 'leaflet';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
const icon = Leaflet.icon({
  iconUrl: MarkerIcon,
  iconSize: [58,58],
})

type Position = {
  latitude: number;
  longitude: number;
}

const initialPosition:Position = {
  latitude: -8.91,
  longitude: 13.183
}

function App() {

  const [position,setPosition] = useState<Position>();

  useEffect(()=>{

    navigator.geolocation.getCurrentPosition(
      ({coords:{latitude,longitude}})=>{
        setPosition({latitude,longitude})
      },
      (error)=> {
        console.error("Location",error.message)
      }  
    )

  },[])

  return (
    <main id='container'>
      <MapContainer style={{width: '100%',height: '100%'}} center={{lat: initialPosition.latitude,lng: initialPosition.longitude}} zoom={13} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker icon={icon} position={{lat:position.latitude,lng: position.longitude}}>
            <Popup>
              Home
            </Popup>
          </Marker>
        )}
        
      </MapContainer>
    </main>
  )
}

export default App
