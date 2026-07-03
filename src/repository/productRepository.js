const prisma = require("../config/prisma");

class ProductRepository {
  async findAll() {
    return prisma.product.findMany();
  }

  async findById(id) {
    return prisma.product.findUnique({ where: { id } });
  }

  async create(data) {
    return prisma.product.create({ data });
  }

  async update(id, data) {
    return prisma.product.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.product.delete({ where: { id } });
  }
}

module.exports = new ProductRepository();
