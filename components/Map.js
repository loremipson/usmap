import { h, render, Component } from 'preact';
// import assign from 'object-assign-deep';
import assign from 'lodash/merge';
import State from './State';
import mapData from '../mapData';

export default class Map extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      activeTooltip: false,
      tooltipPosition: false,
    };

    this.mapData = mapData;

    if (props.objs.length) {
      props.objs.map((obj) => {
        if (typeof obj !== 'object') {
          return false;
        }
        this.mapData = assign(this.mapData, obj);
      });
    }

    this.config = assign({
      title: 'US Map',
      labels: false,
      linkTemplate: false,
      style: {
        path: {
          fill: '#d3d3d3',
          hoverFill: false,
          stroke: '#fff',
          strokeWidth: 1.5,
        },
        label: {
          fill: '#fff',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          fontSize: '14px',
          textAnchor: 'middle',
        },
      },
    }, props.options);

    this.buildStateObject = this.buildStateObject.bind(this);
  }

  shouldComponentUpdate(newProps, newState) {
    return (this.state.tooltipPosition !== newState.tooltipPosition);
  }

  buildStateObject(obj) {

    obj.style = this.config.style;
    obj.url = this.config.linkTemplate;

    if (this.config.groups) {
      for (const key in this.config.groups) {
        if (this.config.groups[key].states.indexOf(obj.abbr.text) > -1) {
          if (this.config.groups[key].style) {
            const styleConf = this.config.groups[key].style;

            // "Copies" the current default style to a new object.
            obj.style = assign({}, obj.style);

            // Now we can overwrite that object, since it's a separate instance.
            obj.style = assign(obj.style, this.config.groups[key].style);
          }

          if (this.config.groups[key].linkTemplate) {
            obj.url = this.config.groups[key].linkTemplate;
          }
        }
      }
    }

    return obj;
  }

  setTooltip(template, position) {
    this.setState({
      tooltipPosition: position,
      activeTooltip: template,
    });
  }

  clearTooltip() {
    this.setState({
      tooltipPosition: false,
      activeTooltip: false,
    });
  }

  buildStates() {
    const paths = [];

    for (const stateKey in mapData) {
      if ({}.hasOwnProperty.call(mapData, stateKey)) {
        let dimensions = mapData[stateKey].path;

        const labels = this.config.labels;
        const stateObj = this.buildStateObject(mapData[stateKey]);

        // Draw out the label spots for states that are too small for a label
        if (labels && {}.hasOwnProperty.call(stateObj, 'pathWithLabel')) {
          dimensions = stateObj.pathWithLabel;
        }

        const path = (
          <State stateObj={stateObj}
            state={`${stateKey}`}
            dimensions={dimensions}
            labels={labels}
            setTooltip={this.setTooltip.bind(this)}
            clearTooltip={this.clearTooltip.bind(this)}
           />
        );
        paths.push(path);
      }
    }

    return paths;
  };

  render() {
    return (
      <div className="usmap__container">
        <svg
          className="usmap"
          xmlns="https://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 927 590">
          <title>{this.config.title}</title>
          <g className="states">
            {this.buildStates()}
          </g>
        </svg>
        {this.state.activeTooltip &&
          <div
            className="usmap__tooltip__container"
            style={this.state.tooltipPosition}
            dangerouslySetInnerHTML={{ __html: this.state.activeTooltip}}
          />
        }
      </div>
    );
  }
};