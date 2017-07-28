var amqp = require('amqplib/callback_api');

amqp.connect('amqp://sgnaandf:N4Pzd2U4utaOgGMklwkf8g3Kl4L-tFQn@wasp.rmq.cloudamqp.com/sgnaandf', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';

        ch.assertQueue(q, {durable: true});
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

        ch.consume(q, async function (msg) {
            // await sleep(3000);
            console.log(msg.content.toString(), 'message');
            ch.ack(msg);
        }, {noAck: false});
    });
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


