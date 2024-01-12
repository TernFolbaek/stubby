import io from 'socket.io-client';

const socket = io('http://localhost:3001'); 

const WebSocketService = {
    connect() {
        socket.connect();
    },
    
    isConnected() {
        return socket && socket.connected;
    },

    disconnect() {
        socket.disconnect();
    },

    sendMessage(message) {
        socket.emit('sendMessage', message);
    },

    onMessage(callback) {
        socket.on('message', callback);
    },

    offMessage(callback) {
        socket.off('message', callback);
    },
    
    joinRoom(roomId) {
        socket.emit('joinRoom', roomId);
      }
};

export default WebSocketService;
