import express from "express";

import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/errorhandler.middleware";
import { NotFoundError } from "./errors/notFound.error";
import { searchRoute } from "./routes/search.route";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(searchRoute);

app.all("*", (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);
app.use(errorHandler); //
app.listen(4000, () => {
  console.log(`Server running son ${4000}`);
});
//
