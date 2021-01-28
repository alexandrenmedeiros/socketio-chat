const express = require('express')
const path = require('path')
const http = require('http')
const io = require('socket.io')(http)

const app = express()
const server = http.createServer(app)

const PORT = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    console.log(`new socket connected: ${socket.id}`)
})

server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})