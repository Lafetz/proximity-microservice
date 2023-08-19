import amqp from "amqplib";

const connection = amqp.connect("amqp://rabbitmq");

function connect() {
  return connection;
}

export { connect as amqpConnection };
