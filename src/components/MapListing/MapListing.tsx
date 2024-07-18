import axios from 'axios';
import './MapListing.css';
import React from "react";

interface MapListingProps {
  selectMap: (map: object) => void;
}

interface MapListingState {
  maps: []
}

class MapListing extends React.Component<MapListingProps, MapListingState> {
  constructor(props: MapListingProps) {
    super(props);
    this.state = {
      maps: []
    };
  }

  componentDidMount() {
    this.fetchMaps();
  }

  fetchMaps = async (): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:3030/maps');
      this.setState({
        maps: response.data
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  }

  render() {
    // const {} = this.props;
    return (
      <div className="mapListing__container">
        {this.state.maps.map((map: any) => {
            return (
              <div key={map._id} className="mapListing__single">
                <div className="mapListing__name">
                  {map.name}
                </div>
                <div className="mapListing__actions">
                  <button className="mapListing__open" onClick={() => this.props.selectMap(map)}>
                    Open
                  </button>
                  <button className="mapListing__delete">
                    Delete
                  </button>
                </div>
              </div>
            );
        })}
      </div>
    );
  }
}

export default MapListing;