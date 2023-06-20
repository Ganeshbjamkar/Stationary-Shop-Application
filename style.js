function addItem(itemName) {
    var quantityInput = document.querySelector(`input[data-item="${itemName}"]`);
    var quantity = parseInt(quantityInput.value);

    // Validate quantity
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    var itemData = {
        itemName: itemName,
        quantity: quantity
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://crudcrud.com/api/da7e12120b834c448db67187e444f792/itemdata", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                alert(quantity + " " + itemName + "(s) added to backend!");

                // Add item to the screen
                var addedItemsDiv = document.getElementById("addedItems");
                var newItemDiv = document.createElement("div");
                newItemDiv.textContent = quantity + " " + itemName + "(s)";
                addedItemsDiv.appendChild(newItemDiv);

                quantityInput.value = 0; // Reset quantity to 0
            } else {
                alert("Failed to add item to backend. Please try again later.");
            }

            // Retrieve updated inventory from the backend
            retrieveInventory();
        }
    };

    xhr.send(JSON.stringify(itemData));
}

function retrieveInventory() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://crudcrud.com/api/da7e12120b834c448db67187e444f792/itemdata", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var inventory = JSON.parse(xhr.responseText);

            // Display inventory on the screen
            var inventoryDiv = document.getElementById("inventory");
            inventoryDiv.innerHTML = ""; // Clear previous inventory

            for (var i = 0; i < inventory.length; i++) {
                var item = inventory[i];
                var itemDiv = document.createElement("div");
                itemDiv.textContent = item.quantity + " " + item.itemName + "(s)";
                inventoryDiv.appendChild(itemDiv);
            }
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            alert("Failed to retrieve inventory. Please try again later.");
        }
    };

    xhr.send();
}

// Retrieve initial inventory on page load
window.onload = function () {
    retrieveInventory();
};



