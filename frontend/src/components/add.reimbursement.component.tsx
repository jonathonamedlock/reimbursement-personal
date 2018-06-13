import * as React from 'react';
import * as NetService from '../net/netService';

export class AddReimbursementComponent extends React.Component<any, any> {

    constructor(props) {
      super(props);
      this.state = {
            items: new Array(),
      }
    }

    public componentWillMount() {
        this.setState({
            items: this.state.items.concat({
                amount: '',
                description: '',
                timeOfExpense: '',
                title: '',                
            })
        
        });
    }


    public render() {
      return (
        <div className="row h-100 justify-content-center align-items-center">
            <form className="col-md-4">
            <table className="table table-striped">
            <tbody>
            <tr>
                <td>
                <div className="form-group">
                    <div>Title</div>
                    <input name="title" type="text" className="form-control" id="0" aria-describedby="titlehelp" placeholder="Title" onChange={this.inputChange} value={this.state.items[0].title}/>
                </div>
                <div className="form-group">
                    <div>Amount</div>
                    <input name="amount" type="number" className="form-control" id="0" placeholder="Amount" onChange={this.inputChange} value={this.state.items[0].amount}/>
                </div>
                <div className="form-group">
                    <div>Description</div>
                    <input name="description" type="text" className="form-control" id="0" placeholder="Description" onChange={this.inputChange} value={this.state.items[0].description}/>
                </div>
                <div className="form-group">
                    <div>Date of Expense</div>
                    <input name="timeOfExpense" type="date" className="form-control" id="0" placeholder="Date of Expense" onChange={this.inputChange} value={this.state.items[0].timeOfExpense}/>
                </div>
                </td>
                </tr>
            {this.state.items.map((item, i) => {
                    if (i === 0) {
                        return;
                    }
                    return this.getItemInputFields(i);
                })}
            </tbody>
            </table>
            <div className="row">
            <div className="col-md-6">
            <button className="btn btn-primary" disabled={!(this.state.items[this.state.items.length-1].title &&
                                    this.state.items[this.state.items.length-1].amount &&
                                    this.state.items[this.state.items.length-1].description &&
                                    this.state.items[this.state.items.length-1].timeOfExpense)}
                onClick={this.addItem} role="button">Add</button>
            </div>
            <div className="col-md-6">
            <button className="btn btn-success text-right" disabled={this.enableSubmit()} type="button" style={{textDecoration: 'none'}}>
            {this.getSubmitLink()}
            </button>
            </div>
            <div className="clearfix"/>
            </div>
            </form>
        </div>
        
      );
    }

    private getSubmitLink = () => {
        if (!this.enableSubmit()) {
            return (
                <a style={{color: 'white'}} href="#/reimbursements/add" onClick={this.submit} role="button">Submit</a>
            );
        } else {
            return (
                <div style={{color: 'white', textDecoration: 'none'}}>Submit</div>
            );
        }
    }

    private enableSubmit = () => {
        for(let i=0; i < this.state.items.length; i++) {
            if (((this.state.items[i].title === "") ||
                (this.state.items[i].amount === "") ||
                (this.state.items[i].description === "") ||
                (this.state.items[i].timeOfExpense === ""))) {
                    
                    return true;
                }

        }
        
        return false;
    }

    private addItem = (e) => {
        this.setState({
            items: this.state.items.concat({
                amount: '',
                description: '',
                timeOfExpense: '',
                title: '',                
            })
        });
    }

    private getItemInputFields = (index) => {
        return (
            <tr key={index}>
                <td>
                    <div className="form-group">
                        <div>Title</div>
                        <input name="title" type="text" className="form-control" id={index.toString()} aria-describedby="titlehelp" placeholder="Title" onChange={this.inputChange} value={this.state.items[index].title}/>
                    </div>
                    <div className="form-group">
                        <div>Amount</div>
                        <input name="amount" type="number" className="form-control" id={index.toString()} placeholder="Amount" onChange={this.inputChange} value={this.state.items[index].amount}/>
                    </div>
                    <div className="form-group">
                        <div>Description</div>
                        <input name="description" type="text" className="form-control" id={index.toString()} placeholder="Description" onChange={this.inputChange} value={this.state.items[index].description}/>
                    </div>
                    <div className="form-group">
                        <div>Date of Expense</div>
                        <input name="timeOfExpense" type="date" className="form-control" id={index.toString()} placeholder="Date of Expense" onChange={this.inputChange} value={this.state.items[index].timeOfExpense}/>
                    </div>
                </td>
                <a className="btn btn-primary" href="#/reimbursements/add" id={index.toString()} onClick={this.removeItem}>Remove</a>
            </tr>
        );
    }

    private removeItem = (e) => {
        const index = parseInt(e.target.id, 10);
        const newItemList = [...this.state.items];
        newItemList.splice(index, 1)
        this.setState({
            ...this.state,
            items: newItemList,
        })
    }

    private inputChange = (e) => {
        const index = parseInt(e.target.id, 10);
        this.setState({
            ...this.state,
            items: this.state.items.map((content, i) => i===index ? {...content, [e.target.name]: e.target.value} : content)
        });
    }    

    private submit = () => {
        const name = location.href;
        const data = { 
            items: this.state.items,
        };
        NetService.postData(('user/request'), data)
            .then((response) => {
                console.log(response);
                this.props.history.push('/reimbursements')
            }).catch((err) => {
                console.log(err);
                
            });
    }
}