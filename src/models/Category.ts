interface ICategory {
    id: string,
    name: string,
    description?: string,
}

class Category {
    id: string;
    name: string;
    description?: string;

    constructor({id, name, description}: ICategory) {
        this.id =  id;
        this.name= name;
        this.description = description;
    }
}

export default Category;