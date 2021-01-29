// includes and global variables 
const express = require('express')
const path = require('path')
const http = require('http')

const app = express()
const server = http.createServer(app)

const io = require('socket.io')(server)

const PORT = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))

var users = []

// functions
function delete_id(id) {
    for (var i = users.length - 1; i >= 0; i--) {
        if (users[i].id === id) {
         users.splice(i, 1);
        }
    }
}

// MAIN

io.on('connection', (socket) => {
    console.log(`new socket connected: ${socket.id}`)

    socket.on('new_user', (username) => {
        console.log(username)
        users.push({username:username, id:socket.id})
    })


    socket.on('disconnect', () => {
        delete_id(socket.id)
        console.log(`user ${socket.id} has disconnect`)
    })
})

server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})
