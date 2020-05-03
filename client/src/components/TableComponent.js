import React, { useEffect } from 'react';
import MaterialTable from 'material-table';

const TableComponent = (props) => {
    const {
        tableName,
        tableStructure,
        updateItemCallback,
        onTableRowClick
    } = props;

    const [state, setState] = React.useState(tableStructure);

    useEffect(() => {
        setState(tableStructure);
    }, [tableStructure]);

    return (
        <MaterialTable
            style={{ paddingLeft: 10, paddingRight: 10 }}
            title={tableName}
            columns={state.columns}
            data={state.data}
            editable={updateItemCallback && {
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                                updateItemCallback(newData);
                            }
                        }, 600);
                    }),
            }}
            onRowClick={onTableRowClick ? (event, rowData) => onTableRowClick(rowData.id) : null}
        />
    );
};

export default TableComponent;