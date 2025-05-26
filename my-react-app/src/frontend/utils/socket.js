import WebSocketClient from './WebSocketClient';

const SOCKET_URL = 'wss://localhost:3000/ws';
let socketClient = null;

export const initSocket = () => {
    if (!socketClient) {
        socketClient = new WebSocketClient(SOCKET_URL);
        socketClient.connect();

        // Add default message handlers
        socketClient.onMessage('welcome', (data) => {
            console.log('Welcome message:', data.message);
        });

        // Add error handler
        socketClient.onMessage('error', (data) => {
            console.error('Socket error:', data.message);
        });
    }
    return socketClient;
};

export const getSocket = () => {
    if (!socketClient) {
        return initSocket();
    }
    return socketClient;
};

export const closeSocket = () => {
    if (socketClient) {
        socketClient.disconnect();
        socketClient = null;
    }
};

// Example usage:
// const socket = getSocket();
// socket.send({ type: 'message', content: 'Hello!' });
// socket.onMessage('message', (data) => {
//     console.log('Received message:', data);
// }); 