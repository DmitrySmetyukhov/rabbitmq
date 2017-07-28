var amqp = require('amqplib');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('message> ');
rl.prompt();

amqp.connect('amqp://sgnaandf:N4Pzd2U4utaOgGMklwkf8g3Kl4L-tFQn@wasp.rmq.cloudamqp.com/sgnaandf').then(function (conn) {
    return conn.createChannel().then(function (ch) {
        var ex = 'direct_logs';
        var ok = ch.assertExchange(ex, 'direct', {durable: false});
        // var ok = ch.assertQueue(q, {durable: true});

        return ok.then(function (_qok) {
            rl
                .on('line', function (line) {
                    let severity = line.split(',')[0];

                    // info, hello
                    // warning, hello

                    if (line === "exit") rl.close();
                    rl.prompt();
                    ch.publish(ex, severity, new Buffer(line));
                    // ch.sendToQueue(q, Buffer.from(line), {persistent: true});
                    console.log(" [x] Sent '%s'", line);

                })
                .on('close', function () {
                    ch.close();
                });

        });
    })
}).catch(console.warn);