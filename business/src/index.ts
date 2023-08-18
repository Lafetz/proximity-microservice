import express from "express";

import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/errorhandler.middleware";
import { NotFoundError } from "./errors/notFound.error";
import { busniessRoute } from "./routes/busniess.route";
import { reviewRoute } from "./routes/review.route";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/test", async (req, res) => {
  // await consumeMessages("Info.#", "logExchange22", "logEx");
  // producer.publishMessage("Infoc.car", "logExchange22", { hell: "working" });
  res.send("yes working");
});
app.use(reviewRoute);
app.use(busniessRoute);
app.all("*", (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler); //
app.listen(3000, () => {
  console.log(`Server running son ${3000}`);
});
