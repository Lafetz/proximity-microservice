import express from "express";
import { getNearby } from "../controllers/search.controller";

const router = express.Router();

router.get("/api/v1/search/nearby", getNearby);

export { router as searchRoute };
//
