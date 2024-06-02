// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Function to handle login state
auth.onAuthStateChanged(user => {
  const welcomeMessage = document.getElementById('welcome-message');
  const logoutButton = document.getElementById('logout-button');

  if (user) {
    // User is signed in.
    const displayName = user.displayName;
    const email = user.email;

    welcomeMessage.innerText = `Hello, ${displayName || email}! Welcome to your dashboard.`;
    logoutButton.style.display = 'block';

    // Fetch user data from Firestore
    fetchUsers();
  } else {
    // No user is signed in.
    welcomeMessage.innerText = 'You are not logged in.';
    logoutButton.style.display = 'none';
  }
});

// Logout function
document.getElementById('logout-button').addEventListener('click', () => {
  auth.signOut().then(() => {
    console.log('User signed out.');
  }).catch(error => {
    console.error('Sign Out Error', error);
  });
});

// Function to fetch users from Firestore
function fetchUsers() {
  db.collection('users').get().then(snapshot => {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = ''; // Clear existing data

    snapshot.forEach(doc => {
      const user = doc.data();
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.displayName || 'N/A'}</td>
        <td>${user.email}</td>
        <td>${doc.id}</td>
      `;
      usersList.appendChild(row);
    });
  }).catch(error => {
    console.error('Error fetching users:', error);
  });
}
