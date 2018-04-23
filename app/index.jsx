import React from 'react';
import { render } from 'react-dom';
import Root from './screens/Root/';
import './firebase/provider';

render(<Root />, document.getElementById('app'));
