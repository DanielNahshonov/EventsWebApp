import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  numberOfTickets: number;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numberOfTickets: { type: Number, required: true },
});

export default mongoose.model<IEvent>('Event', EventSchema);