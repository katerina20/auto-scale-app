const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const app = express();

// app.use(express.static(path.join(__dirname, '../dist/front')));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// app.use((err, req, res) => {
//   res.status(400);
//   res.json({ ...err });
// });

app.listen(process.env.PORT || 4200);

module.exports = app;
