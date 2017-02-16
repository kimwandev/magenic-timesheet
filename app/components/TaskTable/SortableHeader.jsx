import React, {Component} from 'react';

export default class SortableHeader extends Component{
    constructor(props){
        super(props);

        this.onSort = this.onSort.bind(this);
        this.getColumnClass = this.getColumnClass.bind(this);
    }

    onSort(sortBy){
        if(sortBy == null){
            return;
        }

        if(this.props.sortBy != sortBy || !sortBy){
            this.props.sortHandler(sortBy, 'asc');
        } 
        else{
            if(this.props.sortOrder == 'asc'){
                this.props.sortHandler(sortBy, 'desc');
            }
            else if(this.props.sortOrder == 'desc'){
                this.props.sortHandler(sortBy, 'asc');
            }
        }
    }
    
    getColumnClass(sortName){
        if(sortName){
            return 'sortable';
        }
        else{
            return 'disabled';
        }
    }

    render(){
        return (
            <tr>
                {this.props.headerData.map((header) => {
                    return (
                        <td key={header.sortName} className={this.getColumnClass(header.sortName)} onClick={this.onSort.bind(null, header.sortName)}>
                            {header.title}
                            {this.props.sortOrder == 'asc' && this.props.sortBy == header.sortName ? <span className="pull-right"><i className="fa fa-chevron-down"></i></span> : null}
                            {this.props.sortOrder == 'desc' && this.props.sortBy == header.sortName ? <span className="pull-right"><i className="fa fa-chevron-up"></i></span> : null}
                        </td>
                    )
                })}
            </tr>
        )
    }
};

SortableHeader.propTypes= {
    sortOrder: React.PropTypes.string,
    sortBy: React.PropTypes.string,
    sortHandler: React.PropTypes.func.isRequired,
    headerData: React.PropTypes.array.isRequired
}