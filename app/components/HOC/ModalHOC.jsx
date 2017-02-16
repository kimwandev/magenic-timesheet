import React, {Component} from 'react';


const ModalHOC = (WrappedComponent) => {
    return class ModalHOC extends Component{
        render(){
                if(this.props.showAsModal){
                    if(this.props.show){
                        return (
                            <div className="modal fade in" style={{display: 'block'}}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">{this.props.modalTitle}</h4>
                                    </div>
                                    <div className="modal-body">
                                        <WrappedComponent {...this.props}/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    else{
                        return null;
                    }
                }else{
                    <WrappedComponent {...this.props}/>
                }
                
            }
    }
}

export default ModalHOC;