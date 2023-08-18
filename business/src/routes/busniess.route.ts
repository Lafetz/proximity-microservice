import express from "express";

const router = express.Router();

router.get("/api/v1/hotels/:hotel_id");
router.post("/api/v1/hotels");
router.put("/api/v1/hotels/:hotel_id");
router.delete("/api/v1/hotels/:hotel_id");

export { router as busniessRoute };
