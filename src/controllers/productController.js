const productUseCase = require("../usecases/productUseCase");

/**
 * @desc    Membuat data produk baru
 * @route   POST /api/products
 */
exports.createProduct = async (req, res) => {
  try {
    const product = await productUseCase.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Mengambil seluruh data produk
 * @route   GET /api/products
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productUseCase.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Mengambil satu data produk berdasarkan ID
 * @route   GET /api/products/:id
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await productUseCase.getProductById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Memperbarui data produk berdasarkan ID
 * @route   PUT /api/products/:id
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await productUseCase.updateProduct(req.params.id, req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Menghapus data produk berdasarkan ID
 * @route   DELETE /api/products/:id
 */
exports.deleteProduct = async (req, res) => {
  try {
    await productUseCase.deleteProduct(req.params.id);
    res.status(200).json({ success: true, message: "Produk berhasil dihapus" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};
