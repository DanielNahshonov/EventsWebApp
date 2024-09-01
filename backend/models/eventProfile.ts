import mongoose, { Document, Schema } from 'mongoose';

interface IEventProfile extends Document {
  eventID: mongoose.Schema.Types.ObjectId;
  profileID: mongoose.Schema.Types.ObjectId;
}

const EventProfileSchema: Schema = new Schema({
  eventID: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  profileID: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
});

export default mongoose.model<IEventProfile>('EventProfile', EventProfileSchema);