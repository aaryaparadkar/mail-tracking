import { Hono } from "hono";
import { getConnInfo } from 'hono/bun'
import Track from "../models/track.model";
import { promises as fs } from 'fs'

const app = new Hono()

let imageBuffer: Buffer
(
    async () => {
        try {
            imageBuffer = await fs.readFile(__dirname + './assets/logo1px.png')
        } catch (error) {
            console.log(error)
        }
    }
)()

app.get('/trackemail/:id', async (c) => {
    const id = c.req.param('id')
    const userIp = c.req.raw.headers.get('true-client-ip') || c.req.raw.headers.get('cf-connecting-ip') || getConnInfo(c).remote.address || '0.0.0.'

    if (!id) {
        return c.json({ error: 'ID is required' })
    }
    try {
        const track = await Track.findOne({ trackingId: id })
        if (!track) {
            return c.json({ error: 'Invalid tracking ID' })
        }
        if (!track.userIPs.includes(userIp)) {
            track.userIPs.push(userIp)
            track.opens++
            await track.save()
        }

        return new Response(imageBuffer, {
            headers: {
                "Content-Type": "image/png",
                "content-length": imageBuffer.length.toString()
            }
        })
    } catch (error) {
        return c.json({ error: 'An error occurred while tracking' })
    }
})

export default app