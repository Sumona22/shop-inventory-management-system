import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import allProductRoutes from "./routes/product-routes";
import orderRequestRoute from "./routes/orderRequestRoute";
import branchRoutes from "./routes/branchRoutes";
import supplierProductRoutes from "./routes/supplierProductRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import notificationRoute from "./routes/notificationRoute";




dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/branches", branchRoutes);

app.use("/api/suppliers", supplierRoutes)
app.use("/api/supplier-products", supplierProductRoutes);


app.use("/api", allProductRoutes);
app.use("/api/order-requests",orderRequestRoute);
app.use("/api/notifications",notificationRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));