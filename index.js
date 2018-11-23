const express = require('express')
const morgan = require('morgan')


const app = express()

app.set('port',process.env.PORT || 4000)

app.use(morgan('dev'))

app.use(express.json())

app.get('/',(req,res)=>{
    res.send({'status':'succes'})
})


const server = app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'))
})

// CHAT SERVER CONNECTION
const io = require('socket.io')(server)

io.on('connection',(socket)=>{

    socket.on('disconnect',()=>{
        socket.broadcast.emit('userDisconnected',socket.id)
    })
    
    socket.on('message',(message)=>{
        socket.broadcast.emit('message',message)
    })

    socket.on('userConnect',(username) => {
        socket.broadcast.emit('userConnect',{
            user: username,
            id: socket.id
        })
    })

    socket.on('updateUser',(username) => {
        socket.broadcast.emit('updateUser',{
            user: username,
            id: socket.id
        })
    })
})