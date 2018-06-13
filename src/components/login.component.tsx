import * as React from 'react';
import * as NetService from '../net/netService';
import App from '../App';
import SessionState from '../util/sessionState';

export class LoginComponent extends React.Component<any, any> {
  public constructor(props) {
    super(props);

    
    console.log(this.props.getData);
    
    this.state = {
      failed: false,
      password: '',
      username: '',
    };
  }

  public render() {
    return (
      <div className="row h-100 justify-content-center align-items-center">
        <form className="col-md-4">
          <div className="form-group">
            <div>Username</div>
            <input name="username" type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" onChange={this.inputChange} value={this.state.username}/>
          </div>
          <div className="form-group">
            <div>Password</div>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.inputChange} value={this.state.password}/>
          </div>
          {this.state.failed &&
            <div>
            <div className="warning-message">Log in failed</div>
            <div className="warning-message">Incorrect credentials supplied</div>
            </div>
          }
          <a className="btn btn-primary" href="#/login"  onClick={this.sendLogin} role="button">Log In</a>
        </form>
      </div>
    );
  }

  private inputChange = (e) => {
    console.log('changing state...');
    
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  private sendLogin = () => {
    NetService.postLogin('user/login', {username: this.state.username, password: this.state.password})
      .then((data) => {
        if (!data.username) {
          this.setState({
            failed: true,
            password: '',
            username: '',
          });
          return;
        }
        if (this.state.username !== data.username) {
          this.setState({
            failed: true,
            password: '',
            username: '',
          });
          throw new Error("Session username mismatch");
        } else {
          this.setState({
            password: '',
            role: data.role,
            username: data.username,
          });
          
          SessionState.set(data);
          this.props.history.push('/profile');
        }
      }).catch((err) => {
        console.log(err);
        this.setState({
          failed: true,
          password: '',
          username: '',
        });
      });
  }

  private buildAuth() {
    // this.props.sendLogin(this.state.role);
  }
}