import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../src/redux/reducer';

//引入组件
import App from './Component/App';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App store={store} />
    </Provider>
    , document.getElementById('root'));