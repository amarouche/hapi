'use strict';

const Hapi = require('hapi');
const config = require('config');
const server = new Hapi.server({
    port: config.get('api.port'),
    host: config.get('api.host')
});
// const server = Hapi.server(config.get("api"));
const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
    }
}
const handlerPost =  (request, h) => {
    return 'post ok';
};


server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello, world!';
    }
});

server.route({
    method: ['PUT','POST'],
    path: '/post',
    handler: handlerPost
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

const init = async () => {
    await server.register({
        plugin: require('good'),
        options,
    });
    await server.start();
    server.log(`Server running at: ${server.info.uri}`);
};
// server.events.on('log', (event, tags) => {
//     if (tags.error) {
//         console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
//     }
// });
init();
