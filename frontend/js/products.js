const grid = document.getElementById("productsGrid")
const searchInput = document.getElementById("searchInput")
const categoryBtns = document.querySelectorAll(".category-btn")

let products = []


const demoProducts = [

{
slug:"chatgpt-mastery",
title:"ChatGPT Mastery",
desc:"Learn how to use ChatGPT for productivity and automation.",
price:199,
coverImage:"../assets/images/product1.jpg",
category:"ai"
},

{
slug:"ai-productivity",
title:"AI Productivity Guide",
desc:"Boost your workflow using powerful AI tools.",
price:149,
coverImage:"../assets/images/product2.jpg",
category:"productivity"
},

{
slug:"freelance-starter",
title:"Freelance Starter Kit",
desc:"Step by step guide to start freelancing online.",
price:249,
coverImage:"../assets/images/product3.jpg",
category:"freelancing"
}

]


async function loadProducts(){

try{

const snapshot = await db.collection("products").get()

if(snapshot.empty){
products = demoProducts
}else{
products = snapshot.docs.map(doc => ({
slug: doc.id,
...doc.data()
}))
}

}catch{
products = demoProducts
}

renderProducts(products)

}



function renderProducts(list){

grid.innerHTML=""

list.forEach(p=>{

const card=document.createElement("div")

card.className="product-card"

card.innerHTML=`

<img src="${p.coverImage}" class="product-image">

<div class="product-info">

<h3 class="product-title">${p.title}</h3>

<p class="product-desc">${p.desc}</p>

<div class="product-price">₹${p.price}</div>

<div class="card-buttons">

<button class="cart-btn" onclick="addToCart('${p.slug}')">
Add Cart
</button>

<button class="buy-btn"
onclick="window.location='product.html?id=${p.slug}'">
Buy
</button>

</div>

</div>

`

grid.appendChild(card)

})

}



function addToCart(slug){

let cart = JSON.parse(localStorage.getItem("cart")) || []

if(!cart.includes(slug)){
cart.push(slug)
}

localStorage.setItem("cart", JSON.stringify(cart))

alert("Added to cart")

}



searchInput.addEventListener("input",()=>{

const term=searchInput.value.toLowerCase()

const filtered=products.filter(p=>
p.title.toLowerCase().includes(term)
)

renderProducts(filtered)

})



categoryBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

categoryBtns.forEach(b=>b.classList.remove("active"))
btn.classList.add("active")

const cat=btn.dataset.category

if(cat==="all"){
renderProducts(products)
return
}

const filtered=products.filter(p=>p.category===cat)

renderProducts(filtered)

})

})



loadProducts()