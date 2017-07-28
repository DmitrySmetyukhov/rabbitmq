var amqp = require('amqplib/callback_api');


amqp.connect('amqp://sgnaandf:N4Pzd2U4utaOgGMklwkf8g3Kl4L-tFQn@wasp.rmq.cloudamqp.com/sgnaandf', function (err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'logs';

        ch.assertExchange(ex, 'fanout', {durable: false});

        ch.assertQueue('', {exclusive: true}, function(err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, ex, '');

            ch.consume(q.queue, function(msg) {
                console.log(" [x] %s", msg.content.toString());
            }, {noAck: true});
        });
    });
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}