import { h, render, Component } from 'preact';
import USState from './USState';
import mapData from '../mapData';

export default class USMap extends Component {

  constructor() {
    super();

    
  }

  buildStates() {
    console.log(this);
    const paths = [];

    for (const stateKey in mapData) {
      if ({}.hasOwnProperty.call(mapData, stateKey)) {
        const path = <USState key={stateKey} dimensions={mapData[stateKey].path} state={stateKey} fill="#d3d3d3" />;
        paths.push(path);
      }
    }

    return paths;
  }

  render() {
    return (
      <svg className="usmap" xmlns="https://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 927 590">
        <title>{this.props.title || 'US Map'}</title>
        {this.buildStates()}
        <g className="outlines">
        </g>
      </svg>
    );
  }
}