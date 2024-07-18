import './MapGenerator.css';
import React from "react";
import axios from 'axios';
import { Biome } from "../../assets/types"

interface MapGeneratorProps {
}

interface MapGeneratorState {
  name?: string;
	availableBiome?: Biome[]
	baseBiome?: Biome
	numberOfBiomes?: number
	width?: number
	height?: number
}

class MapGenerator extends React.Component<MapGeneratorProps, MapGeneratorState> {
  constructor(props: MapGeneratorProps) {
    super(props);

    // STATE
    this.state = {
      name: '',
      availableBiome: [],
      baseBiome: undefined,
      numberOfBiomes: 0,
      width: 0,
      height: 0,
    };
  }

  // STATE HANDLERS
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    this.setState({ [target.name]: target.value });
  };

  onCheckboxChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const biome = target.id as Biome;
    let newState = [] as Biome[];
    let index = this.state.availableBiome?.indexOf(biome);
    if (typeof index !== 'undefined' && index > -1) {
      if (!target.checked) {
        newState = this.state.availableBiome ?? [];
        newState.splice(index, 1)
      }
    }
    else {
      if (target.checked) {
        newState = this.state.availableBiome ?? [];
        newState?.push(biome);
      }
    }
    this.setState({ 
      [target.name]: newState
    });
  };

  onSelectChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    const target = e.target as HTMLSelectElement;
    this.setState({ [target.name]: target.value });
  };

  //AXIOS
  createMap = async (e: React.FormEvent<EventTarget>): Promise<void> => {
    e.preventDefault();

    let newMap = {
      name: this.state.name,
      availableBiome: this.state.availableBiome,
      baseBiome: this.state.baseBiome,
      numberOfBiomes: this.state.numberOfBiomes,
      width: this.state.width,
      height: this.state.height,
    }

    try {
      const response = await axios.post('http://localhost:3030/maps', newMap);
      alert(`New map successfully created: ${response.data}`);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  }

  // RENDER
  render() {
    // const {} = this.props;
    return (
      <div className="mapGenerator__container">
        <form className="mapGenerator__form" onSubmit={this.createMap}>
          <div className="mapGenerator__field">
            <label htmlFor="name">Name : </label>
            <input type="text" name="name" id="name" value={this.state.name} onChange={this.onChange} />
          </div>

          <div className="mapGenerator__field">
            <legend>Choose biomes from : </legend>
            <div className="checkbox__option">
              <input type="checkbox" name="availableBiome" id="plain" onChange={this.onCheckboxChange} />
              <label htmlFor="plain">Plain</label>
            </div>
            <div className="checkbox__option">
              <input type="checkbox" name="availableBiome" id="desert" onChange={this.onCheckboxChange} />
              <label htmlFor="plain">Desert</label>
            </div>
            <div className="checkbox__option">
              <input type="checkbox" name="availableBiome" id="ocean" onChange={this.onCheckboxChange} />
              <label htmlFor="plain">Ocean</label>
            </div>
            <div className="checkbox__option">
              <input type="checkbox" name="availableBiome" id="forest" onChange={this.onCheckboxChange} />
              <label htmlFor="plain">Forest</label>
            </div>
          </div>

          <div className="mapGenerator__field">
            <label htmlFor="baseBiome">Select the base biome : </label>
            <select name="baseBiome" id="baseBiome" value={this.state.baseBiome} onChange={this.onSelectChange}>
              <option value="">Pick a biome</option>
              <option value="plain">Plain</option>
              <option value="desert">Desert</option>
              <option value="ocean">Ocean</option>
              <option value="forest">Forest</option>
            </select>
          </div>

          <div className="mapGenerator__field">
            <label htmlFor="numberOfBiomes">Number of biomes : </label>
            <input type="number" name="numberOfBiomes" id="numberOfBiomes" value={this.state.numberOfBiomes} onChange={this.onChange} />
          </div>

          <div className="mapGenerator__field">
            <label htmlFor="width">Map width : </label>
            <input type="number" name="width" id="width" value={this.state.width} onChange={this.onChange} />
          </div>

          <div className="mapGenerator__field">
            <label htmlFor="height">Map height : </label>
            <input type="number" name="height" id="height" value={this.state.height} onChange={this.onChange} />
          </div>

          <input type="submit" value="Generate a new map"/>
        </form>
      </div>
    );
  }
}

export default MapGenerator;