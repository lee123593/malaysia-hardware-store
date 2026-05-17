// GitHub-backed data layer for Vercel deployment
// Stores data as JSON files in the GitHub repository

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const REPO_OWNER = "lee123593";
const REPO_NAME = "malaysia-hardware-store";
const BRANCH = "master";

async function githubApi(path: string, options?: RequestInit) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
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

function getDataPath(filename: string) {
  return `repos/${REPO_OWNER}/${REPO_NAME}/contents/data/${filename}`;
}

export async function readJsonFile<T>(filename: string): Promise<T> {
  try {
    // Use raw.githubusercontent.com for reads — no auth needed for public repos
    // This works at build time (Vercel) when GITHUB_TOKEN isn't available
    const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/data/${filename}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch {
    if (filename === "orders.json") return [] as unknown as T;
    if (filename === "settings.json") return {} as unknown as T;
    return [] as unknown as T;
  }
}

export async function writeJsonFile<T>(filename: string, data: T, message: string) {
  // First get the current file to get its SHA (if it exists)
  let sha = "";
  try {
    const existing = await githubApi(getDataPath(filename));
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

  return githubApi(getDataPath(filename), {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// Product operations
export async function getProducts() {
  return readJsonFile<any[]>("products.json");
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
  const products = await getProducts();
  products.push(product);
  await writeJsonFile("products.json", products, `Add product: ${product.name}`);
  return product;
}

export async function updateProduct(id: string, updates: any) {
  const products = await getProducts();
  const idx = products.findIndex((p: any) => p.id === id);
  if (idx === -1) throw new Error("Product not found");
  products[idx] = { ...products[idx], ...updates };
  await writeJsonFile("products.json", products, `Update product: ${products[idx].name}`);
  return products[idx];
}

export async function deleteProduct(id: string) {
  const products = await getProducts();
  const filtered = products.filter((p: any) => p.id !== id);
  await writeJsonFile("products.json", filtered, `Delete product: ${id}`);
}

// Order operations
export async function getOrders() {
  return readJsonFile<any[]>("orders.json");
}

export async function getOrderByNo(orderNo: string) {
  const orders = await getOrders();
  return orders.find((o: any) => o.orderNo === orderNo) || null;
}

export async function createOrder(order: any) {
  const orders = await getOrders();
  orders.push(order);
  await writeJsonFile("orders.json", orders, `New order: ${order.orderNo}`);
  return order;
}

export async function updateOrder(id: string, updates: any) {
  const orders = await getOrders();
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
export async function getSettings(): Promise<Record<string, string>> {
  try {
    return await readJsonFile<Record<string, string>>("settings.json");
  } catch {
    return {};
  }
}

export async function updateSettings(updates: Record<string, string>) {
  const settings = await getSettings();
  const merged = { ...settings, ...updates };
  await writeJsonFile("settings.json", merged, "Update settings");
  return merged;
}
