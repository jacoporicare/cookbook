import { Document, Model, model, models, Schema } from 'mongoose';

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

export default (models.Image as Model<ImageDocument>) ||
  model<ImageDocument>('Image', ImageSchema);
