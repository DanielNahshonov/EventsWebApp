import mongoose, { Document, Schema } from 'mongoose';

interface IEventProfile extends Document {
  eventID: string;
  profileID: string;
}

const EventProfileSchema: Schema = new Schema({
  eventID: { type: String,  required: true },
  profileID: { type: String,  required: true },
});

export default mongoose.model<IEventProfile>('EventProfile', EventProfileSchema);