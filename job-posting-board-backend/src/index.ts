// express
import express, { Application, Request, Response } from "express";
// body-parser
import bodyParser from "body-parser";
// cors
import cors from "cors";
// dotenv
import dotenv from "dotenv";
// database connection
import connection from "./database/connection";
// routes
import companyRouter from "./routes/company.route";
import otpRouter from "./routes/otp.route";
import jobRouter from "./routes/job.route";
import { auth } from "./middleware/auth.middleware";

const app: Application = express();

// express middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
// cors middleware
app.use(cors());
// dotenv config
dotenv.config();

// 1. otp route
app.use('/api/otp', otpRouter);
// 2. company route
app.use('/api/company', companyRouter);
// 3. job route
app.use('/api/job', auth, jobRouter);

const port = 3000;

app.get('/api/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

// Connect to the database and start the server
const startServer = async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();