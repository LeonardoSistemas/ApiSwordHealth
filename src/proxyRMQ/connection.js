const amqp = require('amqplib/callback_api')

class RabbitPublisher {
  constructor() { }

  static instance() {
    if (!RabbitPublisher._instance) {
      RabbitPublisher._instance = new RabbitPublisher()
    }

    return RabbitPublisher._instance
  }

  async connect() {
    return new Promise((resolve, reject) => {
      try {
        amqp.connect(`amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_URL}:${process.env.RMQ_PORT}`, (error, connection) => {

          if (error) {
            this.client = null
            this.channel = null
            reject(error)
            return
          }

          this.client = connection
          this.channel = connection.createChannel()
          resolve(connection)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async createQueue(queue) {
    return new Promise((resolve, reject) => {
      try {
        this.channel.assertQueue(queue, { durable: true });
        resolve(this.channel);
      }
      catch (error) {
        reject(error)
      }
    });
  }

  async sendMessage(message) {
    const queueName = 'NotificationTask'
    if (!this.channel) {
      await this.connect()
    }

    await this.createQueue(queueName)
    await this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))    
  }

  async close() {
    this.client.close()
    this.client = null
    this.channel = null
  }
}

RabbitPublisher.client = null
RabbitPublisher._instance = null
RabbitPublisher.channel = null

module.exports = RabbitPublisher
