class CategoryService {
  categories;
  constructor() {
    this.categories = [];
  }

  // Create a new category
  createCategory(newCategory) {
    // Generate a simple auto-incremented ID (for demonstration; use DB in production)
    const categories = this.getCategories();
    const newId =
      categories && categories.length
        ? Math.max(...categories.map((c) => c.id || 0)) + 1
        : 1;
    newCategory = { id: newId, ...newCategory };
    this.categories.push(newCategory);
    return newCategory;
  }

  // Get all categories
  getCategories() {
    return this.categories;
  }

  // Get a category by ID
  getCategoryById(id) {
    return this.categories.find((category) => category.id === id);
  }

  // Update a category
  updateCategory(id, updatedData) {
    const category = this.getCategoryById(id);
    if (category) {
      Object.assign(category, updatedData);
      return category;
    }
    return undefined;
  }

  // Delete a category
  deleteCategory(id) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index !== -1) {
      this.categories.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default CategoryService;
