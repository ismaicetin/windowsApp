import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Datatable extends Component {
    constructor(props) {
        super(props)
        var checkedValues = []
        var localData = localStorage.getItem(this.props.selectedName) || "[]";
        var checkedValuesName = JSON.parse(localData)
        checkedValuesName.map((item) => {
            checkedValues.push(item.id);
        })
        this.state = {
            checkedValues: checkedValues || [],
            checkedValuesName: checkedValuesName || [],
            myData: this.props.myData
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
        // if (this.props.myData !== nextProps.myData) {
        this.setState({ "myData": nextProps.myData });
        // }
    }

    selectRow = (e, i, name) => {
        var tempCheckedValues = this.state.checkedValues;
        var tempCheckedValuesName = this.state.checkedValuesName;

        if (!e.target.checked) {
            tempCheckedValues = tempCheckedValues.filter((item, j) => i !== item)
            tempCheckedValuesName = tempCheckedValuesName.filter((item) => i !== item.id)
            this.setState({
                checkedValues: tempCheckedValues,
                checkedValuesName: tempCheckedValuesName
            });


        } else {
            tempCheckedValues.push(i);
            tempCheckedValuesName.push({ "id": i, "name": name })
            this.setState({
                checkedValues: tempCheckedValues,
                checkedValuesName: tempCheckedValuesName
            })


        }

        // localStorage.setItem(this.props.selectedName, JSON.stringify(tempCheckedValues))
        localStorage.setItem(this.props.selectedName, JSON.stringify(tempCheckedValuesName))
    }

    handleRemoveRow = () => {
        const selectedValues = this.state.checkedValues;
        const updatedData = this.state.myData.filter(function (el) {
            return selectedValues.indexOf(el.id) < 0;
        });
        this.setState({
            myData: updatedData
        })
        toast.success("Successfully Deleted !")
    };

    renderEditable = (cellInfo) => {
        return (
        
            // <div
            //     style={{ backgroundColor: "#fafafa" }}
            //     contentEditable
            //     suppressContentEditableWarning
            //     onBlur={e => {
            //         const data = [...this.state.myData];
            //         data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            //         console.log(data)
            //         this.setState({ myData: data });
            //     }}
            //     dangerouslySetInnerHTML={{
            //         __html: this.state.myData[cellInfo.index][cellInfo.column.id]
            //     }}
            // />
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.myData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    console.log(data)
                    this.setState({ myData: data });
                }}
            >{this.state.myData[cellInfo.index][cellInfo.column.id]}
            
            </div>
         
        );
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        const { pageSize, myClass, multiSelectOption, pagination } = this.props;
        const { myData } = this.state

        const columns = [];
        columns.push(
            {
                Header: <>
                    #
                </>,
                id: 'select',
                accessor: str => "delete",
                sortable: false,
                style: {
                    textAlign: 'center'
                },
                Cell: (row) => (
                    <div>
                        <span >
                            <input type="checkbox" name={row.original.id} defaultChecked={this.state.checkedValues.includes(row.original.id)}
                                onChange={e => this.selectRow(e, row.original.id, row.original.name)} />
                        </span>
                    </div>
                )
            }
        )
        for (var key in myData[0]) {

            let editable = this.renderEditable
            if (key === "image") {
                editable = null;
            }
            if (key === "status") {
                editable = null;
            }
            if (key === "avtar") {
                editable = null;
            }
            if (key === "vendor") {
                editable = null;
            }
            if (key === "skill") {
                editable = null;
            }
            if (key === "user") {
                editable = null;
            }

            if (key === "id") {
                continue
            }
            columns.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: {
                        textAlign: 'center'
                    }
                });
        }

        if (multiSelectOption === true) {
            columns.push(
                {
                    Header: <>
                        <button className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
                            onClick={
                                (e) => {
                                    if (window.confirm('Are you sure you wish to delete this item?'))
                                        this.handleRemoveRow()
                                }}>Delete</button>
                    </>,
                    id: 'delete',
                    accessor: str => "delete",
                    sortable: false,
                    style: {
                        textAlign: 'center'
                    },
                    Cell: (row) => (
                        <div>
                            <span >
                                <input type="checkbox" name={row.original.id} defaultChecked={this.state.checkedValues.includes(row.original.id)}
                                    onChange={e => this.selectRow(e, row.original.id)} />
                            </span>
                        </div>
                    )
                }
            )
        } else {
            columns.push(
                {
                    Header: <b>Action</b>,
                    id: 'delete',
                    accessor: str => "delete",
                    Cell: (row) => (
                        <div>
                            <span onClick={() => {
                                if (window.confirm('Are you sure you wish to delete this item?')) {
                                    // let data = myData;

                                    row.original["index"] = row.index
                                    this.props.deleteFunction(row.original)

                                    // data.splice(row.index, 1);
                                    // this.setState({ myData: data });
                                    // toast.success("Successfully Deleted !")
                                }

                            }}>
                                <i className="btn fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e' }}
                                ></i>
                            </span>

                            <span onClick={() => {
                                row.original["index"] = row.index
                                this.props.editFunction(row.original)
                            }}><i className="btn fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span>
                        </div>
                    ),
                    style: {
                        textAlign: 'center'
                    },
                    sortable: false
                }
            )
        }

        return (
            <Fragment>
                <ReactTable
                    data={myData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showFilters={true}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    SubComponent={this.props.SubComponent}
                />
                <ToastContainer />
            </Fragment>
        )
    }
}

export default Datatable;



// <ReactTable
//     data={data}
//     filterable
//     defaultFilterMethod={(filter, row) =>
//         String(row[filter.id]) === filter.value}
//     columns={[
//         {
//             Header: "Name",
//             columns: [
//                 {
//                     Header: "First Name",
//                     accessor: "firstName",
//                     filterMethod: (filter, row) =>
//                         row[filter.id].startsWith(filter.value) &&
//                         row[filter.id].endsWith(filter.value)
//                 },

//                 {
//                     Header: "Over 21",
//                     accessor: "age",
//                     id: "over",
//                     Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
//                     filterMethod: (filter, row) => {
//                         if (filter.value === "all") {
//                             return true;
//                         }
//                         if (filter.value === "true") {
//                             return row[filter.id] >= 21;
//                         }
//                         return row[filter.id] < 21;
//                     },
//                     Filter: ({ filter, onChange }) =>
//                         <select
//                             onChange={event => onChange(event.target.value)}
//                             style={{ width: "100%" }}
//                             value={filter ? filter.value : "all"}
//                         >
//                             <option value="all">Show All</option>
//                             <option value="true">Can Drink</option>
//                             <option value="false">Can't Drink</option>
//                         </select>
//                 }