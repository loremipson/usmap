import { h, render, Component } from 'preact';

class State extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(props.stateObj);
  }

  handleMouseMove(e) {
    const position = {
      position: 'absolute',
      top: `${e.y}px`,
      left: `${(e.x + 20)}px`,
    };
    this.props.setTooltip(this.props.stateObj.tooltip, position);
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
    this.props.clearTooltip();
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
    const { style, abbr, tooltip } = props.stateObj;
    const { hoverFill, stroke, strokeWidth } = style.path; 
    let { fill } = style.path;

    if (this.state.hovering && hoverFill) {
      fill = hoverFill;
    }

    return (
      <g className={`state state__${props.state}`}
        onClick={this.handleClick}
        onMouseMove={tooltip && this.handleMouseMove}
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