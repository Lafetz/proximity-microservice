import amqp from "amqplib";
import { amqpConnection } from "./connection";
class Producer {
  channel: amqp.Channel | null;

  constructor() {
    this.channel = null;
  }

  async createChannel() {
    try {
      const connection = await amqpConnection();
      this.channel = await connection.createChannel();
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async publishMessage(routingKey: string, exchange: string, message: object) {
    if (!this.channel) {
      await this.createChannel();
    }

    await this.channel!.assertExchange(exchange, "topic");
    const publish = this.channel!.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
    if (!publish) {
      throw new Error("faild to publish message!");
    } else {
      console.log("message published");
    }
  }
}
const producer = new Producer();
export default producer;
