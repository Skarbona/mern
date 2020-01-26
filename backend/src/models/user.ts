import mongoose, { Document, Schema, Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IPlace } from "./place";

export interface IUser {
  name: string;
  email: string;
  imageUrl: string;
  password: string;
  places: string[] & { pull(place: IPlace): void };
}

export type IUserType = IUser & Document;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  places: [{ type: Schema.Types.ObjectId, required: true, ref: "Place" }],
  password: { type: String, required: true, minlength: 6 }
});

userSchema.plugin(uniqueValidator);

const userModel: Model<IUserType> = mongoose.model("User", userSchema);
export default userModel;
