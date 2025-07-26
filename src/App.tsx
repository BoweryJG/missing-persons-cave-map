import { useState } from 'react'
import './App.css'
import MapView from './components/MapView'
import ControlPanel from './components/ControlPanel'
import InfoPanel from './components/InfoPanel'

function App() {
  const [activeLayers, setActiveLayers] = useState({
    missingPersons: true,
    caveSystems: false,
    abductions: false
  })
  
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const toggleLayer = (layer: string) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }))
  }

  return (
    <div className="app">
      <h1>Missing Persons, Cave Systems & Abduction Locations Map</h1>
      <div className="main-container">
        <ControlPanel 
          activeLayers={activeLayers}
          onToggleLayer={toggleLayer}
        />
        <MapView 
          activeLayers={activeLayers}
          onSelectItem={setSelectedItem}
        />
        {selectedItem && (
          <InfoPanel 
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </div>
  )
}

export default App
