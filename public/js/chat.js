const socket = io()

const message = document.getElementById('send_message')
const chat = document.getElementById('chat')
const msg_list = document.getElementById('messages_list')

const user = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


function format_msg(username, content, h, min) {
    return {
        user: username,
        msg: content,
        h: h,
        min: min,
    }
}

message.addEventListener('submit', (e) => {
    e.preventDefault()

    let msg = e.target.elements.message.value
    let time = new Date()
    
    // console.log(format_msg(user.username, msg))
    socket.emit('user_message', format_msg(user.username, msg, time.getHours(), time.getMinutes()))
    
    e.target.elements.message.value = ''
    e.target.elements.message.focus();
})

socket.on('new_message', (e) => {
    // console.log(e)
    let new_msg = document.createElement('li')

    new_msg.innerHTML = `<strong>${e.h}:${e.min} ${e.user}</strong>: ${e.msg}`
    new_msg.classList.add('list-group-item')
    
    msg_list.appendChild(new_msg);
    chat.scrollTop = chat.scrollHeight;
})