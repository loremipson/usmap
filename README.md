# usmap

An interactive US state map that's simple to use.

```shell
#yarn
yarn add usmap

# npm
npm i -D usmap
```

Basic Usage

```javascript
import map from 'usmap';

const mapEl = document.querySelector('.your-element');

map(mapEl);
```

You can pass options as a second parameter:

```javascript
const mapEl = document.querySelector('.your-element');

const options = {
  // Available options outlined below
}

map(mapEl, options)
```

## Options

| **Option** | **Type** | **Default**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | **Description** |
|:-----------|----------|-------------------|-----------------|
| **`title`** | String | `'US Map'` | This gets applied to the generated `<svg>` title. |
| **`labels`** | Bool | `false` | If set to true, shows the State abbreviation and has easier access to some of the smaller states |
| **[`linkTemplate`](#linktemplate)** | String | [Reference](#linktemplate) | This creates a click event that takes the user to the format. See further documentation below |
| **[`style`](#style)** | Object | [Reference](#style) | Styling for the default `path` and `text`. |
| **[`groups`](#groups)** | Object | [Reference](#groups) | Allows you to group specific states together and overwrite the above options for them |

---

### `linkTemplate`

If this option is set, a click event is placed on the state. You can pass in either `{name}` or `{abbr}` to this template and it will render out the link accordingly.

```javascript
{
  // ...
  linkTemplate: '/some/url/{name}',
}
```

This will render links out at: `/some/url/new-york`, `/some/url/washington`, etc.

```javascript
{
  // ...
  linkTemplate: '/some/url/{abbr}',
}
```

This will render links out as `/some/url/ny`, `/some/url/wa`, etc.

---

### `style`

Your style object can contain style overwrites for both the svg `path`, and the `label` that is in place if you have `labels: true` in your options.

Below is an example of this object, with all of the available keys and their default values.

```javascript
{
  // ...
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
}
```

### `groups`

Groups allow you to .. "group" specific states together. Groups can have their own `style`, `linkTemplate`, etc.

Groups _require_ an array of States (capitalized abbreviations). Some examples:

```javascript
{
  // ...
  groups: {
    groupName: {
      states: ['NY', 'WA'],
      style: {
        path: {
          fill: 'dodgerblue',
          hoverFill: 'rebeccapurple',
        },
      },
    },
  },
}
```

```javascript
{
  // ...
  groups: {
    fourCorners: {
      states: ['CO', 'UT', 'AZ', 'NM'],
      linkTemplate: '/custom/path/{abbr}',
    },
  },
}
```

---

## Additional Abilities

### `tooltips`

You can pass an object to create "tooltip" data. This creates a `<div>` that contains any markup you pass through, that follows the cursor when a state is hovered on.

_**Important:** This can be intensive on the clients cpu, and is not recommended in most use-cases. If there is not useful information to display in your tooltip, then please push back on using this feature._

Similar to the [`linkTemplate`](#linktemplate), you can pass in `{name}` or `{abbr}` and they will render out according to the State.

Your tooltip can have whatever markup or classes you want. It's a good idea to create a "template" to avoid repeating your code.

```javascript
// Create a template for your tooltips..
const createTip = contents => `
  <div class="usmap__tooltip">
    <h3>{name}</h3>
    ${content}
  </div>
`;

// Create your tooltip object
const tooltips = {
  utah: {
    tooltip: createTip('30% available in {abbr}'),
  },
  colorado: {
    tooltip: createTip('30% available in {abbr}'),
  },
  // etc...
}

// Pass your tooltip object in to the map function
map(mapEl, options, tooltips);
```

Because your tooltip can be unique to your project, there are no default styles being applied. You can simply use your projects sass/css to target and style the tip to your needs.

---

### Animating your `hoverFill`

With version `2.0.0`, you no longer have `animateIn` and `animateOut` available to the options object.

Also, you can't actually "animate" the `fill` property with css. Because of this, the map actually applies a second `path` that contains the hover fill and uses `opacity` to show and hide them. You can apply `transition` to the opacity to create hover effects.

The example below will animate in, but not out:

```scss
.usmap__state__paths {
  path {
    transition: opacity .3s ease-out;

    &:hover {
      transition: none;
    }
  }
}
```
---

### Known Issues

#### IE11 Scaling Issue

IE11 does not scale the map. This can be resolved with stylesheets using positioning on both the parent map element and the svg that gets generated.

Example using SCSS:

```scss
@media screen and (-ms-high-contrast: none) { // Targets IE11 and not Edge
  .your-element {
    position: relative;
    height: 45vw; // You may need to mess with this value a bit.

    svg {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }  
}
```

It's ugly, but the `45vw` seems to scale it close enough to the default behavior of the map.
