const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mock = require('./food_inventory.json');

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.get('/api/inventory/items', (req, res) => {
    res.json(mock);
});

app.get('/api/health', (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => console.log(`CFS backend running on port:${port}`));
