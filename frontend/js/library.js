const grid = document.getElementById("libraryGrid")
const guestView = document.getElementById("guestView")

const uid = localStorage.getItem("uid")
const signin = localStorage.getItem("signin")



if(signin !== "true"){

grid.style.display = "none"

}else{

guestView.style.display = "none"

loadLibrary()

}



async function loadLibrary(){

try{

const userDoc = await db.collection("users").doc(uid).get()

if(!userDoc.exists) return

const data = userDoc.data()

const purchased = data.purchasedProducts || []



if(purchased.length === 0){

grid.innerHTML = "<p>No purchased products yet.</p>"
return

}



for(const slug of purchased){

const productDoc = await db.collection("products").doc(slug).get()

if(productDoc.exists){

renderProduct(productDoc.data())

}

}

}catch{}

}



function renderProduct(p){

const card = document.createElement("div")

card.className = "library-card"

card.innerHTML = `

<img src="${p.coverImage}" class="library-image">

<div class="library-info">

<div class="library-title">${p.title}</div>

<div class="library-meta">Pages: ${p.pages}</div>

<div class="password-box">
Password: ${p.password}
</div>

<a href="${p.fileURL}" class="download-btn" target="_blank">
Download
</a>

</div>

`

grid.appendChild(card)

}