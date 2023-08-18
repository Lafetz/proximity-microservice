-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'paid', 'refunded', 'canceled', 'rejected');

-- CreateTable
CREATE TABLE "Hotel" (
    "hotel_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("hotel_id")
);

-- CreateTable
CREATE TABLE "Room" (
    "room_id" TEXT NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "room_type_id" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "Room_type" (
    "hotel_id" TEXT NOT NULL,
    "room_type_id" INTEGER NOT NULL,
    "total_inventory" INTEGER NOT NULL,

    CONSTRAINT "Room_type_pkey" PRIMARY KEY ("hotel_id","room_type_id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservation_id" TEXT NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "room_type_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "guest_id" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservation_id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotel"("hotel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_hotel_id_room_type_id_fkey" FOREIGN KEY ("hotel_id", "room_type_id") REFERENCES "Room_type"("hotel_id", "room_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
