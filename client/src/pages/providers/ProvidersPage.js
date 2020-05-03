import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import TableComponent from '../../components/TableComponent';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ProvidersPage = (props) => {
    const classes = useStyles();
    const {
        providers,
        transactions,

        getProviders,
        addProvider,
        updateProvider,
        getAllInTransactionsFromApi,
    } = props;

    const [open, setOpen] = React.useState(false);
    const [newProvider, setNewProvider] = React.useState({
        name: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        getProviders();
        getAllInTransactionsFromApi();
    }, []);

    const handleClickOpen = () => setOpen(true);

    const submit = () => {
        setOpen(false);

        if (newProvider.name !== '' && newProvider.phone !== '' && newProvider.address !== '') {
            addProvider(newProvider);
        }

        setNewProvider({
            name: '',
            phone: '',
            address: ''
        });
    };

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
                    Add provider
                </Button>
                <TableComponent
                    tableName='Providers list'
                    tableStructure={
                        {
                            columns: [
                                { title: 'Name', field: 'name' },
                                { title: 'Phone number', field: 'phone' },
                                { title: 'Address', field: 'address' },
                            ],
                            data: providers
                        }
                    }
                    updateItemCallback={updateProvider}
                />
            </Grid>
            <Grid item>
                <TableComponent
                    tableName='Transactions input'
                    tableStructure={
                        {
                            columns: [
                                { title: 'Item', field: 'itemName' },
                                { title: 'Weight', field: 'weight' },
                                { title: 'Date', field: 'date' },
                            ],
                            data: transactions.map(tr => ({ ...tr, itemName: tr.item.name }))
                        }
                    }
                />
            </Grid>
            <Dialog
                open={open}
                maxWidth='xs'
                onClose={() => setOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">{"New Provider"}</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <TextField
                            style={{ marginTop: 10 }}
                            label="Name"
                            value={newProvider.name}
                            onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                        />
                        <TextField
                            style={{ marginTop: 10 }}
                            label="Phone"
                            value={newProvider.phone}
                            onChange={(e) => setNewProvider({ ...newProvider, phone: e.target.value })}
                        />
                        <TextField
                            style={{ marginTop: 10 }}
                            label="Address"
                            value={newProvider.address}
                            onChange={(e) => setNewProvider({ ...newProvider, address: e.target.value })}
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

export default ProvidersPage;