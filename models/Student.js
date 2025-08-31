// server/models/Student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  course: { type: String },
  email: { type: String, unique: true }
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
