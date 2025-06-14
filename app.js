
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAz7qSNbyRvwb0nCaGYVl8hSLYfQzvg32Y",
  authDomain: "bookmynitshow.firebaseapp.com",
  projectId: "bookmynitshow",
  storageBucket: "bookmynitshow.firebasestorage.app",
  messagingSenderId: "31713835175",
  appId: "1:31713835175:web:9deb1d51f53dc34cfdc382",
  measurementId: "G-8CG8NC43BY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

window.login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(result => {
    const user = result.user;
    document.getElementById('userName').textContent = user.displayName;
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'inline';
  }).catch(console.error);
}

window.logout = () => {
  signOut(auth).then(() => {
    document.getElementById('userName').textContent = '';
    document.getElementById('loginBtn').style.display = 'inline';
    document.getElementById('logoutBtn').style.display = 'none';
  });
}
