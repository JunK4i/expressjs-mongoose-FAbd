import "./lib/db";
import express from "express";
import cookieParser from "cookie-parser";
import auth from "./routes/auth";
import register from "./routes/register";
import refresh from "./routes/refresh";
import logout from "./routes/logout";
import users from "./routes/api/users";
import credentials from "./middlewares/credentials";
import corsOptions from "./configs/corsOptions";
import verifyJWT from "./middlewares/verifyJWT";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3333;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get("/", async (req, res) => {
  res.json({ message: "/ called" });
});

// routes
app.use("/auth", auth);
app.use("/register", register);
app.use("/refresh", refresh);
app.use("/logout", logout);

// protected routes
app.use(verifyJWT);
app.use("/api/users",users);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
