import mongoose, { Document, Schema } from "mongoose";

enum ReservationStatus {
  upcoming = "confirmed",
  cancelled = "cancelled",
}

export interface reservationSchemaInterface extends Document {
  customerName: string;
  date: string;
  attendes: number;
  status: ReservationStatus;
}

export const reservationSchema: Schema<reservationSchemaInterface> = new Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    date: {
      type: String,
      required: [true, "date is required"],
    },
    attendes: {
      type: Number,
      required: [true, "attemdes is required"],
    },
    status: {
      type: String,
      enum: Object.values(ReservationStatus),
      default: ReservationStatus.upcoming,
    },
  },
  { timestamps: true }
);

reservationSchema.statics.checkTotalAttendees = async function (
  date: Date,
  threshold: number
) {
  const Reservation = this as mongoose.Model<reservationSchemaInterface>;

  const aggregationPipeline = [
    {
      $match: {
        date: { $eq: date },
        status: "confirmed", // Only consider confirmed reservations
      },
    },
    {
      $group: {
        _id: null,
        totalAttendees: { $sum: "$attendees" },
      },
    },
  ];

  const result = await Reservation.aggregate(aggregationPipeline);

  const totalAttendees = result.length > 0 ? result[0].totalAttendees : 0;

  return totalAttendees + threshold <= 10; // Assuming the threshold is 10
};

const Reservation =
  (mongoose.models.reservations as mongoose.Model<reservationSchemaInterface>) ||
  mongoose.model("reservations", reservationSchema);

export default Reservation;
