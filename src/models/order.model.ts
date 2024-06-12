import mongoose, { Document, Schema } from "mongoose";

export interface orderItemInterface extends Document {
  name: string;
  quantity: number;
  price: number;
}

export interface orderSchemaInterface extends Document {
  items: orderItemInterface[];
  totalAmount: number;
  customerName: string;
}

export const orderSchema: Schema<orderSchemaInterface> = new Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer Name is required"],
    },
    totalAmount: { type: Number, required: [true, "total is required"] },
    items: {
      type: [
        {
          name: String,
          quantity: Number,
          price: Number,
        },
      ],
      required: [true, "Order items are required"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default Order;
