import mongoose, { Document, Schema } from "mongoose";
import { orderSchema, orderSchemaInterface } from "./order.model";
import {
  reservationSchema,
  reservationSchemaInterface,
} from "./reservation.model";

export interface userSchemaInterface extends Document {
  username: string;
  email: string;
  fullName: string;
  password: string;
  avatar: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  forgotPasswordCode: string;
  forgotPasswordCodeExpiry: Date;
  orders: orderSchemaInterface[];
  reservations: reservationSchemaInterface[];
}

const userSchema: Schema<userSchemaInterface> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      match: [/^[a-zA-Z0-9\s]+$/, "Please use a valid username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [/.+\@.+\..+/, "please use a valid email"],
    },
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    avatar: {
      type: String,
      default: "",
    },
    verifyCode: {
      type: String,
    },
    verifyCodeExpiry: {
      type: Date,
    },
    forgotPasswordCode: {
      type: String,
    },
    forgotPasswordCodeExpiry: {
      type: Date,
    },
    orders: {
      type: [orderSchema],
      default: [],
    },
    reservations: {
      type: [reservationSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User =
  (mongoose.models.users as mongoose.Model<userSchemaInterface>) ||
  mongoose.model<userSchemaInterface>("users", userSchema);

export default User;
