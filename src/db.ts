 import mongoose, { Schema, Types, model } from 'mongoose';

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://testuserharin:hari2005@cluster0.llwnf.mongodb.net/brain_app");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectDB();

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const User = model("User", UserSchema);


const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Types.ObjectId, ref: 'User' }, 
});



const TagSchema = new Schema({
  name: { type: String, required: true },
});

export const Tag = model('Tag', TagSchema);

export const Content = model("Content",ContentSchema)
