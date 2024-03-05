import { buildSchema } from 'graphql';

const categorySchema = buildSchema(`
  type Category {
    id: ID!
    name: String!
    description: String
  }
  
  input CategoryInput {
    name: String!
    description: String
  }

  type Query {
    getCategory(id: ID!): Category
    listCategories: [Category!]
  }

  type Mutation {
    updateCategory(id: ID!, input: CategoryInput): Category
    createCategory(input: CategoryInput): Category
    deleteCategory(id: ID!): String
  }
`);

export default categorySchema;
