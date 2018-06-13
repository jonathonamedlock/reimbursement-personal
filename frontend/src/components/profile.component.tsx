import * as React from 'react';
import * as NetService from '../net/netService';
import { Link } from 'react-router-dom';


export class ProfileComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      username: '',
    };
  }

  public componentDidMount() {
    console.log('component mounted');
    
    this.getProfile();
  }

  public render() {
    return (
      <div className="row h-100 justify-content-center align-items-center">
      <div className="col-md-4">
      <table className="table">
      <tbody>
        <tr>
          <td>First Name</td>
          <td>{this.state.firstName}</td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>{this.state.lastName}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{this.state.email}</td>
        </tr>
        <tr>
          <td>Role</td>
          <td>{this.state.role}</td>
        </tr>
        <tr>
          <td>Username</td>
          <td>{this.state.username}</td>
        </tr>
      </tbody>
    </table>
    </div>
    </div>
    );
  }

  private getProfile = () => {
    NetService.getData('user/profile')
      .then((data) => {
        console.log(data);
        
        this.setState({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role.toUpperCase(),
          username: data.username,
        })
      }).catch((err) => {
        console.log(err);
        
      });
  }
}