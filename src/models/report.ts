import mongoose, { Document, Schema } from 'mongoose';

const COLLECTION_NAME = 'gr.report';

interface IReport extends Document {
  summary: string;
  prediction: string;
  createdAt: Date;
}

const reportSchema = new Schema<IReport>({
  summary: { type: String, required: true },
  prediction: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model<IReport>('Report', reportSchema, COLLECTION_NAME);

export default Report;
