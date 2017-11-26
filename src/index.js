import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';
import About from './pages/About.js';

ReactGA.initialize('UA-8536421-9');

const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
    return null;
};

const Root = () => {
    return(
      <div>
      <BrowserRouter>
        <div>
          <Route path="/" component={logPageView} />
          <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/city/:id" component={App} />
              <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
