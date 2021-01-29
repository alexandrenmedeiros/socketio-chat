const socket = io()

var join = document.getElementById('join_chat')

// get username on connection
join.addEventListener('submit', (e) => {
    // e.preventDefault() // sem prevent pra poder mudar de pagina

    const username = e.target.elements.username.value
    socket.emit('new_user', username)
})