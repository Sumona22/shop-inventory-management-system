// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import branchRoutes from "./routes/branchRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import supplierProductRoutes from "./routes/supplierProductRoutes";
import productRoutes from "./routes/product-routes";
import orderRequestRoutes from "./routes/orderRequestRoute";
import stockRoutes from "./routes/stock-routes";
import notificationRoutes from "./routes/notificationRoute";
import salesRoutes from "./routes/salesRoutes"; 
import forecastRoutes from "./routes/forecastRoutes";

dotenv.config();

const app = express();

/* -------------------- Middleware -------------------- */
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* -------------------- Routes -------------------- */
// Auth & Users
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Core entities (STATIC first)
app.use("/api/branches", branchRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/supplier-products", supplierProductRoutes);

// Products & Stock
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);

// Sales & Transactions
app.use("/api/sales", salesRoutes);

// Orders & Notifications
app.use("/api/order-requests", orderRequestRoutes);
app.use("/api/notifications", notificationRoutes);

/* -------------------- Health Check -------------------- */
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});
/* Forecast for exams */
app.use("/api/forecast", forecastRoutes);


export default app;
