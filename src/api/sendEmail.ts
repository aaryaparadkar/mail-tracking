import { Hono } from "hono";
import { v4 as uuid } from 'uuid'
import Track from "../models/track.model";
import { sendEmail } from "../utils/mailer";

const app = new Hono()

app.post('/sendemail', async (c) => {
    const { emails, password } = await c.req.json()   // array of email, so arrays
    if (!emails || !password) {
        return c.json({ error: 'Emails and password are required' })
    }
    if (password !== Bun.env.PASSWORD) {
        return c.json({ error: 'Invalid password' })
    }
    const trackingId = uuid()
    try {
        await Track.create({ trackingId })
        await sendEmail(emails, trackingId)
        return c.json({ trackingId: trackingId, message: 'Email sent successfully' })
    } catch (error) {
        return c.json({ error: 'An error occurred while sending' })
    }
})

export default app