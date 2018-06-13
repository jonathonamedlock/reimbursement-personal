import * as React from 'react';
import * as Axios from 'axios';

import { AddReimbursementComponent } from './components/add.reimbursement.component';
import { FinancialReimbursementListComponent } from './components/financial.reimbursement.list.component';
import { FinancialReimbursementPendingComponent } from './components/financial.reimbursement.pending.component';
import { LoginComponent } from './components/login.component';
import { ProfileComponent } from './components/profile.component';
import { UserListComponent } from './components/user.list.component';
import { UserReimbursementListComponent } from './components/user.reimbursement.list.component';
import { NavComponent } from './components/nav.component';

import './include/bootstrap';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
// import { SecondComponent } from './components/second.component';
// import { ClickerComponent } from './components/clicker.component';
// import { TicTacToeComponent } from './components/tic-tac-toe.component';

class App extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      role: '',
      username: '',
    }

  }

  public render() {
    return (
      <div>
        <NavComponent/>
        <HashRouter>
          <Switch>
              <Route path="/login" {...this.props} getData={this.getData} component={LoginComponent} />
              <Route path="/reimbursements/add" component={AddReimbursementComponent} />
              <Route path="/reimbursements" component={UserReimbursementListComponent}/>
              <Route path="/profile" component={ProfileComponent} />
              <Route path="/view/pending" component={FinancialReimbursementPendingComponent}/>
              <Route path="/view/users" component={UserListComponent} />
              <Route path="/view" component={FinancialReimbursementListComponent} />
          </Switch>
        </HashRouter>
      </div>
    );
  }

  public getData = (data) => {
    console.log('revieved data');
    
    this.setState({
      role: data.role,
      username: data.username,
    });
  }
}

export default App;
