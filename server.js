import express, { response } from 'express'
import { Server } from 'socket.io'
import cors from 'cors';
import os from 'os';

const IPaddress = os.networkInterfaces().en0[1].address;
const SERVER_IP = '127.0.0.1';

const app = express()
const PORT = 8080

app.use(express.json())

app.use('/mupi', express.static('public-mupi'))
app.use('/user', express.static('public-user'))

app.use(cors({ origin: "*" }));

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`)
    console.table({
        'Mupi Endpoint': `http://localhost:${PORT}/mupi/`,
        'Client Endpoint': `http://localhost:${PORT}/user/`
    })
})

const io = new Server(httpServer, { path: '/real-time' })


io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('clickCapture', () => {
        io.emit('takePhoto')
    })

    socket.on('photoData', (dataUrl) => {
        io.emit('photoData', dataUrl)
    })
    
    socket.on('disconnect', () => {
        console.log('Client disconnected: ' + socket.id)
    })
})