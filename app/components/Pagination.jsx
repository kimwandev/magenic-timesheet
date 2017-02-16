import React, {Component} from 'react';
import Dropdown from './Dropdown.jsx';

export default class Pagination extends Component{
    constructor(props){
        super(props);
    }

    getClass(page){
        let btnClass = 'btn ';
        if(page == this.props.currentPage){
            btnClass += 'btn-primary';
        }
        else{
            btnClass += 'btn-default';
        }
        return btnClass;
    }
    
    handlePreviousPage(){
        if(this.props.currentPage > 1){
            this.props.handlePageChange(this.props.currentPage - 1);
        }
    }
    handleNextPage(){
        if(this.props.currentPage < this.props.lastPage){
            this.props.handlePageChange(this.props.currentPage + 1);
        }
    }

    renderPageNumberButtons(){
        let pageNumberButtons = [];
        for(let i = 1; i <= this.props.lastPage; i++){
            pageNumberButtons.push(<button key={i} className={this.getClass(i)} onClick={this.props.handlePageChange.bind(null, i)}>{i}</button>);
        }

        return pageNumberButtons;
    }

    getPageSizeOptions(){
        let pageSizeOptions = [];
        pageSizeOptions.push({value: 5, text: 5});
        pageSizeOptions.push({value: 10, text: 10});
        pageSizeOptions.push({value: 25, text: 25});
        pageSizeOptions.push({value: 50, text: 50});
        return pageSizeOptions;
    }

    render(){
        return (
            <div className="row form-group">
                <div className="col-sm-12">
                    <div className="pull-right btn-group">
                        <button className="btn btn-default" disabled={this.props.currentPage == 1} onClick={this.handlePreviousPage}>Previous</button>
                            {this.renderPageNumberButtons()}
                        <button className="btn btn-default" disabled={this.props.currentPage == this.props.lastPage} onClick={this.handleNextPage}>Next</button>
                    </div>              
                    <div className="pull-right page-size">
                          <Dropdown options={this.getPageSizeOptions()} selectedValue={this.props.pageSize} selectHandler={this.props.onPagSizeChanged} />
                    </div>
                </div> 
            </div>
        )
    }
}

Pagination.propTypes = {
        totalItemCount: React.PropTypes.number.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        handlePageChange: React.PropTypes.func.isRequired,
        lastPage: React.PropTypes.number.isRequired,
        onPagSizeChanged: React.PropTypes.func
}