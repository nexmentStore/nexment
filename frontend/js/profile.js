const guestView = document.getElementById("guestView")
const profileView = document.getElementById("profileView")

const usernameEl = document.getElementById("username")
const emailEl = document.getElementById("email")
const createdAtEl = document.getElementById("createdAt")
const totalSpentEl = document.getElementById("totalSpent")

const logoutBtn = document.getElementById("logoutBtn")



const signin = localStorage.getItem("signin")
const uid = localStorage.getItem("uid")



if(signin !== "true"){

profileView.style.display = "none"

}else{

guestView.style.display = "none"

loadProfile()

}



async function loadProfile(){

try{

const doc = await db.collection("users").doc(uid).get()

if(doc.exists){

const data = doc.data()

usernameEl.textContent = data.username

emailEl.textContent = data.email

createdAtEl.textContent = "Joined: " + data.createdAt

totalSpentEl.textContent = "Total Spent: ₹" + data.totalSpent

}

}catch{}

}



logoutBtn.onclick = ()=>{

localStorage.removeItem("signin")

localStorage.removeItem("uid")

window.location = "index.html"

}