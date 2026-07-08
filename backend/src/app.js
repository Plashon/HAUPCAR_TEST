const express = require('express');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cars', carRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;