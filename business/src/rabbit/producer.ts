import amqp from "amqplib";

const exchangeName = "x.proximity";
const exchangeType = "direct";
const routingKey = "proximity";
class Producer {
  channel: amqp.Channel | null;
  connection: amqp.Connection | null | void;
  constructor() {
    this.channel = null;
    this.connection = null;
  }
  async createConnection() {
    this.connection = await amqp.connect("amqp://rabbitmq").catch((e) => {
      console.log(e);
    });
  }

  async createChannel() {
    try {
      if (!this.connection) {
        await this.createConnection();
      }
      if (!this.connection) {
        throw new Error();
      }
      this.channel = await this.connection.createChannel();
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async publishMessage(message: Object) {
    if (!this.channel) {
      await this.createChannel();
    }

    await this.channel!.assertExchange(exchangeName, exchangeType);
    const publish = this.channel!.publish(
      exchangeName,
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
