import { Document, Schema, model } from 'mongoose';

export type User = {
  _id: string;
  username: string;
  displayName: string;
  password: string;
  salt: string;
  isAdmin?: boolean;
  lastActivity?: Date;
};

export type UserDocument = Document & User;

const UserSchema = new Schema({
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  isAdmin: Boolean,
  lastActivity: Date,
});

export default model<UserDocument>('User', UserSchema);
