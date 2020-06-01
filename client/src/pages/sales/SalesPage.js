import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import TableComponent from '../../components/TableComponent';
import ChartComponent from '../../components/ChartComponent';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SalesPage = (props) => {
    const {
        transactions,
        statsTransactions,

        getAllOutTransactionsFromApi,
        getTransactionsStatsFromApi,
    } = props;

    useEffect(() => {
        getAllOutTransactionsFromApi();
        getTransactionsStatsFromApi();
    }, []);

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
        >
            <Grid item>
                <TableComponent
                    tableName='Transactions output'
                    tableStructure={
                        {
                            columns: [
                                { title: 'Item', field: 'itemName' },
                                { title: 'Weight', field: 'weight' },
                                { title: 'Price', field: 'price', type: 'numeric' },
                                { title: 'Date', field: 'date' },
                            ],
                            data: transactions.map(tr => ({ ...tr, itemName: tr.item.name }))
                        }
                    }
                />
            </Grid>
            <Grid item>
                <div style={{ width: 600 }}>
                    <ChartComponent
                        chartName='Month'
                        legend={statsTransactions.map(item => item.date)}
                        data={statsTransactions.map(item => item.price_total)}
                        statsItem={{ name: 'Output' }}
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default SalesPage;