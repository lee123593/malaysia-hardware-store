import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "file:./dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: { username: "admin", password: hash },
  });

  // Default settings
  const settings = [
    { key: "sst_rate", value: "0.10" },
    { key: "sst_enabled", value: "true" },
    { key: "shipping_west", value: "8" },
    { key: "shipping_east", value: "18" },
    { key: "free_shipping_min", value: "200" },
    { key: "store_name", value: "MY Hardware Pro" },
    { key: "store_email", value: "sales@myhardware.pro" },
    { key: "store_phone", value: "+60 3-xxxx-xxxx" },
    { key: "currency", value: "MYR" },
  ];
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // Seed products
  const products = [
    {
      name: "Premium Steel Wood Screws Set",
      nameZh: "高端钢制木螺丝套装",
      slug: "premium-steel-wood-screws",
      description: "High-quality carbon steel wood screws. Perfect for furniture assembly and woodworking. Rust-resistant coating. Available in multiple sizes.",
      descriptionZh: "高品质碳钢木螺丝。适用于家具组装和木工。防锈涂层，多种规格可选。",
      price: 12.90,
      category: "screws-fasteners",
      categoryZh: "螺丝紧固件",
      images: JSON.stringify(["/images/screws-1.jpg"]),
      featured: true,
      weight: 0.3,
      sku: "SCW-001",
    },
    {
      name: "Heavy Duty Stainless Steel Bolts Kit",
      nameZh: "重型不锈钢螺栓套件",
      slug: "heavy-duty-bolts-kit",
      description: "A2-70 stainless steel hex bolts with nuts and washers. Ideal for construction and heavy machinery. M6-M12 mixed set.",
      descriptionZh: "A2-70不锈钢六角螺栓配螺母垫圈。适用于建筑和重型机械，M6-M12混合套装。",
      price: 25.50,
      category: "screws-fasteners",
      categoryZh: "螺丝紧固件",
      images: JSON.stringify(["/images/bolts-1.jpg"]),
      featured: true,
      weight: 0.8,
      sku: "BLT-002",
    },
    {
      name: "Professional Electric Drill 680W",
      nameZh: "专业电钻 680W",
      slug: "electric-drill-680w",
      description: "680W impact drill with variable speed control. Includes 13mm chuck, depth gauge and auxiliary handle. Perfect for concrete, metal and wood drilling.",
      descriptionZh: "680W冲击钻，变速控制。含13mm夹头、深度尺和辅助手柄。适用于混凝土、金属和木材钻孔。",
      price: 189.00,
      category: "power-tools",
      categoryZh: "电动工具",
      images: JSON.stringify(["/images/drill-1.jpg"]),
      featured: true,
      weight: 2.5,
      sku: "PWT-001",
    },
    {
      name: "Digital Caliper 150mm Precision",
      nameZh: "数显卡尺 150mm 精密测量",
      slug: "digital-caliper-150mm",
      description: "Stainless steel digital caliper with LCD display. 0.01mm precision. Measures internal, external, depth and step dimensions.",
      descriptionZh: "不锈钢数显卡尺，LCD显示，0.01mm精度。测量内径、外径、深度和台阶尺寸。",
      price: 45.00,
      category: "tools",
      categoryZh: "工具类",
      images: JSON.stringify(["/images/caliper-1.jpg"]),
      featured: false,
      weight: 0.3,
      sku: "TOL-001",
    },
    {
      name: "Aluminum Window Sliding Roller Set",
      nameZh: "铝合金窗推拉滑轮套装",
      slug: "window-sliding-roller",
      description: "Heavy-duty nylon roller wheels for aluminum sliding windows and doors. Smooth and quiet operation. Set of 4 with mounting screws.",
      descriptionZh: "重型尼龙滚轮，用于铝合金推拉门窗。平稳静音，4个装含安装螺丝。",
      price: 18.90,
      category: "door-window",
      categoryZh: "门窗配件",
      images: JSON.stringify(["/images/roller-1.jpg"]),
      featured: false,
      weight: 0.2,
      sku: "DWP-001",
    },
    {
      name: "Construction Safety Helmet ANSI Certified",
      nameZh: "建筑安全帽 ANSI认证",
      slug: "safety-helmet-ansi",
      description: "High-density ABS safety helmet with 6-point adjustable suspension. ANSI Z89.1 certified. Lightweight and comfortable for all-day wear.",
      descriptionZh: "高密度ABS安全帽，6点可调悬挂。ANSI Z89.1认证。轻便舒适，适合全天佩戴。",
      price: 15.00,
      category: "building-hardware",
      categoryZh: "建筑五金",
      images: JSON.stringify(["/images/helmet-1.jpg"]),
      featured: false,
      weight: 0.4,
      sku: "BHW-001",
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: p,
      create: p,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
