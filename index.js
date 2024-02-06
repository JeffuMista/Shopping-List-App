import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, push, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-a1088-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addBtn = document.getElementById("add-btn");
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
addBtn.addEventListener("click", function() {
    inputEl.innerText = ""
    ulEl.innerHTML += `<li>${inputEl.value}</li>`
})