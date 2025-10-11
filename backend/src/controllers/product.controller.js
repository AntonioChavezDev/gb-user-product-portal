import ProductService from '../services/product.service.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();

    this.createProduct = this.createProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async createProduct(req, res) {
    try {
      const { name, description, price, category } = req.body;
      const productData = { name, description, price, category };
      const newProduct = await this.productService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all products
  getProducts(req, res) {
    try {
      const products = this.productService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProduct(req, res) {
    try {
      const productId = parseInt(req.params.id, 10);

      const product = await this.productService.getProductById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = parseInt(req.params.id, 10);
      const { name, description, price, category } = req.body;
      const productData = { name, description, price, category };

      const updatedProduct = await this.productService.updateProduct(
        productId,
        productData
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = parseInt(req.params.id, 10);
      const deletedProduct = await this.productService.deleteProduct(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
