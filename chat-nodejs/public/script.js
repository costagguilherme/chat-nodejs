$(() => {
    const socket = io()
    socket.nickname = ''
    let nickname = prompt("Informe seu nome: ")
    $('#usuario').text('Usuário: ' + nickname)

    // Submetendo form para o servidor
    $('#form').submit((event) => {

        if (socket.nickname === '') {
            socket.nickname = nickname
            socket.emit('login', socket.nickname)
            socket.emit('chat-msg', $("#msg").val())
        } else {
            socket.emit('chat-msg', $("#msg").val())
        }

        $("#msg").val('')
        return false
    })

    // Recebendo mensagem de chat do servidor
    socket.on('chat-msg', (msg) => {
        $('#mensagem').append($('<li>').text(msg))
    })

    // Captar quando o usuário está digitando
    $('#msg').keypress((event) => {
        socket.emit('status', `Usuário ${socket.nickname} digitando...` )
    })

    // Captar quando o usuário está digitando
    $('#msg').keyup((event) => {
        socket.emit('status', '')
    })

    // Recebendo status do servidor
    socket.on('status', (msg) => {
        $('#status').html(msg)
    })
})