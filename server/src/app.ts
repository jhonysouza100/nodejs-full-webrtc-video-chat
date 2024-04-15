import express from 'express'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan'
import {Server } from 'socket.io'
import config from './config'
import { router } from './router'
import { roomHandler } from './room'

// initialize express
const app = express()

// settings
app.set('port', config.PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
// app.use(router)

// initialize web-socket server
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

io.on('connection', socket => {

  console.log('Client connected!')

  roomHandler(socket)

  socket.on('disconnect', () => {
    console.log("Client disconnected")
  })

})

export  {server, app}