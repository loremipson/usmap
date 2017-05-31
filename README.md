# usmap

An interactive US state map that's simple to use.

```javascript
import map from 'usmap';

const mapEl = document.querySelector('.your-element');
mapEl(map);
```

## Options

By default, the map is pretty plain. You can pass an object of options as the second parameter:

```javascript
mapEl(map, {
  // options
});
```

This map utilizes Raphael, so all of [Raphael's `attr` parameters](http://dmitrybaranovskiy.github.io/raphael/reference.html#Element.attr) are available. By default, we only set the `fill` and `stroke` colors.

| **Option**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | **Type** | **Default Value** | **Description** |
|:-----------|----------|-------------------|-----------------|
| **`'fill'`** | String | `'#d3d3d3'` | Background fill color of each state |
| **`'hover-fill'`** | String | | Background fill color of each state when hovering |
| **`'stroke'`** | String | `'#fff'` | The stroke colors the lines separating each state |
| **`'animate-in'`** | Int | `0` | The number, in milliseconds, that your fill comes in when hovering |
| **`'animate-out'`** | Int | `200` | The number, in milliseconds, that your fill returns to normal when hovering |
| **`'link-template'`** | String | | This creates a click event that takes the user to the format. See further documentation below |
| **`'labels'`** | Bool | `false` | If set to true, shows the State abbreviation and has easier access to some of the smaller states |
| **`'label'`** | Object | | The style of your label. You can set fill, font-weight, font-size, etc. |
| **`'groups'`** | Object | | Allows you to group specific states together and overwrite the above options for them |

### `link-template`

If this option is set, a click event is placed on the state. You can pass in either `{name}` or `{abbr}` to this template and it will render out the link accordingly.

```javascript
{
  // ...
  'link-template': '/some/url/{name}',
}
```

This will render links out at: `/some/url/new-york`, `/some/url/washington`, etc.

```javascript
{
  // ...
  'link-template': '/some/url/{abbr}',
}
```

This will render links out as `/some/url/ny`, `/some/url/wa`, etc.

### `label`

This object is for the appearance of the text/state abbreviations that show up if `labels` is set to `true`.

Because this package uses Raphael, you have access to [all of `.attr()`](https://dmitrybaranovskiy.github.io/raphael/reference.html#Element.attr). You can set fill, stroke, font-size, etc.

```javascript
{
  // ... 
  'label': {
    'fill': '#fff',
    'font-weight': 'bold',
  },
}
```

### `groups`

Groups allow you to .. "group" specific states together. Groups can have their own fill, hover-fill, label styles, etc.

Groups _require_ an array of States (capitalized abbreviations). Some examples:

```javascript
{
  // ...
  'groups': {
    'group-name': {
      'fill': '#f06',
      'hover-fill': '#905',
      'states': ['NY', 'WA'],
    },
  },
}
```

```javascript
{
  // ...
  'groups': {
    'four-corners': {
      'states': ['CO', 'UT', 'AZ', 'NM'],
      'link-template': '/custom/path/{abbr}',
    },
  },
}
```
