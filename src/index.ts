import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { connectDB } from './config/db'
import sendEmailRoute from './api/sendEmail'
import trackEmailRoute from './api/trackEmail'
import getEmailStatusRoute from './api/getEmailStatus'

const app = new Hono()

// middleware
app.use(cors())

// db conn
connectDB()

// routes
app.route('/api', sendEmailRoute)
app.route('/api', trackEmailRoute)
app.route('/api', getEmailStatusRoute)

export default app
