import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import missingPersonsData from '../data/missingPersons.json'
import caveSystemsData from '../data/caveSystems.json'
import abductionsData from '../data/abductions.json'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface MapViewProps {
  activeLayers: {
    missingPersons: boolean
    caveSystems: boolean
    abductions: boolean
  }
  onSelectItem: (item: any) => void
}

const MapView: React.FC<MapViewProps> = ({ activeLayers, onSelectItem }) => {
  const missingPersonIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  const caveIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  const abductionIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  return (
    <div className="map-container">
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {activeLayers.caveSystems && caveSystemsData.caves.map(cave => (
          <React.Fragment key={cave.id}>
            <Circle
              center={cave.coordinates as [number, number]}
              radius={cave.length_miles * 1000}
              pathOptions={{ 
                fillColor: '#808080',
                fillOpacity: 0.2,
                color: '#404040',
                weight: 2
              }}
            />
            {cave.entrances.map((entrance, idx) => (
              <Marker
                key={`${cave.id}-entrance-${idx}`}
                position={entrance.coords as [number, number]}
                icon={caveIcon}
                eventHandlers={{
                  click: () => onSelectItem({ ...cave, entranceName: entrance.name, type: 'cave' })
                }}
              >
                <Popup>
                  <strong>{cave.name}</strong><br />
                  {entrance.name}<br />
                  Length: {cave.length_miles} miles<br />
                  Depth: {cave.depth_feet} feet
                </Popup>
              </Marker>
            ))}
          </React.Fragment>
        ))}

        {activeLayers.missingPersons && missingPersonsData.cases.map(person => (
          <Marker
            key={person.id}
            position={person.coordinates as [number, number]}
            icon={missingPersonIcon}
            eventHandlers={{
              click: () => onSelectItem({ ...person, type: 'missing' })
            }}
          >
            <Popup>
              <strong>{person.name}</strong><br />
              Age: {person.age}<br />
              Date: {person.date}<br />
              Location: {person.location}
            </Popup>
          </Marker>
        ))}

        {activeLayers.abductions && abductionsData.abductions.map(abduction => (
          <Marker
            key={abduction.id}
            position={abduction.coordinates as [number, number]}
            icon={abductionIcon}
            eventHandlers={{
              click: () => onSelectItem({ ...abduction, itemType: 'abduction' })
            }}
          >
            <Popup>
              <strong>{abduction.name}</strong><br />
              Date: {abduction.date}<br />
              Type: {abduction.type.replace(/_/g, ' ')}<br />
              Location: {abduction.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView