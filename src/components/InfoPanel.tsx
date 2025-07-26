import React from 'react'

interface InfoPanelProps {
  item: any
  onClose: () => void
}

const InfoPanel: React.FC<InfoPanelProps> = ({ item, onClose }) => {
  const renderContent = () => {
    if (item.type === 'missing') {
      return (
        <>
          <h3>Missing Person Details</h3>
          <div className="info-content">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Age:</strong> {item.age === 'Unknown' ? 'Unknown' : `${item.age} years old`}</p>
            <p><strong>Date Missing:</strong> {new Date(item.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Coordinates:</strong> {item.coordinates[0].toFixed(4)}°, {item.coordinates[1].toFixed(4)}°</p>
          </div>
        </>
      )
    } else if (item.type === 'cave') {
      return (
        <>
          <h3>Cave System Details</h3>
          <div className="info-content">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>State:</strong> {item.state}</p>
            <p><strong>Length:</strong> {item.length_miles} miles</p>
            <p><strong>Depth:</strong> {item.depth_feet} feet</p>
            <p><strong>Number of Entrances:</strong> {item.entrances.length}</p>
            {item.entranceName && <p><strong>Selected Entrance:</strong> {item.entranceName}</p>}
            <p><strong>Coordinates:</strong> {item.coordinates[0].toFixed(4)}°, {item.coordinates[1].toFixed(4)}°</p>
          </div>
        </>
      )
    } else if (item.itemType === 'abduction') {
      return (
        <>
          <h3>Abduction Incident Details</h3>
          <div className="info-content">
            <p><strong>Case:</strong> {item.name}</p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Type:</strong> {item.type.replace(/_/g, ' ').toUpperCase()}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Coordinates:</strong> {item.coordinates[0].toFixed(4)}°, {item.coordinates[1].toFixed(4)}°</p>
          </div>
        </>
      )
    }
  }

  return (
    <div className="info-panel">
      <button className="close-button" onClick={onClose}>×</button>
      {renderContent()}
    </div>
  )
}

export default InfoPanel