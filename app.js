const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config(); // Memuat variabel lingkungan dari .env

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk menyajikan file statis
app.use(express.static('public'));

// Menggunakan variabel lingkungan untuk kredensial admin
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
};

// Routes
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    res.redirect('/dashboard');
  } else {
    // Jika login gagal, render kembali halaman login dengan pesan alert
    res.render('login', { alertMessage: 'Login Gagal. username atau password salah.' });
  }
});


app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
