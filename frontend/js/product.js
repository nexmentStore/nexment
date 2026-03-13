const params = new URLSearchParams(window.location.search)
const slug = params.get("id")

const image = document.getElementById("productImage")
const title = document.getElementById("productTitle")
const desc = document.getElementById("productDesc")
const pages = document.getElementById("productPages")
const category = document.getElementById("productCategory")
const date = document.getElementById("productDate")
const buyers = document.getElementById("productBuyers")
const price = document.getElementById("productPrice")

const details = document.getElementById("productDetails")
const whyList = document.getElementById("whyList")

const cartBtn = document.getElementById("cartBtn")
const buyBtn = document.getElementById("buyBtn")



const demoProducts = {

"chatgpt-mastery":{
title:"ChatGPT Mastery",
desc:"Learn how to use ChatGPT for productivity and automation.",
price:199,
pages:120,
category:"AI",
buyers:54,
createdAt:"12-02-2026",
details:"This ebook teaches how to effectively use ChatGPT for productivity, learning, and freelancing.",
whyToStudy:"Understand AI workflows---Improve productivity with AI tools---Apply ChatGPT in real projects",
coverImage:"../assets/images/product1.jpg"
}

}



async function loadProduct(){

let product

try{

const doc = await db.collection("products").doc(slug).get()

if(doc.exists){
product = doc.data()
}else{
product = demoProducts[slug]
}

}catch{

product = demoProducts[slug]

}

renderProduct(product)

}



function renderProduct(p){

image.src = p.coverImage
title.textContent = p.title
desc.textContent = p.desc

pages.textContent = "Pages: " + p.pages
category.textContent = "Category: " + p.category
date.textContent = "Published: " + p.createdAt
buyers.textContent = "Bought by: " + p.buyers + " learners"

price.textContent = "₹" + p.price

details.textContent = p.details

const points = p.whyToStudy.split("---")

whyList.innerHTML = ""

points.forEach(point => {

const li = document.createElement("li")
li.textContent = point
whyList.appendChild(li)

})

}



cartBtn.onclick = ()=>{

let cart = JSON.parse(localStorage.getItem("cart")) || []

if(!cart.includes(slug)){
cart.push(slug)
}

localStorage.setItem("cart", JSON.stringify(cart))

alert("Added to cart")

}



buyBtn.onclick = ()=>{

window.location = "cart.html"

}



loadProduct()