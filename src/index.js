import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import About from './pages/About.js';

const Root = () => {
    return(
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/city/:id" component={App} />
            <Route exact path="/about" component={About} />
        </Switch>
      </BrowserRouter>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
