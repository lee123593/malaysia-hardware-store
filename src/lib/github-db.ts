// Data layer: local filesystem (dev) or GitHub API (production)
// When GITHUB_TOKEN is set, reads/writes via GitHub API for Vercel deployment.
// When not set, reads/writes local JSON files in the data/ directory.

import fs from "fs";
import path from "path";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const REPO_OWNER = process.env.GH_REPO_OWNER || "lee123593";
const REPO_NAME = process.env.GH_REPO_NAME || "malaysia-hardware-store";
const BRANCH = process.env.GH_BRANCH || "master";

const DATA_DIR = path.join(process.cwd(), "data");

const isGitHub = !!GITHUB_TOKEN;

async function githubApi(path: string, options?: RequestInit) {
  const res = await fetch(`https://api.github.com/${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${err}`);
  }
  return res.json();
}

function gitHubDataPath(filename: string) {
  return `repos/${REPO_OWNER}/${REPO_NAME}/contents/data/${filename}`;
}

function localPath(filename: string) {
  return path.join(DATA_DIR, filename);
}

function readLocalJson<T>(filename: string): T {
  const filePath = localPath(filename);
  if (!fs.existsSync(filePath)) {
    if (filename === "orders.json") return [] as unknown as T;
    if (filename === "settings.json") return {} as unknown as T;
    return [] as unknown as T;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeLocalJson<T>(filename: string, data: T): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(localPath(filename), JSON.stringify(data, null, 2));
}

export async function readJsonFile<T>(filename: string, options?: { fresh?: boolean }): Promise<T> {
  if (!isGitHub) {
    return readLocalJson<T>(filename);
  }

  try {
    const data = await githubApi(gitHubDataPath(filename));
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return JSON.parse(content) as T;
  } catch {
    if (filename === "orders.json") return [] as unknown as T;
    if (filename === "settings.json") return {} as unknown as T;
    return [] as unknown as T;
  }
}

export async function writeJsonFile<T>(filename: string, data: T, message: string) {
  if (!isGitHub) {
    writeLocalJson(filename, data);
    return { success: true };
  }

  let sha = "";
  try {
    const existing = await githubApi(gitHubDataPath(filename));
    sha = existing.sha;
  } catch {
    // File doesn't exist yet
  }

  const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");

  const body: Record<string, string> = {
    message,
    content,
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  return githubApi(gitHubDataPath(filename), {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// Product operations
export async function getProducts(options?: { fresh?: boolean }) {
  return readJsonFile<any[]>("products.json", options);
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p: any) => p.slug === slug) || null;
}

export async function getProductById(id: string) {
  const products = await getProducts();
  return products.find((p: any) => p.id === id) || null;
}

export async function createProduct(product: any) {
  const products = await getProducts({ fresh: true });
  products.push(product);
  await writeJsonFile("products.json", products, `Add product: ${product.name}`);
  return product;
}

export async function updateProduct(id: string, updates: any) {
  const products = await getProducts({ fresh: true });
  const idx = products.findIndex((p: any) => p.id === id);
  if (idx === -1) throw new Error("Product not found");
  products[idx] = { ...products[idx], ...updates };
  await writeJsonFile("products.json", products, `Update product: ${products[idx].name}`);
  return products[idx];
}

export async function deleteProduct(id: string) {
  const products = await getProducts({ fresh: true });
  const filtered = products.filter((p: any) => p.id !== id);
  await writeJsonFile("products.json", filtered, `Delete product: ${id}`);
}

// Order operations
export async function getOrders(options?: { fresh?: boolean }) {
  return readJsonFile<any[]>("orders.json", options);
}

export async function getOrderByNo(orderNo: string) {
  const orders = await getOrders();
  return orders.find((o: any) => o.orderNo === orderNo) || null;
}

export async function createOrder(order: any) {
  const orders = await getOrders({ fresh: true });
  orders.push(order);
  await writeJsonFile("orders.json", orders, `New order: ${order.orderNo}`);
  return order;
}

export async function updateOrder(id: string, updates: any) {
  const orders = await getOrders({ fresh: true });
  const idx = orders.findIndex((o: any) => o.id === id);
  if (idx === -1) throw new Error("Order not found");
  orders[idx] = { ...orders[idx], ...updates };
  await writeJsonFile(
    "orders.json",
    orders,
    `Update order ${orders[idx].orderNo}: status -> ${updates.status || orders[idx].status}`
  );
  return orders[idx];
}

// Settings operations
export async function getSettings(options?: { fresh?: boolean }): Promise<Record<string, string>> {
  try {
    return await readJsonFile<Record<string, string>>("settings.json", options);
  } catch {
    return {};
  }
}

export async function updateSettings(updates: Record<string, string>) {
  const settings = await getSettings({ fresh: true });
  const merged = { ...settings, ...updates };
  await writeJsonFile("settings.json", merged, "Update settings");
  return merged;
}
