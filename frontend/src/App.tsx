import * as React from 'react';

import { LoginComponent } from './components/login.component'
// import { FirstComponent } from './components/first.component';
// import { NavComponent } from './components/nav.component';
import './include/bootstrap';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
// import { SecondComponent } from './components/second.component';
// import { ClickerComponent } from './components/clicker.component';
// import { TicTacToeComponent } from './components/tic-tac-toe.component';

class App extends React.Component<any, any> {

  public render() {
    return (/*
      <HashRouter>
        <div>
          <NavComponent />
          <Switch>
            <Route path="/first" component={FirstComponent} />
            <Route path="/second" component={SecondComponent} />
            <Route path="/clicker" component={ClickerComponent} />
            <Route path="/tic-tac-toe" component={TicTacToeComponent} />
            <Route component={FirstComponent} />
          </Switch>
        </div>
      </HashRouter>*/
        <HashRouter>
            <Switch>
                <Route path="/login" component={LoginComponent} />
                {/*<Route path="/:username" component={ProfileComponent} />*/}
            </Switch>
        </HashRouter>
    );
  }
}

export default App;
