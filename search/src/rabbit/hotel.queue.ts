import amqp from "amqplib";
import * as db from "../utils/db/hotel.db";
import { amqpConnection } from "./channel";
export const hotelQueue = async () => {
  const exchangeName = "x.hotel";
  const queueName = "q.hotel.search";
  const exchangeType = "topic";
  const key = "hotel.*";
  try {
    const connection = await amqpConnection();
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, exchangeType, {});
    const { queue } = await channel.assertQueue(queueName, {});
    await channel.bindQueue(queue, exchangeName, key);
    console.log("con.............");
    channel.consume(queue, async (msg: any) => {
      console.log("hotel msg recieved");
      const content = JSON.parse(msg.content);
      if (content.subject == "created") {
        console.log(content.hotel);
        await db.addHotel(content.hotel);
      } else if (content.subject == "removed") {
        console.log(content.hotel_id);
        await db.deleteHotel(content.hotel_id);
      } else {
        //(content.subject == "updated")
        console.log(content.hotel);
        await db.updateHotel(content.hotel);
      }
      channel.ack(msg);
    });
  } catch (err) {
    console.error(err);
  }
};
