// includes and global variables 
const express = require('express')
const path = require('path')
const http = require('http')

const app = express()
const server = http.createServer(app)

const io = require('socket.io')(server)

const PORT = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))

// MAIN
io.on('connection', (socket) => {
    console.log(`new socket connected: ${socket.id}`)

    socket.on('user_message', (e) => {
        console.log(e)
        io.emit('new_message', e)
    })


    socket.on('disconnect', () => {
        console.log(`user ${socket.id} has disconnect`)
    })
})

server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})
