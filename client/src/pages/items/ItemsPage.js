import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import TableComponent from '../../components/TableComponent';
import ChartComponent from '../../components/ChartComponent';

const ItemsPage = (props) => {
    const {
        items,
        providers,
        stats,

        getItems,
        getProviders,
        getStats,
        updateItem
    } = props;

    useEffect(() => {
        getItems();
        getProviders();
        getStats(3);
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
                    tableName='Item list'
                    tableStructure={
                        {
                            columns: [
                                { title: 'Name', field: 'name' },
                                { title: 'Price', field: 'price', type: 'numeric' },
                                {
                                    title: 'Provider',
                                    field: 'providerId',
                                    lookup: providers.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {}),
                                },
                                { title: 'Amount', field: 'amount', type: 'numeric' },
                            ],
                            data: items
                            // data: items.map(item => ({ ...item, providerId: item.provider.id }))
                        }
                    }
                    updateItemCallback={updateItem}
                />
            </Grid>
            <Grid item>
                <div style={{width: 600}}>
                    <ChartComponent
                        chartName='Weight sold'
                        data={stats}
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default ItemsPage;
