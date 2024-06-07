import mongoose, { Document, Schema } from "mongoose";

export interface reservationSchemaInterface extends Document {
  name: string;
  date: Date;
  attemdes: number;
}

export const reservationSchema: Schema<reservationSchemaInterface> = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
    attemdes: {
      type: Number,
      required: [true, "attemdes is required"],
    },
  },
  { timestamps: true }
);

const Reservation =
  mongoose.models.reservation ||
  mongoose.model("reservation", reservationSchema);

export default Reservation;
