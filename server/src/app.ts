import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config'
import { router } from './router'

// import Socket.io
import {Server as SocketServer} from 'socket.io'
import http from 'http'

// initialize express server
const app = express()

// create a http server
const server = http.createServer(app)

// initialize web-socket server
const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

// web-socket connection
io.on('connection', socket => {
  console.log('Client connected!')
})

// settings
// app.set('port', config.PORT)

// middlewares
// app.use(morgan('dev'))
// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// routes
// app.use(router)


export default server