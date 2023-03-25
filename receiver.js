//This will receive the message

const ibmmq = require('ibmmq');
const queueManager = 'QM1';
const queueName = 'QUEUE1';
const channelName = 'DEV.APP.SVRCONN';


const connectionOptions = {
    hostname: 'localhost',
    port: 1414,
    queueManager,
    channelName
};

ibmmq.Open(queueManager, connectionOptions, (error, connection) => {
    if (error) {
        console.log(error);
        return;
    }

    const getOptions = {
        options: ibmmq.MQC.MQGMO_WAIT | ibmmq.MQC.MQGMO_SYNCPOINT,
        waitInterval:5000 , //wait for 5 seconds for message
    }

    ibmmq.getTuningParameters(queue, getOptions, (error, message) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`Received message : ${ message }`);

        ibmmq.commit(connection, (error) => {
            if (error) {
                console.log(error);
                return;
            }

            console.log('Transaction committed');
            ibmmq.closeQueue(connection, queue);
            ibmmq.disconnect(connection)
        })
    })

})