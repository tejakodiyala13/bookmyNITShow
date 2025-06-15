import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAz7qSNbyRvwb0nCaGYVl8hSLYfQzvg32Y",
  authDomain: "bookmynitshow.firebaseapp.com",
  projectId: "bookmynitshow",
  storageBucket: "bookmynitshow.firebasestorage.app",
  messagingSenderId: "31713835175",
  appId: "1:31713835175:web:9deb1d51f53dc34cfdc382",
  measurementId: "G-8CG8NC43BY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Login
window.login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(result => {
    const user = result.user;
    document.getElementById('userName').textContent = user.displayName;
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'inline';
  }).catch(console.error);
};

// Logout
window.logout = () => {
  signOut(auth).then(() => {
    document.getElementById('userName').textContent = '';
    document.getElementById('loginBtn').style.display = 'inline';
    document.getElementById('logoutBtn').style.display = 'none';
  });
};

// Booking
window.bookSeat = async (showId, seatNumber) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    await addDoc(collection(db, "bookings"), {
      userId: user.uid,
      showId,
      seatNumber,
      bookedAt: new Date()
    });
    alert(`Seat ${seatNumber} booked successfully!`);
  } catch (error) {
    console.error("Booking error:", error);
    alert("Booking failed.");
  }
};
