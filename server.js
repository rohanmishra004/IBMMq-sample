const ibmmq = require('ibmmq');

const queueManager = 'QM1';
const queueName = 'QUEUE1';

const channelName = 'DEV.APP.SVRCONN';
const connectionOptions = {
    hostname: 'localhost',
    port: 1414,
    queueManager, channelName
};


//Code opens the queue Manager , opens the queue and sends a message to the queue and then closes the queue and disconnects from queueManager


ibmmq.Open(queueManager, connectionOptions, (error, connection) => {
    if (error) {
        console.log(error);
        return;
    }

    const message = 'Hello from IBM mq';

    ibmmq.Put(queue, message, {}, (error) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`Message send to queue ${ queueName }`);
        ibmmq.closeQueue(connection, queue);
        ibmmq.disconnect(connection)
    })
})