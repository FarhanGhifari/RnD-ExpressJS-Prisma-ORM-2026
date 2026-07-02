const prisma = require('../config/prisma');

/**
 * @desc    Membuat data produk baru
 * @route   POST /api/products
 */
exports.createProduct = async (req, res) => {
    const { name, price, stock } = req.body;
    try {
        const product = await prisma.product.create({
            data: { 
                name, 
                price: Number(price), 
                stock: Number(stock) 
            }
        });
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    Mengambil seluruh data produk
 * @route   GET /api/products
 */
exports.getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
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
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({ 
            where: { id: Number(id) } 
        });
        
        if (!product) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    Memperbarui data produk berdasarkan ID
 * @route   PUT /api/products/:id
 */
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    try {
        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: { 
                name, 
                price: price ? Number(price) : undefined, 
                stock: stock ? Number(stock) : undefined 
            }
        });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        // P2025 adalah kode error Prisma untuk Record Not Found
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    Menghapus data produk berdasarkan ID
 * @route   DELETE /api/products/:id
 */
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({ 
            where: { id: Number(id) } 
        });
        res.status(200).json({ success: true, message: 'Produk berhasil dihapus' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};