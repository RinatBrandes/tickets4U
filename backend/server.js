const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
// const ticketService = require('./services/ticket.service.js')

const app = express()
const http = require('http').createServer(app)

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const ticketRoutes = require('./api/ticket/ticket.routes')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const eventRoutes = require('./api/event/event.routes')
const {connectSockets}  = require('./services/socket.service')


// routes
app.use('/api/ticket', ticketRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/event', eventRoutes)
connectSockets(http)
// app.use('/api/user', userRoutes)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/ticket/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue-router to take it from there


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
const logger = require('./services/logger.service')

const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})

