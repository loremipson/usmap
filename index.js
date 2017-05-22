import Raphael from 'raphael';
import mapData from './mapData';

// TODO: Figure out an approach to link/click handling. All sites could have a different link "template"..

export default (element, options) => {
  const config = Object.assign({
    'fill': '#d3d3d3',
    'active-fill': '#666',
    'stroke': '#fff',
    'stroke-opacity': 1,
    'stroke-linejoin': 'round',
    'stroke-miterlimit': 4,
    'stroke-width': 1,
    'stroke-dasharray': 'none',
    'animate-in': 0,
    'animate-out': 200,
  }, options);

  const R = Raphael(element); // eslint-disable-line
  const attr = config;

  R.setViewBox(0, 0, 960, 600, true);
  R.setSize('100%', '100%');

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
      // TODO: Make test attr() object configurable.
      const label = R.text(mapData[state].abbr.posX, mapData[state].abbr.posY, mapData[state].abbr.text).attr({
        'font-weight': 'bold',
        'font-size': '14',
        'fill': '#fff',
      });

      set.push(label);
    }

    set.attr({
      'cursor': 'pointer',
    });

    // TODO: Let groups have hover fill options
    if (attr.groups) {
      for (const obj in attr.groups) {
        const group = attr.groups[obj];
        if (group.states.includes(mapData[state].abbr.text)) {
          set.items[0].attr({ fill: group.fill });
        }
      }
    }

    if (attr.hasOwnProperty('hover-fill')) {
      set.hover(() => {
        set.items[0].stop().animate({ fill: attr['hover-fill'] }, attr['animate-in']);
      }, () => {
        let fillColor = attr.fill;
        if (attr.groups) {
          for (const obj in attr.groups) {
            const group = attr.groups[obj];
            if (group.states.includes(mapData[state].abbr.text)) {
              fillColor = group.fill;
            }
          }
        }
        set.items[0].stop().animate({ fill: fillColor }, attr['animate-out']);
      });
    }
  }
};

