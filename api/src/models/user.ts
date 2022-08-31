import { Document, Model, Schema, model, models } from 'mongoose';

export type UserDbObject = {
  id: string;
  username: string;
  displayName: string;
  password: string;
  salt?: string;
  isAdmin?: boolean;
  lastActivity?: Date;
};

export type UserDocument = Document & UserDbObject;

const UserSchema = new Schema({
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true },
  salt: String,
  isAdmin: Boolean,
  lastActivity: Date,
});

export default (models.User as Model<UserDocument>) || model<UserDocument>('User', UserSchema);
