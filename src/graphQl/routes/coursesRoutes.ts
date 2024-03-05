import express from 'express';
import { createHandler } from 'graphql-http/lib/use/http';
import courseSchema from '../schemas/courseSchema';
import courseResolvers from '../resolvers/courseResolvers';

const router = express.Router();

router.all(
  '/courses',
  createHandler({
    schema: courseSchema,
    rootValue: courseResolvers,
  })
);

export default router;
