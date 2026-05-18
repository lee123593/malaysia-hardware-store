import { translations, type Lang } from "@/i18n";

export interface ContentField {
  key: string;
  label: string;
  type: "text" | "textarea";
  arrayIndex?: number;
}

export interface ContentSection {
  id: string;
  label: string;
  fields: ContentField[];
}

export function fieldToSettingsKey(field: ContentField, lang: Lang): string {
  const path = field.key.replace(/\./g, "_");
  const suffix = field.arrayIndex !== undefined ? `_${field.arrayIndex}` : "";
  return `content_${lang}_${path}${suffix}`;
}

export function getStaticValue(obj: Record<string, any>, path: string): string {
  const parts = path.split(".");
  let current: any = obj;
  for (const part of parts) {
    if (current == null) return "";
    if (Array.isArray(current)) {
      const idx = parseInt(part, 10);
      current = isNaN(idx) ? undefined : current[idx];
    } else {
      current = current[part];
    }
  }
  return typeof current === "string" ? current : "";
}

function t(label: string): string {
  return label;
}

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "nav",
    label: "Navigation",
    fields: [
      { key: "nav.home", label: "Home", type: "text" },
      { key: "nav.products", label: "Products", type: "text" },
      { key: "nav.cart", label: "Cart", type: "text" },
      { key: "nav.orders", label: "Orders", type: "text" },
      { key: "nav.about", label: "About", type: "text" },
      { key: "nav.shipping", label: "Shipping", type: "text" },
      { key: "nav.payment", label: "Payment", type: "text" },
    ],
  },
  {
    id: "header",
    label: "Header",
    fields: [
      { key: "header.storeName", label: "Store Name", type: "text" },
    ],
  },
  {
    id: "home_hero",
    label: "Homepage - Hero",
    fields: [
      { key: "home.hero", label: "Hero Heading", type: "text" },
      { key: "home.heroLine2", label: "Hero Subheading", type: "text" },
      { key: "home.heroSub", label: "Hero Description", type: "textarea" },
      { key: "home.shopNow", label: "Shop Now Button", type: "text" },
      { key: "home.aboutUs", label: "About Us Button", type: "text" },
    ],
  },
  {
    id: "home_featured",
    label: "Homepage - Featured",
    fields: [
      { key: "home.featuredProducts", label: "Section Heading", type: "text" },
      { key: "home.featuredSub", label: "Section Subtitle", type: "text" },
      { key: "home.viewAll", label: "View All Link", type: "text" },
    ],
  },
  {
    id: "home_whyus",
    label: "Homepage - Why Us",
    fields: [
      { key: "home.whyUs", label: "Section Heading", type: "text" },
      { key: "home.why1Title", label: "Card 1 Title", type: "text" },
      { key: "home.why1Desc", label: "Card 1 Description", type: "textarea" },
      { key: "home.why2Title", label: "Card 2 Title", type: "text" },
      { key: "home.why2Desc", label: "Card 2 Description", type: "textarea" },
      { key: "home.why3Title", label: "Card 3 Title", type: "text" },
      { key: "home.why3Desc", label: "Card 3 Description", type: "textarea" },
    ],
  },
  {
    id: "home_seo",
    label: "Homepage - SEO",
    fields: [
      { key: "home.seoTagline", label: "SEO Tagline", type: "text" },
      { key: "home.seoSubtagline", label: "SEO Subtagline", type: "textarea" },
    ],
  },
  {
    id: "products",
    label: "Products Page",
    fields: [
      { key: "products.title", label: "Page Title", type: "text" },
      { key: "products.category", label: "Category Label", type: "text" },
      { key: "products.allCategories", label: "All Categories", type: "text" },
      { key: "products.sortBy", label: "Sort By Label", type: "text" },
      { key: "products.priceLow", label: "Price Low-High", type: "text" },
      { key: "products.priceHigh", label: "Price High-Low", type: "text" },
      { key: "products.newest", label: "Newest", type: "text" },
      { key: "products.addToCart", label: "Add to Cart", type: "text" },
      { key: "products.outOfStock", label: "Out of Stock", type: "text" },
      { key: "products.sku", label: "SKU Label", type: "text" },
      { key: "products.origin", label: "Origin Label", type: "text" },
      { key: "products.weight", label: "Weight Label", type: "text" },
      { key: "products.noProducts", label: "No Products Found", type: "text" },
      { key: "products.sstNote", label: "SST Note", type: "text" },
      { key: "products.relatedProducts", label: "Related Products", type: "text" },
      { key: "products.breadcrumbHome", label: "Breadcrumb Home", type: "text" },
      { key: "products.breadcrumbProducts", label: "Breadcrumb Products", type: "text" },
      { key: "products.categories", label: "Screws & Fasteners", type: "text", arrayIndex: 0 },
      { key: "products.categories", label: "Hand Tools", type: "text", arrayIndex: 1 },
      { key: "products.categories", label: "Building Hardware", type: "text", arrayIndex: 2 },
      { key: "products.categories", label: "Door & Window", type: "text", arrayIndex: 3 },
      { key: "products.categories", label: "Power Tools", type: "text", arrayIndex: 4 },
      { key: "products.categories", label: "Accessories", type: "text", arrayIndex: 5 },
    ],
  },
  {
    id: "cart",
    label: "Cart Page",
    fields: [
      { key: "cart.title", label: "Page Title", type: "text" },
      { key: "cart.empty", label: "Empty Cart Message", type: "text" },
      { key: "cart.continueShopping", label: "Continue Shopping", type: "text" },
      { key: "cart.subtotal", label: "Subtotal Label", type: "text" },
      { key: "cart.shipping", label: "Shipping Label", type: "text" },
      { key: "cart.tax", label: "Tax Label", type: "text" },
      { key: "cart.total", label: "Total Label", type: "text" },
      { key: "cart.checkout", label: "Checkout Button", type: "text" },
      { key: "cart.quantity", label: "Quantity Label", type: "text" },
      { key: "cart.remove", label: "Remove Button", type: "text" },
      { key: "cart.freeShippingNote", label: "Free Shipping Note", type: "text" },
      { key: "cart.calculatedAtCheckout", label: "Calculated at Checkout", type: "text" },
      { key: "cart.addedToCart", label: "Added to Cart Toast", type: "text" },
    ],
  },
  {
    id: "checkout",
    label: "Checkout Page",
    fields: [
      { key: "checkout.title", label: "Page Title", type: "text" },
      { key: "checkout.customerInfo", label: "Customer Info Heading", type: "text" },
      { key: "checkout.name", label: "Name Field", type: "text" },
      { key: "checkout.email", label: "Email Field", type: "text" },
      { key: "checkout.phone", label: "Phone Field", type: "text" },
      { key: "checkout.address", label: "Address Field", type: "text" },
      { key: "checkout.city", label: "City Field", type: "text" },
      { key: "checkout.state", label: "State Field", type: "text" },
      { key: "checkout.postcode", label: "Postcode Field", type: "text" },
      { key: "checkout.paymentMethod", label: "Payment Method Heading", type: "text" },
      { key: "checkout.orderSummary", label: "Order Summary Heading", type: "text" },
      { key: "checkout.placeOrder", label: "Place Order Button", type: "text" },
      { key: "checkout.required", label: "Required Indicator", type: "text" },
      { key: "checkout.selectState", label: "Select State", type: "text" },
      { key: "checkout.autoCalculated", label: "Auto Calculated", type: "text" },
      { key: "checkout.processing", label: "Processing Text", type: "text" },
      { key: "checkout.fillRequired", label: "Fill Required Error", type: "text" },
      { key: "checkout.networkError", label: "Network Error", type: "text" },
      { key: "checkout.cartEmpty", label: "Cart Empty", type: "text" },
      { key: "checkout.continueShopping", label: "Continue Shopping", type: "text" },
      { key: "checkout.paymentGatewayNote", label: "Payment Gateway Note", type: "textarea" },
      { key: "checkout.regionEast", label: "East MY Label", type: "text" },
      { key: "checkout.regionWest", label: "West MY Label", type: "text" },
      { key: "checkout.paymentMethods", label: "Touch 'n Go", type: "text", arrayIndex: 0 },
      { key: "checkout.paymentMethods", label: "Boost", type: "text", arrayIndex: 1 },
      { key: "checkout.paymentMethods", label: "Card", type: "text", arrayIndex: 2 },
      { key: "checkout.paymentMethods", label: "Bank Transfer", type: "text", arrayIndex: 3 },
    ],
  },
  {
    id: "order",
    label: "Order Page",
    fields: [
      { key: "order.title", label: "Page Title", type: "text" },
      { key: "order.lookup", label: "Lookup Heading", type: "text" },
      { key: "order.orderNo", label: "Order No Label", type: "text" },
      { key: "order.search", label: "Search Button", type: "text" },
      { key: "order.status", label: "Status Label", type: "text" },
      { key: "order.details", label: "Details Heading", type: "text" },
      { key: "order.items", label: "Items Heading", type: "text" },
      { key: "order.shippingAddress", label: "Shipping Address", type: "text" },
      { key: "order.paymentInfo", label: "Payment Info", type: "text" },
      { key: "order.notFound", label: "Not Found Message", type: "text" },
      { key: "order.subtotal", label: "Subtotal Label", type: "text" },
      { key: "order.shipping", label: "Shipping Label", type: "text" },
      { key: "order.tax", label: "Tax Label", type: "text" },
      { key: "order.total", label: "Total Label", type: "text" },
      { key: "order.free", label: "Free Shipping Text", type: "text" },
    ],
  },
  {
    id: "about",
    label: "About Page",
    fields: [
      { key: "about.title", label: "Page Title", type: "text" },
      { key: "about.content", label: "Content Paragraph 1", type: "textarea" },
      { key: "about.content2", label: "Content Paragraph 2", type: "textarea" },
      { key: "about.advantages", label: "Advantages Heading", type: "text" },
      { key: "about.adv1", label: "Advantage 1", type: "textarea" },
      { key: "about.adv2", label: "Advantage 2", type: "textarea" },
      { key: "about.adv3", label: "Advantage 3", type: "textarea" },
      { key: "about.adv4", label: "Advantage 4", type: "textarea" },
      { key: "about.adv5", label: "Advantage 5", type: "textarea" },
    ],
  },
  {
    id: "shipping",
    label: "Shipping Page",
    fields: [
      { key: "shipping.title", label: "Page Title", type: "text" },
      { key: "shipping.westMalaysia", label: "West MY Heading", type: "text" },
      { key: "shipping.westTime", label: "West MY Time", type: "text" },
      { key: "shipping.westCost", label: "West MY Cost", type: "text" },
      { key: "shipping.freeShipping", label: "Free Shipping Note", type: "text" },
      { key: "shipping.eastMalaysia", label: "East MY Heading", type: "text" },
      { key: "shipping.eastTime", label: "East MY Time", type: "text" },
      { key: "shipping.eastCost", label: "East MY Cost", type: "text" },
      { key: "shipping.customs", label: "Customs Heading", type: "text" },
      { key: "shipping.customsDesc", label: "Customs Description", type: "textarea" },
      { key: "shipping.processTitle", label: "Process Title", type: "text" },
      { key: "shipping.process1", label: "Process Step 1", type: "text" },
      { key: "shipping.process2", label: "Process Step 2", type: "text" },
      { key: "shipping.process3", label: "Process Step 3", type: "text" },
      { key: "shipping.process4", label: "Process Step 4", type: "text" },
      { key: "shipping.process5", label: "Process Step 5", type: "text" },
    ],
  },
  {
    id: "payment",
    label: "Payment Page",
    fields: [
      { key: "payment.title", label: "Page Title", type: "text" },
      { key: "payment.methods", label: "Method 1", type: "text", arrayIndex: 0 },
      { key: "payment.methods", label: "Method 2", type: "text", arrayIndex: 1 },
      { key: "payment.methods", label: "Method 3", type: "text", arrayIndex: 2 },
      { key: "payment.methods", label: "Method 4", type: "text", arrayIndex: 3 },
      { key: "payment.methods", label: "Method 5", type: "text", arrayIndex: 4 },
      { key: "payment.methods", label: "Method 6", type: "text", arrayIndex: 5 },
      { key: "payment.howItWorks", label: "How It Works Heading", type: "text" },
      { key: "payment.step1", label: "Step 1", type: "text" },
      { key: "payment.step2", label: "Step 2", type: "text" },
      { key: "payment.step3", label: "Step 3", type: "text" },
      { key: "payment.step4", label: "Step 4", type: "text" },
      { key: "payment.step5", label: "Step 5", type: "text" },
      { key: "payment.note", label: "Payment Note", type: "textarea" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { key: "footer.description", label: "Store Description", type: "textarea" },
      { key: "footer.shop", label: "Shop Heading", type: "text" },
      { key: "footer.help", label: "Help Heading", type: "text" },
      { key: "footer.contact", label: "Contact Heading", type: "text" },
      { key: "footer.address", label: "Address", type: "text" },
      { key: "footer.rights", label: "Rights Text", type: "text" },
    ],
  },
  {
    id: "common",
    label: "Common Labels",
    fields: [
      { key: "common.search", label: "Search Placeholder", type: "text" },
      { key: "common.loading", label: "Loading Text", type: "text" },
      { key: "common.error", label: "Error Text", type: "text" },
      { key: "common.back", label: "Back Text", type: "text" },
      { key: "common.currency", label: "Currency Symbol", type: "text" },
      { key: "common.buyNow", label: "Buy Now Button", type: "text" },
      { key: "common.remove", label: "Remove Button", type: "text" },
      { key: "common.somethingWrong", label: "Something Wrong", type: "text" },
      { key: "common.tryAgain", label: "Try Again", type: "text" },
    ],
  },
];
