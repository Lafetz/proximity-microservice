import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorhandler.middleware";
import { NotFoundError } from "./errors/notFound.error";
import { authRouter } from "./routes/auth.route";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authRouter);

app.all("*", (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler); //
app.listen(7000, () => {
  console.log(`Server running son ${7000}`);
});
//
