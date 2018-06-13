import * as React from 'react';
import App from '../App'
import * as NetService from '../net/netService'
import SessionState from '../util/sessionState'

import 'bootstrap/dist/css/bootstrap.min.css';

export class NavComponent extends React.Component<any, any> {

  public constructor(props) {
    super(props);
    this.state = {
        role: '',
    }
    
    setInterval(this.updateRole, 33);
  }

  public updateRole = () => {
      if (this.state.role !== SessionState.get().role) {
        this.setState({
            role: SessionState.get().role,
        });
    }
  }

  public render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Reimbursement Service</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                {this.getNavBarByRole()}
            </div>
        </nav>
    );
  }

  private getNavBarByRole() {
    if (this.state.role) {
        if (this.state.role === SessionState.user) {
            // user nav bar links
            return (
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="#/dashboard">Home <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link active" href="#/profile">Profile</a>
                    <a className="nav-item nav-link active" href="#/reimbursements">Reimbursements</a>
                    <a className="nav-item nav-link active" onClick={this.logOut} href="#/login">Log Out</a>
                </div>
            );
        } else if (this.state.role === SessionState.financial) {
            // finance manager nav bar links
            return (
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="#/dashboard">Home <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link active" href="#/profile">Profile</a>
                    <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Reimbursements
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#/view">View All</a>
                            <a className="dropdown-item" href="#/view/pending">View Pending</a>
                            <a className="dropdown-item" href="#/reimbursements">Request</a>
                            <a className="dropdown-item" href="#/view/users">User List</a>
                        </div>
                    </div>
                    <a className="nav-item nav-link active" onClick={this.logOut} href="#/login">Log Out</a>
                </div>
            );
        } else {
            // invalid login state, handle this!
        }
    } else {
        // bar contains only login
        return ( 
            <div className="navbar-nav">
                <a className="nav-item nav-link active" href="#/login">Log in</a>
            </div>
        );
    }
  }

  private logOut = () => {
    SessionState.set({
        role: '',
        username: '',
    });
    NetService.delData('user/logout')
        .then((data) => {
            this.props.history.push('/login');
        }).catch((err) => {
            console.log(err);
            
        });
  }
}