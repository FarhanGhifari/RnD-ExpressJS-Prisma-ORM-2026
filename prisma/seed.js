require("dotenv").config();
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("--- Memulai Proses Seeding (Mode Driver Adapter) ---");

  await prisma.product.deleteMany();
  console.log("Data lama pada tabel Product berhasil dibersihkan.");

  await prisma.product.createMany({
    data: [
      { name: "Laptop ASUS ROG Zephyrus", price: 28500000, stock: 8 },
      { name: "Mouse Wireless Logitech G Pro X", price: 1950000, stock: 15 },
      { name: "Keyboard Mechanical Keychron K2", price: 1450000, stock: 20 },
      { name: "Monitor Gaming ASUS TUF 24 Inch", price: 3200000, stock: 12 },
    ],
  });

  console.log("--- Proses Seeding Selesai: Data Dummy Berhasil Disisipkan ---");
}

main()
  .catch((error) => {
    console.error("Kegagalan proses seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
