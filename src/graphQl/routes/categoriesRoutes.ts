import express from 'express';
import { createHandler } from 'graphql-http/lib/use/http';
import categorySchema from '../schemas/categorySchema';
import categoryResolvers from '../resolvers/categoryResolvers';

const router = express.Router();

router.all(
  '/categories',
  createHandler({
    schema: categorySchema,
    rootValue: categoryResolvers,
  })
);

export default router;
