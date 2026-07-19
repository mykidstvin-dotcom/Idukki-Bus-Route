const busRoutes = require("./routes/busRoutes");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({

   secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hour
    }

}));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/buses", busRoutes);
app.use("/api/auth", authRoutes);
// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Privacy Policy
app.get("/privacy-policy.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "privacy-policy.html"));
});

// Terms & Conditions
app.get("/terms-and-conditions.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "terms-and-conditions.html"));
});

// Search Results
app.get("/search-results", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "search-results.html"));
});

// Route Details
app.get("/route-details", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "route-details.html"));
});

app.get("/about.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Admin Login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Admin Dashboard
app.get("/admin", (req, res) => {

    if (!req.session.isAdmin) {

        return res.redirect("/login");

    }

    res.sendFile(path.join(__dirname, "views", "admin.html"));

});
// Start Server
app.listen(PORT, () => {
    console.log(`🚍 Idukki Bus Route running at http://localhost:${PORT}`);
});