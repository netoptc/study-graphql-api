import Category from '../../models/Category';
import Course from '../../models/Course';
import { categoryDatabase } from './categoryResolvers';

export const courseDatabase: Course[] = [];

type PropsGetCourse = {
  id: string
}

type PropsCreateCourse = {
  input: {
    name: string,
    description?: string,
    categoryId: string,
  }
}

type PropsUpdateCourse = {
  id: string,
  input: {
    name: string,
    description?: string,
    categoryId?: string,
  }
}


type PropsListCoursesByCategory = {
  categoryId: string
}

type PropsDeleteCourse = {
  id: string
}

const courseResolvers = {
  getCourse: ({id}: PropsGetCourse): Course => {
    const course = courseDatabase.find((course: Course) => (course.id === id))
    if(!course) {
      throw new Error(`No course exist with id ${id}`)
    }

    return course
  },

  createCourse: ({input}: PropsCreateCourse): Course => {
    const id = require("crypto").randomBytes(10).toString("hex")
    const category = categoryDatabase.find((category: Category) => (category.id === input.categoryId))
    if (!category) {
        throw new Error(`No category exist with id ${input.categoryId}`)
    }
    
    const course = new Course({
      id,
      name: input.name,
      description: input.description,
      categoryId: category.id
    })
    courseDatabase.push(course)
    return course;
  },

  updateCourse: ({ id, input }: PropsUpdateCourse): Course => {
    const course = courseDatabase.find((course: Course) => (course.id === id))
    if(!course) {
      throw new Error(`No course exist with id ${id}`)
    }
    
    const courseUpdate = Object.assign(course, input)
    return courseUpdate
  },

  listCourses: (): Category[] => {
    return courseDatabase
  },

  listCoursesByCategory: ({categoryId}: PropsListCoursesByCategory): Course[] => {
    const index = categoryDatabase.findIndex((category: Category) => category.id === categoryId);
    if (index === -1) {
        throw new Error(`No category exists with id ${categoryId}`);
    }
    const courses = courseDatabase.filter((course: Course) => course.categoryId === categoryId);

    return courses
  },

  deleteCourse: ({id}: PropsDeleteCourse) => {
    const index = courseDatabase.findIndex((course: Category) => course.id === id);
    if (index === -1) {
        throw new Error(`No course exists with id ${id}`);
    }
    courseDatabase.splice(index, 1);
    return `Course with id ${id} deleted successfully.`;
  }
}

export default courseResolvers;
