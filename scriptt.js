let groceryList = JSON.parse(localStorage.getItem("groceryList")) || [];
let totalExpense = parseFloat(localStorage.getItem("totalExpense")) || 0;

const listEl = document.getElementById("groceryList");
const totalExpenseEl = document.getElementById("totalExpense");

function renderList() {
    listEl.innerHTML = "";
    groceryList.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = item.purchased ? "purchased" : "";
        li.innerHTML = `
            ${item.name} (${item.qty}) - ${item.category}
            <div>
                <button onclick="markPurchased(${index})"><i class="fa fa-check"></i></button>
                <button onclick="deleteItem(${index})"><i class="fa fa-trash"></i></button>
            </div>
        `;
        listEl.appendChild(li);
    });
    totalExpenseEl.textContent = totalExpense.toFixed(2);
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
    localStorage.setItem("totalExpense", totalExpense);
}

function addItem() {
    const name = document.getElementById("itemName").value.trim();
    const qty = document.getElementById("itemQty").value.trim();
    const category = document.getElementById("itemCategory").value.trim();

    if (name && qty && category) {
        groceryList.push({ name, qty, category, purchased: false });
        renderList();
        document.getElementById("itemName").value = "";
        document.getElementById("itemQty").value = "";
        document.getElementById("itemCategory").value = "";
    } else {
        alert("Please fill all fields!");
    }
}

function markPurchased(index) {
    if (!groceryList[index].purchased) {
        let cost = prompt("Enter cost of " + groceryList[index].name);
        if (cost && !isNaN(cost)) {
            totalExpense += parseFloat(cost);
        }
    }
    groceryList[index].purchased = true;
    renderList();
}

function deleteItem(index) {
    if (confirm("Delete this item?")) {
        groceryList.splice(index, 1);
        renderList();
    }
}

function clearAll() {
    if (confirm("Clear all data?")) {
        groceryList = [];
        totalExpense = 0;
        renderList();
    }
}

document.getElementById("addItemBtn").addEventListener("click", addItem);
document.getElementById("clearAllBtn").addEventListener("click", clearAll);

document.getElementById("searchItem").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    document.querySelectorAll("#groceryList li").forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(searchValue) ? "" : "none";
    });
});

renderList();
