import { Document, Model, Schema, model, models } from 'mongoose';

export type ImageDbObject = {
  id: string;
  data: Buffer;
  contentType: string;
};

export type ImageDocument = Document & ImageDbObject;

const ImageSchema = new Schema({
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});

export default (models.User as Model<ImageDocument>) || model<ImageDocument>('Image', ImageSchema);
