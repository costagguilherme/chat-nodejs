const express = require('express')
const { dirname } = require('path')
const app = express()
const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)

app.use(express.static('public'))


http.listen(8080, () => {
    console.log("Servidor escutando a porta 8080")
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Função chamada quando o cliente conecta
serverSocket.on('connection', (socket) => {

    socket.on('login', (nickname) => {
        console.log("Usuário entrou na conversa: " + nickname)
        serverSocket.emit('chat-msg', `Usuário ${nickname} conectou`)
        socket.nickname = nickname
    })

    // Callback executado quando o servidor recebe uma mensagem
    socket.on('chat-msg', (msg) => {
        console.log(`Mensagem recebida do cliente ${socket.nickname}: ${msg}`);
        serverSocket.emit('chat-msg', socket.nickname + ': ' + msg)
    })
    
    // Recebendo status de digitação e mandando para outros usuários
    socket.on('status', (msg) => {
        socket.broadcast.emit('status', msg)
    })

    
})