const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const app = express();

app.use(express.static(path.join(__dirname, './client/build')));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    });
});

app.listen(process.env.PORT || 4200);

module.exports = app;
