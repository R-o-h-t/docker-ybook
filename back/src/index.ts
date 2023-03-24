#!/usr/bin/env node

/**
 * Module dependencies.
 */
 import app from './app'
 import debug from 'debug'
 import http from 'http'
 import { Server } from "socket.io";

 /**
  * Get port from environment and store in Express.
  */

 var port = normalizePort(process.env.PORT || '3001');
 app.set('port', port);

 /**
  * Create HTTP server.
  */

 let server = http.createServer(app);
 const io = new Server(server, {cors: {origin : '*'}})
  export const ioServer = io;

 /**
  * Listen on provided port, on all network interfaces.
  */

 server.listen(port);
 console.log(` Server is running on port http://localhost:${port} `)
 server.on('error', onError);
 server.on('listening', onListening);
 
 
 io.on('connection', (socket) => {
  
  console.log("machin truci io connection");

  socket.on('joinRoom', (room: string) => {
    console.log('A user joined room: ', room);
    socket.join(room);
  });

  socket.on('disconnect', () => {
    console.log("machin truc io déconnexion"); 
  })
})

 /**
  * Normalize a port into a number, string, or false.
  */

 function normalizePort(val: string) {
   var port = parseInt(val, 10);

   if (isNaN(port)) {
     // named pipe
     return val;
   }

   if (port >= 0) {
     // port number
     return port;
   }

   return false;
 }

 /**
  * Event listener for HTTP server "error" event.
  */

 function onError(error: any) {
   if (error.syscall !== 'listen') {
     throw error;
   }

   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;

   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }

 /**
  * Event listener for HTTP server "listening" event.
  */

 function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr!.port;
   debug('Listening on ' + bind);
 }
