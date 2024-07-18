import "./MapManager.css";
import React from "react";
import MapGenerator from "../MapGenerator/MapGenerator"
import MapListing from "../MapListing/MapListing"
import MapReader from "../MapReader/MapReader"

interface MapManagerProps {
}

interface MapManagerState {
  selectedMap: object
}

class MapManager extends React.Component<MapManagerProps, MapManagerState> {
  constructor(props: MapManagerProps) {
    super(props);

    this.selectMap = this.selectMap.bind(this);

    this.state = {
      selectedMap: {}
    };
  }

  selectMap = (map: object): void => {
    this.setState({
      selectedMap: map
    });
  }

  render() {
    // const {} = this.props;
    return (
      <div className="mapManager__container singleview">
        <div className="mapManager__manage">
          <MapGenerator />
          <MapListing
            selectMap={this.selectMap}
          />
        </div>
        <div className="mapManager__display">
          <MapReader
            selectedMap={this.state.selectedMap}
          />
        </div>
      </div>
    );
  }
}

export default MapManager;