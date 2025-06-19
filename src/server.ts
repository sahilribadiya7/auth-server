import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import connectDB from "./database";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:1818", credentials: true }));
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`✅ Server running on port ${PORT}`)
        );
    })
    .catch(() => {
        throw Error("❌ 501,Unable to connect database");
    });
