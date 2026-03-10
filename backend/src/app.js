import cors from 'cors';
import express from 'express';
import errorHandler from './middleware/error.middleware.js';
import daysRoutes from './routes/day.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/days', daysRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
