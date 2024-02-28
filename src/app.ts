import express, { Request, Response } from "express";
import { buildSchema } from "graphql";
import { createHandler } from 'graphql-http/lib/use/http';

import Category from "./model/Category";


const categoryDatabase: Category[] = []

var schema = buildSchema(`
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
  }

  type Mutation {
    createCategory(input: CategoryInput): Category,
    updateCategory(id: ID!, input: CategoryInput): Category
  }
`)


type PropsGetCategory = {
  id: string
}

type PropsCreateCategory = {
  input: {
    name: string,
    description?: string,
  }
}

type PropsUpdateCategory = {
  id: string,
  input: {
    name: string,
    description?: string,
  }
}

var root = {
  getCategory: ({id}: PropsGetCategory): Category => {
    console.log('entrou aqui ')
    const category = categoryDatabase.find((category: Category) => (category.id === id))
    if(!category) {
      throw new Error(`No category exist with id ${id}`)
    }

    return category
  },

  createCategory: ({input}: PropsCreateCategory) => {
    const id = require("crypto").randomBytes(10).toString("hex")
    const category = new Category({
      id,
      name: input.name,
      description: input.description,
    })
    categoryDatabase.push(category)
    return category;
  },

  updateCategory: ({ id, input }: PropsUpdateCategory) => {
    console.log(id);
  }

}

const app = express();

app.all(
	"/graphql",
	createHandler({
		schema: schema,
		rootValue: root,
	})
)
export { app };
