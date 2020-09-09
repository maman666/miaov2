import React from 'react';
import {render} from 'react-dom';

import App from './App';
import {HashRouter,BrowserRouter,Route} from 'react-router-dom';

render(
    <HashRouter>
        <App/>
        {/* 利用 Route拿到history跳转方式 */}
        {/* <Route component={App}/> */}
    </HashRouter>
    ,
    document.querySelector('#app')
)