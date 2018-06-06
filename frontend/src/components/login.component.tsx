import * as React from 'react';
import * as NetService from '../net/netService'

export class LoginComponent extends React.Component<any, any> {

  private username;
  private password;

  public constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
    };
  }

  public render() {
    return (
        <form>
            <input type="text" name="username" placeholder="Username" onChange={this.inputChange} value={this.state.username}/>
            <input type="password" name="password" placeholder="Password" onChange={this.inputChange} value={this.state.password}/>
            <input type="button" value="Log in" onClick={this.sendLogin}/>
        </form>
    );
  }

  private inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  private sendLogin = () => {
    console.log('attempting to send login');
    
    NetService.postData('user/login', {username: this.state.username, password: this.state.password})
      .then((data) => {
        if (this.state.username !== data.username) {
          throw new Error("Session username mismatch");
        } else {
          this.props.history.push('/user/'+data.username);
        }
      }).catch((err) => {
        console.log(err);
        
      });
  }
}