import { h, render } from 'preact';

const USState = props => {
  return (
    <g className={props.state}>
      <path d={props.dimensions} stroke="#ffffff" stroke-width="1.5" fill={props.fill} data-name={props.state} className={`${props.state} state`} />
      {props.label && <text x={props.label.posX} y={props.label.posY} text-anchor="middle" style={props.labelStyle}>{props.label.text}</text>}
    </g>
  );
};

export default USState;