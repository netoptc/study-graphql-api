// categoryResolvers.js
import Category from '../../models/Category';

const categoryDatabase: Category[] = [];

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

const categoryResolvers = {
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

  deleteCategory: ({id}: PropsDeleteCategory) => {
    const index = categoryDatabase.findIndex((category: Category) => category.id === id);
    if (index === -1) {
        throw new Error(`No category exists with id ${id}`);
    }
    categoryDatabase.splice(index, 1);
    return `Category with id ${id} deleted successfully.`;
  }
}

export default categoryResolvers;
