const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const salesRoutes = require('./routes/salesRoutes');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 8080;


app.use(cors({
    origin: 'http://localhost:3000'
}))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api/sales', salesRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
