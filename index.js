import Raphael from 'raphael';
import mapData from './mapData';
import assign from 'object-assign-deep';

export default (element, options, tooltips = {}) => {

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

  const allMapData = assign(mapData, tooltips);

  const R = Raphael(element); // eslint-disable-line
  const attr = config;

  R.setViewBox(0, 0, 927, 590, true);
  R.setSize('100%', '100%');

  const handleClick = (url, state) => {
    let newUrl = '';

    if (url.indexOf('{name}') > -1) {
      const friendlyState = state.name.replace(' ', '-').toLowerCase();
      newUrl = url.replace('{name}', friendlyState);
    }

    if (url.indexOf('{abbr}') > -1) {
      newUrl = url.replace('{abbr}', state.abbr.text.toLowerCase());
    }

    window.location = newUrl;
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

  for (const state in allMapData) {
    if ({}.hasOwnProperty.call(allMapData, state)) {
      console.log(state);
      const set = R.set();
      let shape = '';

      if (attr.labels && allMapData[state].hasOwnProperty('pathWithLabel')) {
        shape = R.path(allMapData[state].pathWithLabel);
      } else {
        shape = R.path(allMapData[state].path);
      }

      set.push(shape.attr(attr));

      if (attr.labels) {
        const label = R.text(allMapData[state].abbr.posX, allMapData[state].abbr.posY, allMapData[state].abbr.text)
          .attr(attr.label);

        set.push(label);
      }

      if (attr['link-template']) {
        set.attr({ cursor: 'pointer' });
      }

      if (attr.hasOwnProperty('link-template')) {
        set.click(() => {
          handleClick(attr['link-template'], allMapData[state]);
        });
      }

      if (attr.hasOwnProperty('hover-fill')) {
        handleHover(set, attr);
      }

      if (attr.groups) {
        for (const obj in attr.groups) {
          if ({}.hasOwnProperty.call(attr.groups, obj)) {
            const group = attr.groups[obj];
            if (group.states.indexOf(allMapData[state].abbr.text) > -1) {
              set.items[0].attr({ fill: group.fill });

              if (group['link-template']) {
                set.attr({ cursor: 'pointer' });
                set.click(() => {
                  handleClick(group['link-template'], allMapData[state]);
                });
              }

              if (group['hover-fill']) {
                handleHover(set, group);
              }
            }
          }
        }
      }
    }
  }
};

