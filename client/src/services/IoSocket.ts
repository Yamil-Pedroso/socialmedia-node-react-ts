import io from 'socket.io-client';

const socket = io('https://chat-realtime-node-react-ts.onrender.com');

export default socket;