const express = require('express');
const productRoute = require('./routes/productRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Mengaktifkan format JSON response (Pretty-Print) agar rapi dibaca di browser
app.set('json spaces', 2);

// Middleware internal untuk parsing request body berformat JSON
app.use(express.json());

// Registrasi router spesifik dengan penentuan prefix rute global /api
app.use('/api', productRoute);

// Inisialisasi proses mendengarkan (listening) request pada port target
app.listen(PORT, () => {
    console.log(`Server Express berjalan secara optimal di http://localhost:${PORT}`);
});