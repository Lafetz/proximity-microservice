import express from "express";

const router = express.Router();

router.get("api/v1/search/nearby");

export { router as searchRoute };
