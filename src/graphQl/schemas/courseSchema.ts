import { buildSchema } from 'graphql';

const courseSchema = buildSchema(`
  type Course {
    id: ID!
    name: String!
    description: String
    categoryId: ID!
  }
  
  input CourseInput {
    name: String!
    description: String
    categoryId: ID!
  }

  type Query {
    getCourse(id: ID!): Course
    listCourses: [Course!]
  }

  type Mutation {
    updateCourse(id: ID!, input: CourseInput): Course
    createCourse(input: CourseInput): Course
    deleteCourse(id: ID!): String
  }
`);

export default courseSchema;