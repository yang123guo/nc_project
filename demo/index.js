import React from 'react';
import ReactDOM from 'react-dom';
import route from './route';
import 'tinper-bee/assets/tinper-bee.css';

import '../src/public/variables.less';

ReactDOM.render(
    route,
    document.querySelector("#app")
);
