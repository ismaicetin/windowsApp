import React from "react";
// import { render } from "react-dom";
// import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import checkboxHOC from "react-table/lib/hoc/selectTable";
const CheckboxTable = checkboxHOC(ReactTable);



function getColumns(data) {
    const columns = [];
    const sample = data[0];
    Object.keys(sample).forEach(key => {
        if (key !== "_id" && key !== "children") {
            columns.push({
                accessor: key,
                Header: key
            });
        }
    });
    console.log(columns);
    return columns;
}

class Datatable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myData: props.myData,
            columns: props.columns ? props.columns : getColumns(),
            selection: [],
            selectAll: false
        };
    }


    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
        // if (this.props.myData !== nextProps.myData) {
        this.setState({ "myData": nextProps.myData });
        // }
    }
    toggleSelection = (key, shift, row) => {
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        if (keyIndex >= 0) {
            selection = [
                ...selection.slice(0, keyIndex),
                ...selection.slice(keyIndex + 1)
            ];
        } else {
            selection.push(key);
        }
        this.setState({ selection });
    };

    toggleAll = () => {
        const selectAll = this.state.selectAll ? false : true;
        const selection = [];
        if (selectAll) {
            const wrappedInstance = this.checkboxTable.getWrappedInstance();
            const currentRecords = wrappedInstance.getResolvedState().sortedData;
            currentRecords.forEach(item => {
                selection.push(item._original._id);
            });
        }
        this.setState({ selectAll, selection });
    };

    isSelected = key => {
        return this.state.selection.includes(key);
    };

    logSelection = () => {
        console.log("selection:", this.state.selection);
        console.log("data:", this.state.data);
        console.log("columns:", this.state.columns);
    };

    render() {
        const { toggleSelection, toggleAll, isSelected, logSelection } = this;
        const { myData, columns, selectAll } = this.state;


        return (
            <div>
                <button onClick={logSelection}>Log Selection</button>
                <CheckboxTable
                    ref={r => (this.checkboxTable = r)}
                    data={myData}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    SubComponent={row => {
                        return <span style={{ "margin-left": "30px" }}>sdsd</span>;
                    }}
                    selectAll={selectAll}
                    isSelected={isSelected}
                    toggleSelection={toggleSelection}
                    toggleAll={toggleAll}
                    selectType="checkbox"
                    getTrProps={(state, rowInfo, instance) => {
                        console.log("r", rowInfo)
                        if (rowInfo) {
                            const selected = this.isSelected(rowInfo.original._id);
                            return {
                                style: {
                                    backgroundColor: selected ? "lightgreen" : "inherit",
                                    // background: rowInfo.row.age > 20 ? 'red' : 'green',
                                    color: 'black'
                                }
                            }
                        }
                        return {};
                    }}
                />
            </div>
        );
    }
}


export default Datatable;