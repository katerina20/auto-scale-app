import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

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

const ItemsPage = (props) => {
    const classes = useStyles();
    const {
        items,
        providers,
        stats,
        statsItem,

        getItems,
        getProviders,
        getStats,
        updateItem,
        addSupply
    } = props;

    const [open, setOpen] = React.useState(false);
    const [item, setItem] = React.useState('');
    const [amount, setAmount] = React.useState('');

    const handleClickOpen = () => setOpen(true);

    const submit = () => {
        setOpen(false);

        if (item !== '' && amount !== '') {
            const index = items.findIndex(i => i.id === item);
            if (index < 0) return alert('Something wrong');
            addSupply(items[index], amount);
        }

        setItem('');
        setAmount('');
    };

    const handleChangeSelect = (event) => {
        setItem(event.target.value);
    };

    const handleChangeInput = (event) => {
        setAmount(event.target.value);
    };

    useEffect(() => {
        getItems();
        getProviders();
        getStats(1);
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
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: 10 }}
                    onClick={handleClickOpen}
                >
                    New Supply
                </Button>
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
                        }
                    }
                    updateItemCallback={updateItem}
                    onTableRowClick={getStats}
                />
            </Grid>
            <Grid item>
                <div style={{ width: 600 }}>
                    <ChartComponent
                        chartName='Weight sold'
                        legend={stats.map(item => item.date_m)}
                        data={stats.map(item => item.weight_total)}
                        statsItem={statsItem}
                    />
                </div>
            </Grid>
            <Dialog
                open={open}
                maxWidth='xs'
                onClose={() => setOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">{"New Supply"}</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <Select
                            fullWidth
                            value={item}
                            onChange={handleChangeSelect}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            <MenuItem value="" disabled>Item</MenuItem>
                            {items.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                        <TextField
                            style={{ marginTop: 10 }}
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={handleChangeInput}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submit} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default ItemsPage;