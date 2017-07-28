var amqp = require('amqplib');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('message> ');
rl.prompt();

amqp.connect('amqp://sgnaandf:N4Pzd2U4utaOgGMklwkf8g3Kl4L-tFQn@wasp.rmq.cloudamqp.com/sgnaandf').then(function (conn) {
    return conn.createChannel().then(function (ch) {
        var q = 'hello';
        var ok = ch.assertQueue(q, {durable: true});

        return ok.then(function (_qok) {
            rl
                .on('line', function (line) {
                    if (line === "exit") rl.close();
                    rl.prompt();
                    ch.sendToQueue(q, Buffer.from(line), {persistent: true});
                    console.log(" [x] Sent '%s'", line);

                })
                .on('close', function () {
                    ch.close();
                });

        });
    })
}).catch(console.warn);