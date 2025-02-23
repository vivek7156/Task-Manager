import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/task.route.js';
import userRoutes from './routes/user.route.js';
import commentRoutes from './routes/comment.route.js';
import errorHandler from './middlewares/errorhandler.middleware.js';
import path from 'path';

const app = express();

dotenv.config();

// Connect to MongoDB
connectDB();

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);
// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
