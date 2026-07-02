const express = require('express');
const productRoute = require('./routes/productRoute');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('json spaces', 2);

app.use(express.json());

app.use('/api', productRoute);

app.listen(PORT, () => {
    console.log(`Server Express berjalan secara optimal di http://localhost:${PORT}`);
});