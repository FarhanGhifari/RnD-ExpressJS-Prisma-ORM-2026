const productRepository = require("../repository/productRepository");

class ProductUseCase {
  async getAllProducts() {
    const products = await productRepository.findAll();
    return products;
  }

  async getProductById(id) {
    const productId = Number(id);
    if (isNaN(productId)) {
      throw Object.assign(new Error("ID harus berupa angka"), {
        statusCode: 400,
      });
    }

    const product = await productRepository.findById(productId);
    if (!product) {
      throw Object.assign(new Error("Produk tidak ditemukan"), {
        statusCode: 404,
      });
    }

    return product;
  }

  async createProduct(data) {
    const { name, price, stock } = data;

    if (!name || price === undefined || stock === undefined) {
      throw Object.assign(
        new Error("Field name, price, dan stock wajib diisi"),
        { statusCode: 400 },
      );
    }

    const product = await productRepository.create({
      name,
      price: Number(price),
      stock: Number(stock),
    });

    return product;
  }

  async updateProduct(id, data) {
    const productId = Number(id);
    if (isNaN(productId)) {
      throw Object.assign(new Error("ID harus berupa angka"), {
        statusCode: 400,
      });
    }

    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.price !== undefined) updateData.price = Number(data.price);
    if (data.stock !== undefined) updateData.stock = Number(data.stock);

    let product;
    try {
      product = await productRepository.update(productId, updateData);
    } catch (error) {
      if (error.code === "P2025") {
        throw Object.assign(new Error("Produk tidak ditemukan"), {
          statusCode: 404,
        });
      }
      throw error;
    }

    return product;
  }

  async deleteProduct(id) {
    const productId = Number(id);
    if (isNaN(productId)) {
      throw Object.assign(new Error("ID harus berupa angka"), {
        statusCode: 400,
      });
    }

    try {
      await productRepository.delete(productId);
    } catch (error) {
      if (error.code === "P2025") {
        throw Object.assign(new Error("Produk tidak ditemukan"), {
          statusCode: 404,
        });
      }
      throw error;
    }
  }
}

module.exports = new ProductUseCase();
