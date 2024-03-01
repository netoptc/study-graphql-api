import express from "express";
import categoryRoutes from './graphQl/routes/categoryRoutes';

const app = express();

app.use(categoryRoutes);

export { app };
