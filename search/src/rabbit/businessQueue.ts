import { json } from "stream/consumers";
import { addBusinessInfo } from "../utils/redis _info/redis_info";
import { addBusinessGeo } from "../utils/redis_geo/redis_geo";
import { amqpConnection } from "./connection";
export const businessQueue = async () => {
  const exchangeName = "x.proximity";
  const queueName = "q.proximity.search";
  const exchangeType = "direct";

  try {
    const connection = await amqpConnection();
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, exchangeType, {});
    const { queue } = await channel.assertQueue(queueName, {});
    await channel.bindQueue(queue, exchangeName);
    console.log("con.............");
    channel.consume(queue, async (msg: any) => {
      const content = JSON.parse(msg.content);
      const { businessType, businessId, longitude, latitude } = JSON.parse(
        content.business
      );
      console.log("reservation msg recieved", content, "zzz");
      console.log("updated");
      await addBusinessGeo(businessType, businessId, longitude, latitude);
      await addBusinessInfo(businessId, content.business);
      channel.ack(msg);
    });
  } catch (err) {
    console.error(err);
  }
}; //
content: {
}
