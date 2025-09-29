import CategoryModel from "./category-model";
import { Category } from "./category-types";

export class CategoryService {
    async create(category: Category) {
        const newCategory = new CategoryModel(category);
        return newCategory.save();
    }
    async update(id: string, category: Category) {
        const updateCategory = await CategoryModel.findByIdAndUpdate(
            id,
            category,
        );
        return updateCategory;
    }
    async getAll() {
        const allCategories = await CategoryModel.find();
        return allCategories;
    }
    async getById(id: string) {
        const category = await CategoryModel.findById(id);
        return category;
    }
    async delete(id: string) {
        const category = await CategoryModel.deleteOne({ _id: id });
        return category;
    }
}
