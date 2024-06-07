import mongoose, { Document, Schema } from "mongoose";

export interface orderSchemaInterface extends Document {
  product: string;
  quantity: number;
  price: number;
  total: number;
}

export const orderSchema: Schema<orderSchemaInterface> = new Schema(
  {
    product: { type: String, required: [true, "Product name is required"] },
    quantity: {
      type: Number,
      required: [true, "Quantity of product is required"],
      default: 1,
    },
    price: { type: Number, required: [true, "price is required"] },
    total: { type: Number, required: [true, "total is required"] },
  },
  { timestamps: true }
);

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default Order;
