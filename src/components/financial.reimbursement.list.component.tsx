import * as React from 'react';
import * as NetService from '../net/netService';
import SessionState from '../util/sessionState'
import { Link } from 'react-router-dom';

export class FinancialReimbursementListComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
        reimbursementList: new Array(),
        viewMode: 'all',
    }
  }

  public componentDidMount() {
    if(SessionState.get().selected) {
        this.setState({
            ...this.state,
            viewMode: SessionState.get().selected,
        });
    }
    this.getReimbursements();
  }

  public render() {
    return (
        <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-10 text-center">
        <div>Viewing reimbursements submitted by: {this.state.viewMode}</div>
        <button className="btn btn-primary" type="button" onClick={this.viewModeAll} role="button">View All</button>
        <table className="table table-striped table-dark">
          <thead>
              <tr>
              <th scope="col"></th>
              <th scope="col">Requester</th>
              <th scope="col">Time Submitted</th>
              <th scope="col">Status</th>
              <th scope="col">Processed by</th>
              <th scope="col">Items</th>
              <th scope="col">Actions</th>
              </tr>
          </thead>
          <tbody>
          {this.state.reimbursementList.map((item, i) => {
              if(this.state.viewMode==='all' || this.state.viewMode===item.username) {
              return (
                  <tr key={i}>
                      <th scope="row">{i+1}</th>
                      <td> <a href="#/view" onClick={this.setViewMode} id={item.username}>{item.username}</a></td>
                      <td>{item.timeSubmitted}</td>
                      <td>{item.reimbursementStatus}</td>
                      <td>{item.approver}</td>
                      <td>
                          <button type="button" className="btn btn-secondary" data-toggle="modal" data-target={`#${i}`}>
                              Details
                          </button>
                          {this.genModal(i)}
                      </td>
                      {this.buttonsIfPending(item, i)}
                  </tr>
                      
                  
              );
            }
          })}
          </tbody>
        </table>
        </div>
        </div>
    );
  }

  private setViewMode = (e) => {
    this.setState({
        ...this.state,
        viewMode: e.target.id,
    });
  }

  private genModal = (i) => {
    console.log('genning modal');
    
    return(
        <div id={`${i}`} className="modal fade" role="dialog">
            <div className="modal-dialog">

                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Reimbursement Items</h4>
                </div>
                <div className="modal-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Title</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Description</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reimbursementList[i].items.map((listing, j) => {
                                {console.log(listing);
                                }
                                return (
                                    <tr key={j}>
                                        <th scope="row">{j+1}</th>
                                        <td>{listing.title}</td>
                                        <td>{listing.amount}</td>
                                        <td>{listing.description}</td>
                                        <td>{listing.timeOfExpense}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    {this.state.reimbursementList[i].reimbursementStatus==='pending' &&
                    <div className="btn-toolbar">
                        <button type="button" className="btn btn-success" id={i} onClick={this.approve}>Approve</button>
                        <button type="button" className="btn btn-danger" id={i} onClick={this.deny}>Deny</button>
                    </div>
                    }
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                </div>

            </div>
        </div>
    );
}

  private viewModeAll = () => {
      this.setState({
          ...this.state,
          viewMode: 'all',
      });
  }

  private buttonsIfPending = (item, i) => {
      if(item.reimbursementStatus === 'pending') {
          return (
            <td>
                <div className="btn-group-md btn-group-vertical">
                <button className="btn btn-success" type="button" id={i} onClick={this.approve}>Approve</button>
                <br/>
                <button className="btn btn-danger" type="button" id={i} onClick={this.deny}>Deny</button>
                </div>
            </td>
          );
      }
      return <td/>;
  }

  private approve = (e) => {
      const reimb = {
          index: parseInt(e.target.id,10),
          reimbursementStatus: 'approved',
          timeSubmitted: this.state.reimbursementList[e.target.id].timeSubmitted,
          username: this.state.reimbursementList[e.target.id].username,
      }
      this.changeRequest(reimb);
  }

  private deny = (e) => {
    const reimb = {
        index: parseInt(e.target.id,10),
        reimbursementStatus: 'denied',
        timeSubmitted: this.state.reimbursementList[e.target.id].timeSubmitted,
        username: this.state.reimbursementList[e.target.id].username,
    }
    this.changeRequest(reimb);
  }

  private changeRequest = (reimb) => {
    console.log('changing reimbursement');

    console.log(reimb);

    NetService.postData('view/update', reimb)
        .then((data) => {
            console.log(data);
            const newState = this.state.reimbursementList;
            newState[reimb.index].reimbursementStatus = reimb.reimbursementStatus;
            newState[reimb.index].approver = SessionState.get().username;
            this.setState({
                reimbursementList: newState,
                viewMode: this.state.viewMode,
            });
        }).catch((err) => {
            console.log(err);
            
        });
  }

  private getReimbursementsUser = (e) => {
    console.log('getting user reimbursements');
    console.log(e.target);
    
    const mode = this.state.viewMode;
    this.setState({
        reimbursementList: new Array(),
    });
    const url= `view/users/${e.target.id}`;
    console.log(url);
    
    
    NetService.getData(url)
        .then((data) => {
            const newState = new Array();
            data.forEach((item) => {
                newState.push(item);
            });
            this.setState({
                reimbursementList: newState,
                viewMode: mode,
            });
        }).catch((err) => {
            console.log(err);
            
        });

  }


  private getReimbursements = () => {
    console.log('getting reimbursements');
    
    this.setState({
        reimbursementList: new Array(),
    });

    NetService.getData('view')
        .then((data) => {
            const newState=new Array();
            data.forEach((item) => {
                newState.push(item);
            });
            let view = 'all'
            if (SessionState.get().selected) {
                view = SessionState.get().selected;
            }
            this.setState({
                reimbursementList: newState,
                viewMode: view,
            });
            SessionState.setSelect('');
        }).catch((err) => {
            console.log(err);
            
        });
  }
}