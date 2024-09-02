import express from 'express';
import eventRoutes from './routes/eventRoutes';
import profileRoutes from './routes/profileRoutes';
import eventProfileRoutes from './routes/eventProfileRoutes';
import cors from 'cors';

const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173' // Адрес твоего фронтенда
  }));

  
mongoose
  .connect(
    'mongodb+srv://dnahshonov:sk859vlbro@cluster0.txy3eu1.mongodb.net/eventsWebApp'
  )
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((error: any) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/eventprofiles', eventProfileRoutes);


// Подключаем маршруты
app.use('/api', eventRoutes);

// Обработчик ошибок
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});