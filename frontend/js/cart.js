const cartItemsContainer = document.getElementById("cartItems")
const totalItemsEl = document.getElementById("totalItems")
const totalPriceEl = document.getElementById("totalPrice")

let cart = JSON.parse(localStorage.getItem("cart")) || []

let totalPrice = 0



async function loadCart(){

cartItemsContainer.innerHTML = ""

totalPrice = 0

for(const slug of cart){

try{

const doc = await db.collection("products").doc(slug).get()

if(doc.exists){

const product = doc.data()

addCartItem(slug, product)

}

}catch{}

}

totalItemsEl.textContent = cart.length
totalPriceEl.textContent = "₹" + totalPrice

}



function addCartItem(slug, product){

totalPrice += product.price

const item = document.createElement("div")

item.className = "cart-item"

item.innerHTML = `

<img src="${product.coverImage}">

<div class="cart-info">

<div class="cart-title">${product.title}</div>

<div class="cart-price">₹${product.price}</div>

<button class="remove-btn" onclick="removeItem('${slug}')">
Remove
</button>

</div>

`

cartItemsContainer.appendChild(item)

}



function removeItem(slug){

cart = cart.filter(id => id !== slug)

localStorage.setItem("cart", JSON.stringify(cart))

loadCart()

}



async function syncCartToUser(){

try{

const user = auth.currentUser

if(!user) return

await db.collection("users").doc(user.uid).update({

cart: cart

})

}catch{}

}



document.getElementById("checkoutBtn").onclick = ()=>{

window.location = "checkout.html"

}



loadCart()
syncCartToUser()