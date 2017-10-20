import { h, render, Component } from 'preact';
import _throttle from 'lodash/throttle';
import mapData from './mapData';
import assign from 'object-assign-deep';

const USMap = props => {
  const config = assign({
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
    animateIn: 0,
    animateOut: 200,
  }, props.options);

  const determineStyle = item => {

    if (config.groups) {
      for (const group in config.groups) {
        if (config.groups[group].style && config.groups[group].states.indexOf(item.abbr.text) > -1) {
          return 'styled';
          return assign(config.style, config.groups[group].style);
        }
      }
    }

    return 'default';
    return config.style;
  };

  const buildStates = () => {
    const paths = [];

    for (const stateKey in mapData) {
      if ({}.hasOwnProperty.call(mapData, stateKey)) {
        let dimensions = mapData[stateKey].path;

        const styles = determineStyle(mapData[stateKey]);

        console.log(styles);

        if (config.labels && {}.hasOwnProperty.call(mapData[stateKey], 'pathWithLabel')) {
          dimensions = mapData[stateKey].pathWithLabel;
        }

        const path = (
          <g className={`${stateKey} state`} onClick="" onMouseMove="">
            <path d={dimensions} style={styles.path} />
            {config.labels && <text x={mapData[stateKey].abbr.posX} y={mapData[stateKey].abbr.posY} style={styles.label}>{mapData[stateKey].abbr.text}</text>}
          </g>
        );
        paths.push(path);
      }
    }

    return paths;
  };

// class USMap extends Component {

//   constructor(props) {
//     super(props);

//     this.config = assign({
//       fill: '#d3d3d3',
//       stroke: '#fff',
//       strokeWidth: 1,
//       animateIn: 0,
//       animateOut: 200,
//       label: {
//         fill: '#fff',
//         fontFamily: 'sans-serif',
//         fontWeight: 'bold',
//         fontSize: '14px',
//         textAnchor: 'middle',
//       },
//     }, this.props.options);
//   }

//   determineStyle() {
//     const defaults = {
//       path: {
//         fill: this.config.fill,
//       },
//       label: this.config.label,
//     }
//     console.log(this);
//   }

//   handleClick(path) {
//     console.log(this);
//   }

//   handleMouseMove(path) {
//     console.log(path);
//   }

  return (
    <svg
      className="usmap"
      xmlns="https://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 927 590">
      <title>{config.title || 'US Map'}</title>
      <g className="states">
        {buildStates()}
      </g>
    </svg>
  );
};

export default (element, options) => render(<USMap options={options} />, element);

/*
import Raphael from 'raphael';
import mapData from './mapData';
import assign from 'object-assign-deep';

export default (element, options) => {
  const config = assign({
    'fill': '#d3d3d3',
    'stroke': '#fff',
    'animate-in': 0,
    'animate-out': 200,
    'label': {
      'fill': '#fff',
      'font-weight': 'bold',
      'font-size': '14',
    },
  }, options);

  const R = Raphael(element); // eslint-disable-line
  const attr = config;

  R.setViewBox(0, 0, 927, 590, true);
  R.setSize('100%', '100%');

  const handleClick = (url, state) => {
    if (url.indexOf('{name}') > -1) {
      const friendlyState = state.name.replace(' ', '-').toLowerCase();
      url = url.replace('{name}', friendlyState);
    }

    if (url.indexOf('{abbr}') > -1) {
      url = url.replace('{abbr}', state.abbr.text.toLowerCase());
    }

    window.location = url;
  };

  const handleHover = (set, conf) => {
    set.hover(() => {
      if (conf.label && conf.label['hover-fill']) {
        set.items[1].stop().animate({ fill: conf.label['hover-fill'] }, conf['animate-in']);
      }
      set.items[0].stop().animate({ fill: conf['hover-fill'] }, conf['animate-in']);
    }, () => {
      if (conf.label && conf.label['hover-fill']) {
        set.items[1].stop().animate({ fill: conf.label.fill }, conf['animate-in']);
      }
      set.items[0].stop().animate({ fill: conf.fill }, conf['animate-out']);
    });
  };

  for (const state in mapData) {

    const set = R.set();
    let shape = '';

    if (attr.labels && mapData[state].hasOwnProperty('pathWithLabel')) {
      shape = R.path(mapData[state].pathWithLabel);
    } else {
      shape = R.path(mapData[state].path);
    }

    set.push(shape.attr(attr));

    if (attr.labels) {
      const label = R.text(mapData[state].abbr.posX, mapData[state].abbr.posY, mapData[state].abbr.text)
        .attr(attr.label);

      set.push(label);
    }

    if (attr['link-template']) {
      set.attr({ 'cursor': 'pointer' });
    }

    if (attr.hasOwnProperty('link-template')) {
      set.click(() => {
        handleClick(attr['link-template'], mapData[state]);
      });
    }

    if (attr.hasOwnProperty('hover-fill')) {
      handleHover(set, attr);
    }

    if (attr.groups) {
      for (const obj in attr.groups) {
        const group = attr.groups[obj];
        if (group.states.indexOf(mapData[state].abbr.text) > -1) {
          set.items[0].attr({ fill: group.fill });

          if (group['link-template']) {
            set.attr({ 'cursor': 'pointer' });
            set.click(() => {
              handleClick(group['link-template'], mapData[state]);
            });
          }

          if (group['hover-fill']) {
            handleHover(set, group);
          }
        }
      }
    }
  }
};
*/
