const menuBtn = document.getElementById("menuBtn")
const sidebar = document.getElementById("sidebar")
const closeSidebar = document.getElementById("closeSidebar")

menuBtn.addEventListener("click", () => {
sidebar.classList.add("active")
})

closeSidebar.addEventListener("click", () => {
sidebar.classList.remove("active")
})