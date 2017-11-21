import { h, render, Component } from 'preact';
import throttle from 'lodash/throttle';

class State extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };

    this.handleMouseMove = throttle(this.handleMouseMove.bind(this), 500);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(props.stateObj);
  }

  handleMouseMove(e) {
    if (!this.props.stateObj.tooltip) {
      return false;
    }
    console.log(`x: ${e.x}, y: ${e.y}`);
    console.log(this.state);
  }

  handleMouseEnter() {
    this.setState({
      hovering: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      hovering: false,
    });
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
    const { style, abbr } = props.stateObj;
    const { hoverFill, stroke, strokeWidth } = style.path; 
    let { fill } = style.path;

    if (this.state.hovering && hoverFill) {
      fill = hoverFill;
    }

    return (
      <g className={`state state__${props.state}`}
        onClick={this.handleClick}
        onMouseMove={this.handleMouseMove}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <g className="paths">
          <path d={props.dimensions} style={{ fill, stroke, strokeWidth }} />
        </g>
        {props.labels && <text x={abbr.posX}
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