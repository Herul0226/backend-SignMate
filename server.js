const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config(); // Memuat variabel lingkungan dari .env

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk menyajikan file statis
app.use(express.static('public'));

// Session middleware
app.use(session({
  secret: 'secret', // Anda harus mengganti ini dengan string acak untuk keamanan yang lebih baik
  resave: false,
  saveUninitialized: true
}));

// Flash middleware
app.use(flash());

// Menggunakan variabel lingkungan untuk kredensial admin
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
};

// Routes
app.get('/', (req, res) => {
  res.render('login', { alertMessage: req.flash('error') });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    res.redirect('/dashboard');
  } else {
    // Jika login gagal, tambahkan pesan error ke flash dan redirect ke halaman login
    req.flash('error', 'Login Gagal. Username atau password salah.');
    res.redirect('/');
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
