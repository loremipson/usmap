import { h, render, Component } from 'preact';

class State extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(props.stateObj);
    this.handleMouseEnter = this.handleMouseEnter.bind(props.stateObj.style);
    this.handleMouseLeave = this.handleMouseLeave.bind(props.stateObj.style);
  }

  handleMouseEnter() {
    console.log(this);
  }

  handleMouseOut() {
    console.log(this);
  }

  handleClick() {
    if (this.url) {
      let href;

      if (this.url.indexOf('{name}') > -1) {
        const friendlyState = this.name.replace(' ', '-').toLowerCase();
        href = this.url.replace('{name}', friendlyState);
      }

      if (this.url.indexOf('{abbr}') > -1) {
        href = this.url.replace('{abbr}', this.abbr.text.toLowerCase());
      }

      window.location = href;
    }
  }

  render(props) {
    return (
      <g className={`state state__${props.state}`}
        onClick={this.handleClick}
        onMouseMove=""
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <path d={props.dimensions} style={props.stateObj.style.path} />
        {props.labels && <text x={props.stateObj.abbr.posX}
          y={props.stateObj.abbr.posY}
          style={props.stateObj.style.label}
        >
          {props.stateObj.abbr.text}
        </text>}
      </g>
    );
  }
}

export default State;