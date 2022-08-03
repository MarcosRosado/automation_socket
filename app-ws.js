const WebSocket = require('ws');

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
    console.log(`onMessage: ${data}`);
    ws.clients.forEach((client)=>{
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: false });
        }
    })
}

function onConnection(ws, req) {
    ws.on('error', error => onError(ws, error));
    console.log(`onConnection`);
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });

    wss.on('connection', onConnection);


    console.log(`App Web Socket Server is running!`);
    return wss;
}