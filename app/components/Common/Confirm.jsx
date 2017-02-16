import React, {Component} from 'react';
import ModalHOC from '../HOC/ModalHOC.jsx';

class Confirm extends Component{
    render(){
         return (
            <div>
                <div className="text-center">{this.props.confirmMessage}</div>
                <div className="row">
                    <div className="col-sm-6">
                        <button className="btn btn-warning btn-block" onClick={this.props.onCancel}>No</button>
                    </div>
                    <div className="col-sm-6">
                        <button className="btn btn-primary btn-block" onClick={this.props.onConfirm}>Yes</button>
                    </div>
                </div>
            </div>
         )
    }        
}

export default ModalHOC(Confirm);