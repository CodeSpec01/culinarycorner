import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("DB is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connecteed successfully");
  } catch (error) {
    console.log("Something went wrong => ", error);
  }
}

export { dbConnect };
