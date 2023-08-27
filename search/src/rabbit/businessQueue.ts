import { removeAllListeners } from "process";
import {
  addBusinessInfo,
  removeBusinessInfo,
} from "../utils/redis _info/redis_info";
import {
  addBusinessGeo,
  removeBusinessGeo,
} from "../utils/redis_geo/redis_geo";
import { amqpConnection } from "./connection";
export const businessQueue = async () => {
  const exchangeName = "x.proximity";
  const queueName = "q.proximity.search";
  const exchangeType = "direct";
  const key = "proximity";
  try {
    const connection = await amqpConnection();
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, exchangeType, {});
    const { queue } = await channel.assertQueue(queueName, {});
    await channel.bindQueue(queue, exchangeName, key);
    console.log("con.............");
    channel.consume(queue, async (msg: any) => {
      const content = JSON.parse(msg.content);
      const data = JSON.parse(content);

      if (data.subject === 0) {
        const { business_Type, business_id, longitude, latitude } =
          data.business;

        await addBusinessGeo(business_Type, business_id, longitude, latitude);
        await addBusinessInfo(business_id, content);

        channel.ack(msg);
      } else if (data.subject === 1) {
        await removeBusinessGeo(
          data.business.business_Type,
          data.business.business_id
        );
        await removeBusinessInfo(data.business.business_id);

        channel.ack(msg);
      }
    });
  } catch (err: any) {
    throw new Error(err);
  }
};
//
