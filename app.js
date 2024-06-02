const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Memuat variabel lingkungan dari .env

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
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
    res.send('Login Failed. Invalid username or password.');
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