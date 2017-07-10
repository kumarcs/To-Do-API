/**
 * Created by HP pc on 09-07-2017.
 */
'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

var todoList = [];
var i=0;
// Add the route
server.route({
    method: 'GET',
    path:'/tasks',
    handler: function (request, reply) {

        reply(todoList.map(task =>  task));
    }
});

server.route({
    method: 'POST',
    path:'/{task}',
    handler: function (request, reply) {

       todoList.push(encodeURIComponent(request.params.task));
       reply('task added\n' + todoList.join('\n'));
    }
});

server.route({
    method: 'DELETE',
    path: '/task/{num}',
    handler: function (request, reply) {
        var item = encodeURIComponent(request.params.num);
        item <= todoList.length ? delete todoList[item-1] : reply('invalid number');
        reply('task deleted\n' + todoList.join('\n'));
    }
});

server.route({
    method: 'PUT',
    path: '/update/{num}/{task}',
    handler: function (request, reply) {
        var item = encodeURIComponent(request.params.num);
        var task = encodeURIComponent(request.params.task);
        todoList[item-1] = task;
        reply("Task updated!\n" + todoList.join('\n'));


    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});