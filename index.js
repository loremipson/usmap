import Raphael from 'raphael';
import mapData from './mapData';
import assign from 'object-assign-deep';

export default (element, options) => {
  const config = assign({
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
    'label': {
      'fill': '#fff',
      'font-weight': 'bold',
      'font-size': '14',
    },
  }, options);

  const R = Raphael(element); // eslint-disable-line
  const attr = config;

  R.setViewBox(0, 0, 960, 600, true);
  R.setSize('100%', '100%');

  const handleClick = (url, state) => {
    if (url.includes('{name}')) {
      const friendlyState = state.name.replace(' ', '-').toLowerCase();
      url = url.replace('{name}', friendlyState);
    }

    if (url.includes('{abbr}')) {
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
        if (group.states.includes(mapData[state].abbr.text)) {
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

