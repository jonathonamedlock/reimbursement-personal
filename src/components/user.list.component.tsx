import * as React from 'react';
import * as NetService from '../net/netService';
import SessionState from '../util/sessionState'

export class UserListComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
        userList: new Array(),
    }
  }

  public componentDidMount() {
    this.getUsers();
  }

  public render() {
    return (
        <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-4">
        <table className="table">
        <tbody>
                {this.state.userList.map((user, i) => {
                    return (
                        <tr key={i}>
                            <td><a className="fake-link" onClick={this.toUserReimb} id={user.username}>{user.username}</a></td>
                        </tr>
                    );
                })}
        </tbody>
        </table>
        </div>
        </div>
    );
  }

  private toUserReimb = (e) => {
    SessionState.setSelect(e.target.id);
    this.props.history.push('/view');
  }

  private getUsers = () => {
    NetService.getData('view/users')
        .then((data) => {
            data.forEach((item) => {
                this.setState({
                    userList: this.state.userList.concat(item),
                });
            });
        }).catch((err) => {
            console.log(err);
            
        });
  }
}