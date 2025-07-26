import React from 'react'

interface ControlPanelProps {
  activeLayers: {
    missingPersons: boolean
    caveSystems: boolean
    abductions: boolean
  }
  onToggleLayer: (layer: string) => void
}

const ControlPanel: React.FC<ControlPanelProps> = ({ activeLayers, onToggleLayer }) => {
  return (
    <div className="control-panel">
      <h2>Layer Controls</h2>
      
      <div className="layer-control">
        <label>
          <input
            type="checkbox"
            checked={activeLayers.missingPersons}
            onChange={() => onToggleLayer('missingPersons')}
          />
          <span className="layer-label missing">Missing Persons</span>
        </label>
        <div className="layer-info">
          <span className="marker-preview missing">●</span>
          National Park disappearances
        </div>
      </div>

      <div className="layer-control">
        <label>
          <input
            type="checkbox"
            checked={activeLayers.caveSystems}
            onChange={() => onToggleLayer('caveSystems')}
          />
          <span className="layer-label cave">Cave Systems</span>
        </label>
        <div className="layer-info">
          <span className="marker-preview cave">●</span>
          Underground cave networks
        </div>
      </div>

      <div className="layer-control">
        <label>
          <input
            type="checkbox"
            checked={activeLayers.abductions}
            onChange={() => onToggleLayer('abductions')}
          />
          <span className="layer-label abduction">Abduction Locations</span>
        </label>
        <div className="layer-info">
          <span className="marker-preview abduction">●</span>
          Reported abduction sites
        </div>
      </div>

      <div className="statistics">
        <h3>Statistics</h3>
        <p>Missing Persons: {activeLayers.missingPersons ? '10 cases shown' : 'Hidden'}</p>
        <p>Cave Systems: {activeLayers.caveSystems ? '10 major systems' : 'Hidden'}</p>
        <p>Abductions: {activeLayers.abductions ? '10 incidents' : 'Hidden'}</p>
      </div>

      <div className="legend">
        <h3>Map Legend</h3>
        <p><span className="marker-preview missing">●</span> Red: Missing person location</p>
        <p><span className="marker-preview cave">●</span> Gray: Cave entrance</p>
        <p><span className="marker-preview abduction">●</span> Purple: Abduction site</p>
        <p><span className="area-preview">○</span> Cave system extent</p>
      </div>
    </div>
  )
}

export default ControlPanel