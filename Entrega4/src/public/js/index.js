const socket = io();
socket.emit('msg', 'este es el mensaje de socket');

socket.on('msg_individual', data => {
    console.log(data);
});

socket.on('msg_todos_menos_el_socket', data => {
    console.log(data);
});

socket.on('msg_todos', data => {
    console.log(data);
});