const firebaseConfig = {
  apiKey: "AIzaSyBGE7ujkB8XCVe7W-VhSiyE_mmj9j0YASw",
  authDomain: "nexment-store.firebaseapp.com",
  projectId: "nexment-store",
  storageBucket: "nexment-store.firebasestorage.app",
  messagingSenderId: "876795949038",
  appId: "1:876795949038:web:c55e6a7b13c00a9c2f68ff"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();