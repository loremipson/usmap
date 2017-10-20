import { h, render } from 'preact';

const USState = props => {
  return (
    <path d={props.dimensions} stroke="#ffffff" stroke-width="1.5" fill={props.fill} data-name={props.state} className={`${props.state} state`} />
  );
};

export default USState;