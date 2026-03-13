const email = document.getElementById("email")
const password = document.getElementById("password")
const username = document.getElementById("username")

const authBtn = document.getElementById("authBtn")
const googleBtn = document.getElementById("googleBtn")

const toggleAuth = document.getElementById("toggleAuth")
const toggleText = document.getElementById("toggleText")

const signupFields = document.getElementById("signupFields")
const authTitle = document.getElementById("authTitle")



let isSignup = localStorage.getItem("signup") !== "false"



function updateUI(){

if(isSignup){

authTitle.textContent = "Create Account"
authBtn.textContent = "Sign Up"

signupFields.style.display = "block"

toggleText.textContent = "Already have an account?"
toggleAuth.textContent = "Sign In"

}else{

authTitle.textContent = "Sign In"
authBtn.textContent = "Sign In"

signupFields.style.display = "none"

toggleText.textContent = "Don't have an account?"
toggleAuth.textContent = "Sign Up"

}

}



toggleAuth.onclick = ()=>{

isSignup = !isSignup

localStorage.setItem("signup", isSignup)

updateUI()

}



authBtn.onclick = async ()=>{

const mail = email.value
const pass = password.value



if(isSignup){

const name = username.value

const userCred = await auth.createUserWithEmailAndPassword(mail, pass)

const uid = userCred.user.uid

localStorage.setItem("uid", uid)
localStorage.setItem("signin", "true")



await db.collection("users").doc(uid).set({

username: name,
email: mail,
createdAt: new Date().toISOString(),

cart: [],
purchasedProducts: [],
totalSpent: 0

})



window.location = "profile.html"



}else{

const userCred = await auth.signInWithEmailAndPassword(mail, pass)

const uid = userCred.user.uid

localStorage.setItem("uid", uid)
localStorage.setItem("signin", "true")

window.location = "profile.html"

}

}



googleBtn.onclick = async ()=>{

const provider = new firebase.auth.GoogleAuthProvider()

const result = await auth.signInWithPopup(provider)

const user = result.user

localStorage.setItem("uid", user.uid)
localStorage.setItem("signin", "true")



const doc = await db.collection("users").doc(user.uid).get()

if(!doc.exists){

await db.collection("users").doc(user.uid).set({

username: user.displayName,
email: user.email,
createdAt: new Date().toISOString(),

cart: [],
purchasedProducts: [],
totalSpent: 0

})

}



window.location = "profile.html"

}



updateUI()