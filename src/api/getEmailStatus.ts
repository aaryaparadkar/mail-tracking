import { Hono } from "hono";
import Track from "../models/track.model";

const app = new Hono()

app.get('/emailstatus/:id', async (c) => {
    const id = c.req.param('id')
    if (!id) {
        return c.json({ error: 'ID is required' })
    }
    try {
        const track = await Track.findOne({ trackingId: id })
        if (!track) {
            return c.json({ error: 'Invalid tracking ID' })
        }
        return c.json({ data: track })
    } catch (error) {
        return c.json({ error: 'An error occurred while fetching' })
    }
})

export default app