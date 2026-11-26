
const productList = document.getElementById("productList");
const productForm = document.getElementById("productForm");
const message = document.getElementById("message");

// Fetch and display products
async function getProducts() {
    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Unable to fetch products");
        }

        const products = await response.json();

        // Clear previous products
        productList.innerHTML = "";

        // Create product cards dynamically
        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            const title = document.createElement("h3");
            title.textContent = product.name;

            const id = document.createElement("p");
            id.textContent = `ID: ${product.id}`;

            const price = document.createElement("p");
            price.textContent = `Price: ₹${product.price}`;

            const rating = document.createElement("p");
            rating.textContent = `Rating: ⭐ ${product.rating}/5`;

            card.append(title, id, price, rating);
            productList.appendChild(card);
        });

        if (products.length === 0) {
            productList.textContent = "No products available.";
        }

    } catch (error) {
        productList.textContent = error.message;
    }
}

// Add new product
productForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = Number(document.getElementById("price").value);
    const rating = Number(document.getElementById("rating").value);

    if (!name || price <= 0 || rating < 0 || rating > 5) {
        message.textContent = "Please enter valid details.";
        return;
    }

    try {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                price: price,
                rating: rating
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        message.textContent = "Product added successfully!";

        productForm.reset();

        // Refresh product list without reloading page
        getProducts();

    } catch (error) {
        message.textContent = error.message;
    }
});

// Display products when page loads
getProducts();
