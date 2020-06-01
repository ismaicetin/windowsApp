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

        var OriginalData =[ ...this.props.myData]
        var myData = this.props.myData.map((item) => {
            item["M"] = false   ///modifiy 
            return item
        })


        this.state = {
            checkedValues: checkedValues || [],
            checkedValuesName: checkedValuesName || [],
            OriginalData: [...OriginalData],
            myData: [...myData]
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

    handleChange = (cellInfo, value) => {
        const data = [...this.state.myData];
        if (data[cellInfo.index][cellInfo.column.id] != value) {
            data[cellInfo.index][cellInfo.column.id] = value;
            data[cellInfo.index].M = true
            console.log(data)
            this.setState({ myData: data });
        }
    }
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
                style={{ backgroundColor: "#fafafa" }}>
                {cellInfo.index === this.state.selected ?
                    <input type="text" className="form-control" placeholder={cellInfo.column["id"]}
                        defaultValue={this.state.myData[cellInfo.index][cellInfo.column["id"]] ? this.state.myData[cellInfo.index][cellInfo.column["id"]] : ""}
                        onBlur={e => {
                            this.handleChange(cellInfo, e.target.value)
                            // const data = [...this.state.myData];
                            // data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                            // console.log(data)
                            // this.setState({ myData: data });
                        }}
                    /> :
                    this.state.myData[cellInfo.index][cellInfo.column.id]
                }</div>


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
                        {row.original.id ?
                            <span >
                                <input type="checkbox" className="form-control" name={row.original.id} defaultChecked={this.state.checkedValues.includes(row.original.id)}
                                    onChange={e => this.selectRow(e, row.original.id, row.original.name)} />
                            </span> : ""}
                    </div>
                ),
                filterable: false,
            }
        )
      
        columns.push(
            {
                Header: <b>{this.Capitalize("amount".toString())}</b>,
                accessor: "amount",
                Cell: this.renderEditable,
                style: {
                    textAlign: 'center'
                }
            });
        columns.push(
            {
                Header: <b>{this.Capitalize("exchange Info".toString())}</b>,
                accessor: "exchangeInfo",
                Cell: this.renderEditable,
                style: {
                    textAlign: 'center'
                }
            });
        columns.push(
            {
                Header: <b>{this.Capitalize("order BookId".toString())}</b>,
                accessor: "orderBookId",
                Cell: false,
                style: {
                    textAlign: 'center'
                }
            });
        columns.push(
            {
                Header: <b>{this.Capitalize("security Name".toString())}</b>,
                accessor: "securityName",
                Cell: this.renderEditable,
                style: {
                    textAlign: 'center'
                }
            });
        columns.push(
            {
                Header: <b>{this.Capitalize("price".toString())}</b>,
                accessor: "price",
                Cell: this.renderEditable,
                style: {
                    textAlign: 'center'
                }
            });
        columns.push(
            {
                Header: <b>{this.Capitalize("side".toString())}</b>,
                accessor: "side",
                Cell: (cellInfo) => {
                    return (

                        cellInfo.index === this.state.selected ?
                            <select
                                className="form-control"
                                onChange={e => {
                                    this.handleChange(cellInfo, e.target.value)
                                }}
                                style={{ width: "100%" }}
                                value={cellInfo.value}
                            >
                                <option value="B">Buy</option>
                                <option value="S">Sell</option>
                            </select>
                            : cellInfo.value


                    );
                },
                style: {
                    textAlign: 'center'
                },
                // Cell: ({ value }) => (value == "B" ? "Buy" : "Sell"),
                filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                        return true;
                    }
                    else return row[filter.id] == filter.value;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                        <option value="all">Show All</option>
                        <option value="B">Buy</option>
                        <option value="S">Sell</option>
                    </select>
            });
        // columns.push(
        //     {
        //         Header: <b>{this.Capitalize("priceDecimalFactor".toString())}</b>,
        //         accessor: "priceDecimalFactor",
        //         Cell: false,
        //         style: {
        //             textAlign: 'center'
        //         }
        //     });






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
                    filterable: false,
                    Cell: (row) => (
                        <div>
                            {!row.original.id ?

                                <button className="btn btn-success btn-sm btn-block"
                                    onClick={() => {
                                        this.props.editFunction(row.original)
                                        const data = [...this.state.myData];
                                        data[row.index].M = false
                                        console.log(data)
                                        this.setState({ myData: data });
                                    }} >

                                    Save
                                </button>


                                :
                                row.original.M ? <>
                                    <button className="btn btn-success btn-sm btn-block"
                                        onClick={() => {
                                            this.props.editFunction(row.original)
                                            const data = [...this.state.myData];
                                            data[row.index].M = false
                                            console.log(data)
                                            this.setState({ myData: data });
                                        }} >

                                        Update
                                </button>
                                    <button className="btn btn-danger btn-sm btn-block"
                                        onClick={() => {
                                            this.props.editFunction(row.original)
                                            const data = [...this.state.myData];
                                            var filter=this.state.OriginalData.filter((item)=>{
                                                return row.original.id == item.id
                                            })
                                            data[row.index]=filter[0]

                                            data[row.index]["M"] = false
                                            console.log(data)
                                            this.setState({ myData: data });
                                        }} >

                                        Cancel
                                </button>

                                </>
                                    :
                                    <span onClick={() => {
                                        if (window.confirm('Are you sure you wish to delete this item?')) {
                                            let data = [...this.state.myData];

                                            row.original["index"] = row.index
                                            this.props.deleteFunction(row.original)

                                            data.splice(row.index, 1);
                                            this.setState({ myData: data });
                                            // toast.success("Successfully Deleted !")
                                        }

                                    }}>
                                        <i className="btn fa fa-trash"
                                            style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e' }}
                                        ></i>
                                    </span>
                            }

                            {/* <span onClick={() => {
                                row.original["index"] = row.index
                                this.props.editFunction(row.original)
                            }}><i className="btn fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span> */}
                        </div>
                    ),
                    style: {
                        textAlign: 'center'
                    },
                    sortable: false
                }
            )
        }



        var UpdateAll = myData.filter((item) => item.id).map(function (item) { return item.M })
            .reduce(function (acc, score) {
                if (score) acc++
                return acc
            }, 0);

        return (
            <Fragment>
                {UpdateAll > 1 && <button className="btn btn-success btn-lg btn-block"
                    onClick={() => {

                    }} >
                    Update All
                    </button>
                }
                <button className="btn btn-success btn-lg "
                    onClick={() => {

                        var neww = {

                            "amount": "",
                            "exchangeInfo": "", //account  
                            "securityName": "",
                            "price": "",
                            "side": "",
                            "M": true
                        };
                        var data = [neww, ...this.state.myData];
                        console.log(data)
                        this.setState({ myData: data });

                    }} >
                    addNew
                    </button>
                <ReactTable
                    data={myData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showFilters={true}
                    filterable
                    // defaultFilterMethod={(filter, row) =>
                    //     String(row[filter.id]) === filter.value}
                    // SubComponent={this.props.SubComponent}
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                onClick: (e) => {
                                    if (rowInfo.index !== this.state.selected) {
                                        this.setState({
                                            selected: rowInfo.index
                                        })
                                    }
                                },
                                style: {
                                    background: rowInfo.original.M || !rowInfo.original.id ? '#00afec' : 'white',
                                    color: rowInfo.original.M ? 'white' : 'black'

                                }
                            }
                        } else {
                            return {}
                        }
                    }
                    }
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