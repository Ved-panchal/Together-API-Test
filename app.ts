import express, { Application } from "express";
import router from "./routes/routes"

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
app.use('/api', router);

export default app;
