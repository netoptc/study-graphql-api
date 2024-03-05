import express from "express";
import categoriesRoutes from './graphQl/routes/categoriesRoutes';
import coursesRoutes from './graphQl/routes/coursesRoutes';

const app = express();

app.use(coursesRoutes);
app.use(categoriesRoutes);

export { app };
