class ProductService {
  constructor() {
    this.products = [];
  }

  // Create a new product with validation and unique ID assignment
  createProduct(newProduct) {
    // Basic validation
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.category
    ) {
      throw new Error('Invalid product data. All fields are required.');
    }

    // Generate a unique ID
    const newId =
      this.products.length > 0
        ? Math.max(...this.products.map((p) => p.id || 0)) + 1
        : 1;

    const product = {
      id: newId,
      ...newProduct,
    };

    this.products.push(product);
    return product;
  }

  // Retrieves all products
  getProducts() {
    return this.products;
  }

  // Retrieves a product by its ID
  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  // Updates an existing product
  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      return this.products[index];
    }
    return undefined;
  }

  // Deletes a product by its ID
  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default ProductService;
