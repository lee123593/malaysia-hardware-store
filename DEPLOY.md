# MY Hardware Pro — 马来西亚中国五金商城 部署教程

## 一、本地开发启动

```bash
# 1. 进入项目目录
cd malaysia-hardware-store

# 2. 安装依赖
npm install

# 3. 初始化数据库（SQLite自动创建）
npx prisma db push

# 4. 导入种子数据（示例产品 + 默认设置）
npm run db:seed

# 5. 启动开发服务器
npm run dev
```

打开 http://localhost:3000 查看网站。

## 二、管理后台

### 登录方式
1. 浏览器打开 http://localhost:3000/admin
2. **方式一（初始设置）**：点击 "Use admin secret key"，输入 `.env` 中的 `ADMIN_KEY`（默认: `admin-secret-key-change-me`）
3. **方式二（正式使用）**：用户名 `admin`，密码 `admin123`（种子数据创建）

### 后台功能
- **Products**：新增/编辑/删除/上下架产品、批量导入
- **Orders**：查看订单、一键修改状态（待付款→中国发货→运输中→大马签收）、导出CSV对接1688
- **Settings**：修改运费、SST税率、免运费门槛、店铺信息

### 1688一件代发对接流程
1. 客户在网站下单
2. 进入后台 Orders 页面
3. 点击 Export CSV 导出订单
4. 根据订单信息在1688下单，填写客户马来西亚地址
5. 1688发货后，在后台将订单状态改为 "Shipped from China"
6. 客户收货后改为 "Delivered"

## 三、部署到 Vercel（推荐）

### 前置条件
- GitHub / GitLab 账号
- Vercel 账号 (vercel.com)

### 步骤
```bash
# 1. 推送代码到 GitHub
git init
git add .
git commit -m "Initial: MY Hardware Pro"
git remote add origin https://github.com/YOUR_USER/malaysia-hardware-store.git
git push -u origin main

# 2. 登录 Vercel
# 访问 vercel.com → Import Project → 选择你的仓库

# 3. 配置环境变量（Vercel Settings → Environment Variables）
# DATABASE_URL: file:./dev.db（注意：Vercel部署建议用Turso/PlanetScale代替SQLite）
# ADMIN_KEY: 你的安全密钥
# JWT_SECRET: 你的JWT密钥

# 4. 部署
# Vercel自动检测Next.js，无需额外配置
```

### 生产环境数据库（推荐 Turso）
Vercel环境不支持SQLite写入。建议：
1. 注册 Turso (turso.tech) — 免费额度足够小型商城
2. 在 Vercel 环境变量中设置 `DATABASE_URL` 为 Turso 连接字符串
3. `prisma/schema.prisma` 中 `provider` 改为 `"sqlite"` 不变（Turso兼容）

## 四、部署到马来西亚VPS

```bash
# 1. SSH登录VPS
ssh user@your-malaysia-server

# 2. 安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. 克隆代码
git clone https://github.com/YOUR_USER/malaysia-hardware-store.git
cd malaysia-hardware-store

# 4. 安装并构建
npm install
npx prisma db push
npm run db:seed
npm run build

# 5. 使用PM2持久运行
npm install -g pm2
pm2 start npm --name "hardware-store" -- start
pm2 save
pm2 startup

# 6. Nginx反向代理（可选）
# 配置Nginx指向 localhost:3000，绑定域名
```

## 五、Cloudflare CDN 加速

1. 将域名DNS托管到 Cloudflare
2. 开启 Cloudflare CDN（橙色云朵）
3. 在 Cloudflare → Speed → Optimization 开启：
   - Auto Minify (JS/CSS/HTML)
   - Brotli 压缩
   - Rocket Loader
4. 马来西亚节点自动加速（Cloudflare在吉隆坡有边缘节点）

## 六、马来西亚域名适配

- 购买 .com 或 .com.my 域名
- 推荐域名注册商：Exabytes Malaysia, Shinjiru
- DNS指向Vercel（CNAME）或VPS IP

## 七、支付网关对接（马来西亚）

### Touch 'n Go eWallet / Boost
1. 注册商户账号：https://www.tngdigital.com.my/business
2. 获取API密钥
3. 设置回调URL为：`https://your-domain.com/api/payments/callback`
4. 前端预留了支付方式选择，回调接口已就绪

### Billplz（已预留）
1. 注册 https://www.billplz.com
2. 创建Collection
3. 回调URL同上

## 八、默认账户信息

| 项目 | 默认值 |
|------|--------|
| 管理员用户名 | admin |
| 管理员密码 | admin123 |
| Admin Key | admin-secret-key-change-me |
| SST税率 | 10% (0.10) |
| 西马运费 | RM 8 |
| 东马运费 | RM 18 |
| 免运费门槛 | RM 200 |

**请在首次部署后立即修改所有默认密码和密钥！**

## 九、项目结构

```
malaysia-hardware-store/
├── prisma/
│   ├── schema.prisma    # 数据库模型定义
│   └── seed.ts          # 种子数据
├── src/
│   ├── app/             # Next.js App Router 页面
│   │   ├── page.tsx     # 首页
│   │   ├── products/    # 产品列表 & 详情
│   │   ├── cart/        # 购物车
│   │   ├── checkout/    # 结算
│   │   ├── orders/      # 订单查询
│   │   ├── shipping/    # 物流说明
│   │   ├── payment/     # 支付说明
│   │   ├── about/       # 关于我们
│   │   ├── admin/       # 管理后台
│   │   └── api/         # API路由
│   ├── components/      # UI组件
│   ├── lib/             # 工具库
│   ├── i18n/            # 多语言
│   └── types/           # TypeScript类型
├── package.json
├── next.config.js
└── tailwind.config.ts
```
