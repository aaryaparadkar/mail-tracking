import mongoose from "mongoose";

interface ITrack {
    trackingId: string;
    opens: number;
    userIPs: string[];
}

const trackSchema = new mongoose.Schema<ITrack>({
    trackingId: {
        type: String,
        required: true,
    },
    opens: {
        type: Number,
        default: 0,
    },
    userIPs: {
        type: [String],
        default: [],
    }
})

const Track = mongoose.model<ITrack>("Track", trackSchema)
export default Track