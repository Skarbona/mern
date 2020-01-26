import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPlace {
  title: string;
  description: string;
  imageUrl: string;
  address: string;
  creator: string;
  location: {
    lat: string;
    lng: string;
  };
}

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  address: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  location: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true }
  }
});

const placeModel: Model<IPlace & Document> = mongoose.model(
  "Place",
  placeSchema
);
export default placeModel;
