interface ICourse {
    id: string,
    name: string,
    description?: string,
    categoryId: string
}

class Course {
    id: string;
    name: string;
    description?: string;
    categoryId: string

    constructor({id, name, description, categoryId}: ICourse) {
        this.id =  id;
        this.name= name;
        this.description = description;
        this.categoryId = categoryId;
    }   
}

export default Course;