import express from "express";
import * as reservationController from "../controllers/reservation.controller";
const router = express.Router();
router.get("/api/v1/reservations", reservationController.getReservations); //users
router.get(
  "/api/v1/reservations/:reservationID",
  reservationController.getReservation
);
router.post("/api/v1/reservations", reservationController.addReservation);
router.delete(
  "/api/v1/reservations/:reservationID",
  reservationController.deleteReservation
);

export { router as reservationRoute };
