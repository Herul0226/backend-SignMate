const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Initialize Firebase Admin
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<your-database-name>.firebaseio.com'
});

// Middleware
app.use(bodyParser.json());

// Routes for Alphabet Quiz
const alphabetQuizRoutes = require('./alphabet-quiz/quiz-api');
app.use('/alphabet-quiz', alphabetQuizRoutes);

// Routes for Yes or No Quiz
const yesOrNoQuizRoutes = require('./yes-or-no-quiz/quiz-api');
app.use('/yes-or-no-quiz', yesOrNoQuizRoutes);

// Routes for Number Quiz
const numberQuizRoutes = require('./number-quiz/quiz-api');  // Add this line
app.use('/number-quiz', numberQuizRoutes);  // Add this line

// Routes for Edit Profile
const editProfileRoutes = require('./edit-profile/edit-api');
app.use('/user', editProfileRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to SignMate Backend API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
