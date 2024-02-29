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
    listCategories: [Category!]
  }

  type Mutation {
    updateCategory(id: ID!, input: CategoryInput): Category
    createCategory(input: CategoryInput): Category
    deleteCategoy(id: ID!): String
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


type PropsDeleteCategory = {
  id: string
}

var root = {
  getCategory: ({id}: PropsGetCategory): Category => {
    const category = categoryDatabase.find((category: Category) => (category.id === id))
    if(!category) {
      throw new Error(`No category exist with id ${id}`)
    }

    return category
  },

  createCategory: ({input}: PropsCreateCategory): Category => {
    const id = require("crypto").randomBytes(10).toString("hex")
    const category = new Category({
      id,
      name: input.name,
      description: input.description,
    })
    categoryDatabase.push(category)
    return category;
  },

  updateCategory: ({ id, input }: PropsUpdateCategory): Category => {
    const category = categoryDatabase.find((category: Category) => (category.id === id))
    if(!category) {
      throw new Error(`No category exist with id ${id}`)
    }
    
    const categoryUpdate = Object.assign(category, input)
    return categoryUpdate
  },

  listCategories: (): Category[] => {
    return categoryDatabase
  },

  deleteCategoy: ({id}: PropsDeleteCategory) => {
    const index = categoryDatabase.findIndex((category: Category) => category.id === id);
    if (index === -1) {
        throw new Error(`No category exists with id ${id}`);
    }
    categoryDatabase.splice(index, 1);
    return `Category with id ${id} deleted successfully.`;
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
