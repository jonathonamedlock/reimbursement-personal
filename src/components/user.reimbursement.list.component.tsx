import * as React from 'react';
import * as NetService from '../net/netService';

export class UserReimbursementListComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
        reimbursementList: new Array(),
    }
  }

  public componentDidMount() {
    this.getReimbursements();
  }

  public render() {
    return (
      <div className="row h-100 justify-content-center align-items-center">
      <div className="col-md-10 text-center">
      <a className="btn btn-primary" href="#/reimbursements/add" role="button">New Request</a>
      <table className="table table-striped table-dark">
        <thead>
            <tr>
            <th scope="col"></th>
            <th scope="col">Time Submitted</th>
            <th scope="col">Status</th>
            <th scope="col">Processed by</th>
            <th scope="col">Items</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
        {this.state.reimbursementList.map((item, i) => {
            return (
                <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{item.timeSubmitted}</td>
                    <td>{item.reimbursementStatus}</td>
                    <td>{item.approver}</td>
                    <td>
                        <button type="button" className="btn btn-secondary" data-toggle="modal" data-target={`#${i}`}>
                            Details
                        </button>
                        {this.genModal(i)}
                    </td>
                    {this.checkButton(i)}
                </tr>
                    
                
            )
        })}
        </tbody>
      </table>
      </div>
      </div>
    );
  }


  private genModal = (i) => {
      console.log('genning modal');
      
    return(
        <div id={`${i}`} className="modal fade" role="dialog">
            <div className="modal-dialog">

                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close pull-right" data-dismiss="modal">&times;</button>
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
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                </div>

            </div>
        </div>
    );
  }

  private checkButton = (i) => {
    if (this.state.reimbursementList[i].reimbursementStatus === 'pending') {
        
        return(
            <td>
                <button className="btn btn-warning" id={i.toString()} onClick={this.cancelReimbursement}>Cancel</button>
            </td>
        );
    }
    return (
        <td/>
    );
}

  private cancelReimbursement = (e) => {
    console.log('cancelling reimbursements');
    const index = parseInt(e.target.id, 10);
    
    NetService.postData(('user/cancel'), { timeSubmitted: this.state.reimbursementList[index].timeSubmitted})
        .then((data) => {
            if (data.status === 'success') {
                const upState = this.state.reimbursementList;
                upState[index].reimbursementStatus = 'cancelled';
                this.setState({
                    reimbursementList: upState,
                });
            }
        }).catch((err) => {
            console.log(err);
            
        });
  }

  private getReimbursements = () => {
    NetService.getData('user/reimbursements')
        .then((data) => {
            data.forEach((item) => {
                this.setState({
                    reimbursementList: this.state.reimbursementList.concat(item),
                });
            });
        }).catch((err) => {
            console.log(err);
            
        });
  }
}