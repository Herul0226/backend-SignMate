const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Array untuk menyimpan informasi login admin
const adminCredentials = {
    username: 'admin',
    password: 'admin'
};

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Route untuk pengecekan login admin
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Periksa apakah username dan password yang dimasukkan sesuai
    if (username === adminCredentials.username && password === adminCredentials.password) {
        res.send('Login berhasil!'); // Atau bisa diarahkan ke halaman admin
    } else {
        res.status(401).send('Username atau password salah.');
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});