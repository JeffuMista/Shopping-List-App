import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, push, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-a1088-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addBtn = document.getElementById("add-btn");
const inputEl = document.getElementById("input-el")
const shoppingListEl = document.getElementById("shopping-list")

addBtn.addEventListener("click", function() {
    let inputValue = inputEl.value
    if (inputValue === "") {
        return shoppingListInDB
    } else {
        push(shoppingListInDB, inputValue)

        clearInput()
    }
    
    
})

inputEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let inputValue = inputEl.value
        if (inputValue === "") {
            return shoppingListInDB
        } else {
            push(shoppingListInDB, inputValue)
            clearInput()
        }
    }
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())
    
    clearShoppingListEl()

    for (let i = 0; i < itemsArray.length; i++){
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShoppingListEl(currentItem)
    }
} else {
    shoppingListEl.innerHTML = "No items here ... yet."
}
})

function clearInput() {
    inputEl.value = ""
 }
function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
 }
function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    shoppingListEl.append(newEl)

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
}
