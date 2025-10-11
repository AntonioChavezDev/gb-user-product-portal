import CategoryService from '../services/category.service.js';

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();

    this.createCategory = this.createCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getCategoryById = this.getCategoryById.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      const categoryData = { name, description };
      const newCategory = await this.categoryService.createCategory(
        categoryData
      );
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await this.categoryService.getCategories();
      if (categories) {
        res.status(200).json(categories);
      } else {
        res.status(404).json({ message: 'Categories not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCategoryById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const category = await this.categoryService.getCategoryById(id);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const categoryId = parseInt(req.params.id, 10);
      const { name, description } = req.body;
      const categoryData = { id: categoryId, name, description };

      const updatedCategory = await this.categoryService.updateCategory(
        categoryId,
        categoryData
      );
      if (updatedCategory) {
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const categoryId = parseInt(req.params.id, 10);
      const deleted = await this.categoryService.deleteCategory(categoryId);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default CategoryController;
