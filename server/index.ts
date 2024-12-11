import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.routes";
import restaurantRoute from "./routes/resturent.routes";
import menuRoute from "./routes/menu.routes";
import orderRoute from "./routes/order.routes";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
console.log(PORT);

const DIRNAME = path.resolve();

// default middleware for any mern project
try {
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(express.json());
  app.use(cookieParser());
  const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };
  app.use(cors(corsOptions));
  //localhost:3000/api/v1/order/checkout/create-checkout-session
  // api
  http: app.use("/api/v1/user", userRoute);
  app.use("/api/v1/restaurant", restaurantRoute);
  app.use("/api/v1/menu", menuRoute);
  // app.use(express.json());
  app.use("/api/v1/order", express.json(), orderRoute);

  // app.use(express.static(path.join(DIRNAME, "/client/dist")));
  // app.use("*", (_, res) => {
  //   res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
  // });

  app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}

// "stripe": "stripe listen --forward-to localhost:3000/api/v1/order/webhook",
