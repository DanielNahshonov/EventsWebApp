import mongoose, { Document, Schema } from 'mongoose';

interface IProfile extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  willCome: 'yes' | 'maybe' | 'no'; // Определяем возможные значения
}

const ProfileSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  willCome: { type: String, enum: ['yes', 'maybe', 'no'], required: true }, // Ограничиваем возможные значения
});

export default mongoose.model<IProfile>('Profile', ProfileSchema);