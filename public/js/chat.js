const socket = io()

const message = document.getElementById('send_message')
const chat = document.getElementById('messages_list')

const user = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


function format_msg(username, content) {
    return {
        user: username,
        msg: content
    }
}

message.addEventListener('submit', (e) => {
    e.preventDefault()

    let msg = e.target.elements.message.value
    e.target.elements.message.value = ''

    // console.log(format_msg(user.username, msg))
    socket.emit('user_message', format_msg(user.username, msg))
})

socket.on('new_message', (e) => {
    // console.log(e)
    let new_msg = document.createElement('li')
    new_msg.innerHTML = `<strong>${e.user}</strong>: ${e.msg}`
    chat.appendChild(new_msg);
})