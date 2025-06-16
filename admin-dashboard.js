
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAz7qSNbyRvwb0nCaGYVl8hSLYfQzvg32Y",
  authDomain: "bookmynitshow.firebaseapp.com",
  projectId: "bookmynitshow",
  storageBucket: "bookmynitshow.appspot.com",
  messagingSenderId: "31713835175",
  appId: "1:31713835175:web:9deb1d51f53dc34cfdc382",
  measurementId: "G-8CG8NC43BY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function showAllBookings() {
  const colRef = collection(db, "shows");
  const snapshot = await getDocs(colRef);
  const tableBody = document.querySelector("#bookingTable tbody");
  snapshot.forEach(doc => {
    const showTime = doc.id;
    const showData = doc.data();
    const bookings = showData.booked || [];
    bookings.forEach(b => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${showTime}</td><td>${b.seat}</td><td>${b.user}</td><td>${new Date(b.timestamp).toLocaleString()}</td>`;
      tableBody.appendChild(row);
    });
  });
}

showAllBookings();
