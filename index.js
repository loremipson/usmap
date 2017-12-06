import { h, render } from 'preact';
import Map from './components/Map';

export default (element, options, ...objs) => render(<Map options={options} objs={objs} />, element);