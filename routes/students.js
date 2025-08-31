// server/routes/students.js
import express from 'express';
import Student from '../models/Student.js'; // Make sure Student.js is in /models folder

const router = express.Router();

// ===== Insert one student =====
router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: '✅ Student added', student });
  } catch (error) {
    res.status(400).json({ message: '❌ Error adding student', error: error.message });
  }
});

// ===== Fetch all students =====
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: '❌ Error fetching students', error: error.message });
  }
});

// ===== Filter by course =====
router.get('/course/:course', async (req, res) => {
  try {
    const students = await Student.find({ course: req.params.course });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: '❌ Error filtering students', error: error.message });
  }
});

// ===== Update one student =====
router.put('/update/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: '✅ Student updated', student });
  } catch (error) {
    res.status(400).json({ message: '❌ Error updating student', error: error.message });
  }
});

// ===== Delete one student =====
router.delete('/delete/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Student deleted' });
  } catch (error) {
    res.status(400).json({ message: '❌ Error deleting student', error: error.message });
  }
});

// ===== Delete all students (for practice only) =====
router.delete('/deleteAll', async (req, res) => {
  try {
    await Student.deleteMany({});
    res.json({ message: '✅ All students deleted' });
  } catch (error) {
    res.status(500).json({ message: '❌ Error deleting all students', error: error.message });
  }
});

export default router;
