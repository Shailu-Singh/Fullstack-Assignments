
const express = require("express");
const app = express();

const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Temporary product data
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000,
        description: "HP Laptop"
    },
    {
        id: 2,
        name: "Mobile",
        price: 20000,
        description: "Samsung Smartphone"
    }
];

// 1. CREATE - Add a new product
app.post("/products", (req, res) => {
    const { name, price, description } = req.body;

    const newProduct = {
        id: Date.now(),
        name,
        price,
        description
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// 2. READ - Get all products
app.get("/products", (req, res) => {
    res.json(products);
});

// READ - Get a single product
app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// 3. UPDATE - Update a product
app.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, description } = req.body;

    product.name = name;
    product.price = price;
    product.description = description;

    res.json({
        message: "Product updated successfully",
        product
    });
});

// 4. DELETE - Delete a product
app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const productExists = products.some(p => p.id === id);

    if (!productExists) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products = products.filter(p => p.id !== id);

    res.json({
        message: "Product deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
