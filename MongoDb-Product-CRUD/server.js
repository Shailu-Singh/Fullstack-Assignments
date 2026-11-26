require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Product routes
app.use("/api/products", require("./routes/productRoutes"));

// Home route
app.get("/", (req, res) => {
    res.send("Product Management API is Running");
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});