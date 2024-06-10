const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();
router.get('/profile', async (req, res) => {
    const { email } = req.query;
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    try {
      const userRef = db.collection('users').where('email', '==', email);
      const snapshot = await userRef.get();
  
      if (snapshot.empty) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userData = snapshot.docs[0].data();
      res.json(userData);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving user profile' });
    }
  });
// Edit User Profile
router.post('/edit', async (req, res) => {
  const { email, name, photo, gender, birthDate, phoneNumber } = req.body;

  try {
    const userRef = db.collection('users').doc(email);
    await userRef.update({ name, photo, gender, birthDate, phoneNumber });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user profile' });
  }
});

module.exports = router;
