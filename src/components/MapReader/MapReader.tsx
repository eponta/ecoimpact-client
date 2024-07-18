import './MapReader.css';
import React from "react";

interface MapReaderProps {
  selectedMap: object;
}

interface MapReaderState {
}

class MapReader extends React.Component<MapReaderProps, MapReaderState> {
  constructor(props: MapReaderProps) {
    super(props);
    this.state = {};
  }
  render() {
    if (Object.hasOwn(this.props.selectedMap, 'name')) {
      return (
        <div className="mapReader__container">
          <pre>
            {JSON.stringify(this.props.selectedMap, null, 2)}
          </pre>
        </div>
      );
    }
    return (
      <div className="mapReader__container">
        <p>Pick a map to render...</p>
      </div>
    );
  }
}

export default MapReader;