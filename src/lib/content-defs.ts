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
    label: "导航栏",
    fields: [
      { key: "nav.home", label: "首页", type: "text" },
      { key: "nav.products", label: "产品", type: "text" },
      { key: "nav.cart", label: "购物车", type: "text" },
      { key: "nav.orders", label: "订单查询", type: "text" },
      { key: "nav.about", label: "关于我们", type: "text" },
      { key: "nav.shipping", label: "物流说明", type: "text" },
      { key: "nav.payment", label: "支付说明", type: "text" },
    ],
  },
  {
    id: "header",
    label: "页头",
    fields: [
      { key: "header.storeName", label: "店铺名称", type: "text" },
    ],
  },
  {
    id: "home_hero",
    label: "首页 - 主横幅",
    fields: [
      { key: "home.hero", label: "主标题", type: "text" },
      { key: "home.heroLine2", label: "副标题", type: "text" },
      { key: "home.heroSub", label: "描述文字", type: "textarea" },
      { key: "home.shopNow", label: "立即选购按钮", type: "text" },
      { key: "home.aboutUs", label: "关于我们按钮", type: "text" },
    ],
  },
  {
    id: "home_featured",
    label: "首页 - 精选产品",
    fields: [
      { key: "home.featuredProducts", label: "区域标题", type: "text" },
      { key: "home.featuredSub", label: "区域副标题", type: "text" },
      { key: "home.viewAll", label: "查看全部链接", type: "text" },
    ],
  },
  {
    id: "home_whyus",
    label: "首页 - 为什么选择我们",
    fields: [
      { key: "home.whyUs", label: "区域标题", type: "text" },
      { key: "home.why1Title", label: "卡片1 标题", type: "text" },
      { key: "home.why1Desc", label: "卡片1 描述", type: "textarea" },
      { key: "home.why2Title", label: "卡片2 标题", type: "text" },
      { key: "home.why2Desc", label: "卡片2 描述", type: "textarea" },
      { key: "home.why3Title", label: "卡片3 标题", type: "text" },
      { key: "home.why3Desc", label: "卡片3 描述", type: "textarea" },
    ],
  },
  {
    id: "home_seo",
    label: "首页 - SEO",
    fields: [
      { key: "home.seoTagline", label: "SEO 标语", type: "text" },
      { key: "home.seoSubtagline", label: "SEO 副标语", type: "textarea" },
    ],
  },
  {
    id: "products",
    label: "产品页",
    fields: [
      { key: "products.title", label: "页面标题", type: "text" },
      { key: "products.category", label: "分类标签", type: "text" },
      { key: "products.allCategories", label: "全部分类", type: "text" },
      { key: "products.sortBy", label: "排序标签", type: "text" },
      { key: "products.priceLow", label: "价格从低到高", type: "text" },
      { key: "products.priceHigh", label: "价格从高到低", type: "text" },
      { key: "products.newest", label: "最新上架", type: "text" },
      { key: "products.addToCart", label: "加入购物车", type: "text" },
      { key: "products.outOfStock", label: "缺货", type: "text" },
      { key: "products.sku", label: "SKU 标签", type: "text" },
      { key: "products.origin", label: "产地标签", type: "text" },
      { key: "products.weight", label: "重量标签", type: "text" },
      { key: "products.noProducts", label: "未找到产品", type: "text" },
      { key: "products.sstNote", label: "SST 说明", type: "text" },
      { key: "products.relatedProducts", label: "相关产品", type: "text" },
      { key: "products.breadcrumbHome", label: "面包屑-首页", type: "text" },
      { key: "products.breadcrumbProducts", label: "面包屑-产品", type: "text" },
      { key: "products.categories", label: "螺丝与紧固件", type: "text", arrayIndex: 0 },
      { key: "products.categories", label: "手动工具", type: "text", arrayIndex: 1 },
      { key: "products.categories", label: "建筑五金", type: "text", arrayIndex: 2 },
      { key: "products.categories", label: "门窗配件", type: "text", arrayIndex: 3 },
      { key: "products.categories", label: "电动工具", type: "text", arrayIndex: 4 },
      { key: "products.categories", label: "配件与耗材", type: "text", arrayIndex: 5 },
    ],
  },
  {
    id: "cart",
    label: "购物车页",
    fields: [
      { key: "cart.title", label: "页面标题", type: "text" },
      { key: "cart.empty", label: "空购物车提示", type: "text" },
      { key: "cart.continueShopping", label: "继续购物", type: "text" },
      { key: "cart.subtotal", label: "小计标签", type: "text" },
      { key: "cart.shipping", label: "运费标签", type: "text" },
      { key: "cart.tax", label: "税费标签", type: "text" },
      { key: "cart.total", label: "总计标签", type: "text" },
      { key: "cart.checkout", label: "结算按钮", type: "text" },
      { key: "cart.quantity", label: "数量标签", type: "text" },
      { key: "cart.remove", label: "移除按钮", type: "text" },
      { key: "cart.freeShippingNote", label: "包邮说明", type: "text" },
      { key: "cart.calculatedAtCheckout", label: "结算时计算", type: "text" },
      { key: "cart.addedToCart", label: "已加入购物车提示", type: "text" },
    ],
  },
  {
    id: "checkout",
    label: "结算页",
    fields: [
      { key: "checkout.title", label: "页面标题", type: "text" },
      { key: "checkout.customerInfo", label: "客户信息标题", type: "text" },
      { key: "checkout.name", label: "姓名字段", type: "text" },
      { key: "checkout.email", label: "邮箱字段", type: "text" },
      { key: "checkout.phone", label: "电话字段", type: "text" },
      { key: "checkout.address", label: "地址字段", type: "text" },
      { key: "checkout.city", label: "城市字段", type: "text" },
      { key: "checkout.state", label: "州属字段", type: "text" },
      { key: "checkout.postcode", label: "邮编字段", type: "text" },
      { key: "checkout.paymentMethod", label: "支付方式标题", type: "text" },
      { key: "checkout.orderSummary", label: "订单摘要标题", type: "text" },
      { key: "checkout.placeOrder", label: "确认下单按钮", type: "text" },
      { key: "checkout.required", label: "必填标识", type: "text" },
      { key: "checkout.selectState", label: "选择州属", type: "text" },
      { key: "checkout.autoCalculated", label: "自动计算", type: "text" },
      { key: "checkout.processing", label: "处理中文字", type: "text" },
      { key: "checkout.fillRequired", label: "请填写必填字段", type: "text" },
      { key: "checkout.networkError", label: "网络错误", type: "text" },
      { key: "checkout.cartEmpty", label: "购物车为空", type: "text" },
      { key: "checkout.continueShopping", label: "继续购物", type: "text" },
      { key: "checkout.paymentGatewayNote", label: "支付网关说明", type: "textarea" },
      { key: "checkout.regionEast", label: "东马标签", type: "text" },
      { key: "checkout.regionWest", label: "西马标签", type: "text" },
      { key: "checkout.paymentMethods", label: "Touch 'n Go", type: "text", arrayIndex: 0 },
      { key: "checkout.paymentMethods", label: "Boost", type: "text", arrayIndex: 1 },
      { key: "checkout.paymentMethods", label: "信用卡/借记卡", type: "text", arrayIndex: 2 },
      { key: "checkout.paymentMethods", label: "银行转账", type: "text", arrayIndex: 3 },
    ],
  },
  {
    id: "order",
    label: "订单页",
    fields: [
      { key: "order.title", label: "页面标题", type: "text" },
      { key: "order.lookup", label: "查询标题", type: "text" },
      { key: "order.orderNo", label: "订单号标签", type: "text" },
      { key: "order.search", label: "查询按钮", type: "text" },
      { key: "order.status", label: "状态标签", type: "text" },
      { key: "order.details", label: "详情标题", type: "text" },
      { key: "order.items", label: "商品标题", type: "text" },
      { key: "order.shippingAddress", label: "收货地址", type: "text" },
      { key: "order.paymentInfo", label: "支付信息", type: "text" },
      { key: "order.notFound", label: "未找到订单", type: "text" },
      { key: "order.subtotal", label: "小计标签", type: "text" },
      { key: "order.shipping", label: "运费标签", type: "text" },
      { key: "order.tax", label: "税费标签", type: "text" },
      { key: "order.total", label: "总计标签", type: "text" },
      { key: "order.free", label: "包邮文字", type: "text" },
    ],
  },
  {
    id: "about",
    label: "关于我们页",
    fields: [
      { key: "about.title", label: "页面标题", type: "text" },
      { key: "about.content", label: "正文段落1", type: "textarea" },
      { key: "about.content2", label: "正文段落2", type: "textarea" },
      { key: "about.advantages", label: "优势标题", type: "text" },
      { key: "about.adv1", label: "优势1", type: "textarea" },
      { key: "about.adv2", label: "优势2", type: "textarea" },
      { key: "about.adv3", label: "优势3", type: "textarea" },
      { key: "about.adv4", label: "优势4", type: "textarea" },
      { key: "about.adv5", label: "优势5", type: "textarea" },
    ],
  },
  {
    id: "shipping",
    label: "物流说明页",
    fields: [
      { key: "shipping.title", label: "页面标题", type: "text" },
      { key: "shipping.westMalaysia", label: "西马标题", type: "text" },
      { key: "shipping.westTime", label: "西马时效", type: "text" },
      { key: "shipping.westCost", label: "西马费用", type: "text" },
      { key: "shipping.freeShipping", label: "包邮说明", type: "text" },
      { key: "shipping.eastMalaysia", label: "东马标题", type: "text" },
      { key: "shipping.eastTime", label: "东马时效", type: "text" },
      { key: "shipping.eastCost", label: "东马费用", type: "text" },
      { key: "shipping.customs", label: "海关标题", type: "text" },
      { key: "shipping.customsDesc", label: "海关描述", type: "textarea" },
      { key: "shipping.processTitle", label: "流程标题", type: "text" },
      { key: "shipping.process1", label: "流程步骤1", type: "text" },
      { key: "shipping.process2", label: "流程步骤2", type: "text" },
      { key: "shipping.process3", label: "流程步骤3", type: "text" },
      { key: "shipping.process4", label: "流程步骤4", type: "text" },
      { key: "shipping.process5", label: "流程步骤5", type: "text" },
    ],
  },
  {
    id: "payment",
    label: "支付说明页",
    fields: [
      { key: "payment.title", label: "页面标题", type: "text" },
      { key: "payment.methods", label: "支付方式1", type: "text", arrayIndex: 0 },
      { key: "payment.methods", label: "支付方式2", type: "text", arrayIndex: 1 },
      { key: "payment.methods", label: "支付方式3", type: "text", arrayIndex: 2 },
      { key: "payment.methods", label: "支付方式4", type: "text", arrayIndex: 3 },
      { key: "payment.methods", label: "支付方式5", type: "text", arrayIndex: 4 },
      { key: "payment.methods", label: "支付方式6", type: "text", arrayIndex: 5 },
      { key: "payment.howItWorks", label: "支付流程标题", type: "text" },
      { key: "payment.step1", label: "步骤1", type: "text" },
      { key: "payment.step2", label: "步骤2", type: "text" },
      { key: "payment.step3", label: "步骤3", type: "text" },
      { key: "payment.step4", label: "步骤4", type: "text" },
      { key: "payment.step5", label: "步骤5", type: "text" },
      { key: "payment.note", label: "支付说明", type: "textarea" },
    ],
  },
  {
    id: "footer",
    label: "页脚",
    fields: [
      { key: "footer.description", label: "店铺描述", type: "textarea" },
      { key: "footer.shop", label: "购物标题", type: "text" },
      { key: "footer.help", label: "帮助标题", type: "text" },
      { key: "footer.contact", label: "联系我们标题", type: "text" },
      { key: "footer.address", label: "地址", type: "text" },
      { key: "footer.rights", label: "版权文字", type: "text" },
    ],
  },
  {
    id: "common",
    label: "通用标签",
    fields: [
      { key: "common.search", label: "搜索占位符", type: "text" },
      { key: "common.loading", label: "加载中文字", type: "text" },
      { key: "common.error", label: "错误文字", type: "text" },
      { key: "common.back", label: "返回文字", type: "text" },
      { key: "common.currency", label: "货币符号", type: "text" },
      { key: "common.buyNow", label: "立即购买按钮", type: "text" },
      { key: "common.remove", label: "移除按钮", type: "text" },
      { key: "common.somethingWrong", label: "出错提示", type: "text" },
      { key: "common.tryAgain", label: "请重试", type: "text" },
    ],
  },
];
