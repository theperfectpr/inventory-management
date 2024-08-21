import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParse from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

// ROUTE IMPORTS
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";


//CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use('/dashboard',dashboardRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

//SERVER
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0",() => {
  console.log(`Server is running on port ${PORT}`);
});
