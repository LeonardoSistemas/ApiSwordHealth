const RabbitPublisher = require('../../proxyRMQ/connection')

class Publisher {
  constructor() {

    RabbitPublisher.instance();

   }

  async send(objmessage) {  
    await RabbitPublisher.instance().sendMessage(objmessage)
  }
}

module.exports = Publisher