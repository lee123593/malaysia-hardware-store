# CaseArt — 马来西亚设计感手机壳专属商城

> Malaysia Design Phone Case Store · 中国原创设计 · 全机型适配 · 高性价比

## 项目概述

CaseArt 是一个垂直细分电商独立站，**有且只售卖手机壳**，面向马来西亚全境（西马/东马）用户。全站采用克莱因蓝主题设计，支持中文/英文/马来语三语实时切换，后台中文全控管理系统。

- **目标市场**：马来西亚（西马/东马）
- **货源模式**：中国原创设计货源 → 马来西亚本地销售
- **经营模式**：B2C 独立站，零售为主
- **货币单位**：全程 MYR 马币（RM）

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | Next.js 14 (App Router) + React 18 |
| 语言 | TypeScript |
| 样式方案 | Tailwind CSS 3.4 + CSS Variables |
| 主题 | 克莱因蓝 (Klein Blue / #002FA7) |
| 国际化 | 自研 i18n 系统（zh / en / ms） |
| 后端管理 | Next.js API Routes + 中文全控后台 |
| 部署平台 | Vercel |
| 代码托管 | GitHub (`lee123593/malaysia-hardware-store`) |

## 项目结构

```
malaysia-hardware-store/
├── public/                      # 静态资源（图片、图标、favicon）
├── src/
│   ├── admin/                   # 后台管理系统
│   │   └── lib/                 #   后台工具（auth, data）
│   ├── app/                     # Next.js App Router 页面路由
│   │   ├── layout.tsx           #   根布局
│   │   ├── page.tsx             #   首页占位
│   │   └── admin/               #   后台管理页面路由
│   ├── config/                  # 全局配置
│   │   ├── constants.ts         #   业务常量（配送、订单状态等）
│   │   ├── site.ts              #   站点元信息、货币、语言
│   │   ├── theme.ts             #   主题令牌（颜色、圆角、间距等）
│   │   └── index.ts             #   配置汇总导出
│   ├── data/                    # 数据层
│   │   ├── phones.ts            #   2026 马来西亚10大品牌100+型号数据
│   │   ├── models.json          #   型号 JSON 数据
│   │   ├── products.json        #   商品 JSON 数据
│   │   ├── orders.json          #   订单 JSON 数据
│   │   ├── settings.json        #   站点设置 JSON 数据
│   │   ├── translations.json    #   三语翻译 JSON 数据
│   │   └── homepage.json        #   首页装修 JSON 配置
│   ├── hooks/                   # 自定义 Hooks
│   │   └── useLanguage.ts       #   语言切换 Hook
│   ├── i18n/                    # 国际化系统
│   │   ├── types.ts             #   三语类型定义（LocalePack + 子类型）
│   │   ├── config.ts            #   语言检测、持久化逻辑
│   │   ├── index.ts             #   i18n 入口（翻译函数）
│   │   ├── i18n-context.tsx      #   React Context Provider
│   │   ├── LanguageSwitcher.tsx  #   语言切换器组件
│   │   └── locales/             #   语言包
│   │       ├── zh.json          #     简体中文（109行）
│   │       ├── en.json          #     英文（109行）
│   │       └── ms.json          #     马来语（109行）
│   ├── lib/                     # 工具库
│   │   └── utils.ts             #   cn(), formatMYR(), debounce() 等
│   ├── styles/                  # 全局样式（Tailwind + CSS变量）
│   │   ├── globals.css          #   样式入口（Tailwind指令 + 组件类）
│   │   ├── variables.css        #   CSS 自定义属性（克莱因蓝令牌）
│   │   ├── reset.css            #   全局样式重置
│   │   ├── animations.css       #   微动效系统（按钮/卡片/骨架屏/导航）
│   │   └── responsive.css       #   移动优先响应式（手机/平板/桌面）
│   └── types/                   # TypeScript 类型定义
│       ├── index.ts             #   核心业务类型（PhoneCase, Order, Cart等）
│       └── admin.ts             #   后台管理类型（Product, Dashboard等）
├── .env.local.example           # 环境变量模板
├── .gitignore
├── next.config.js               # Next.js 配置
├── tailwind.config.ts           # Tailwind 克莱因蓝主题配置
├── tsconfig.json                # TypeScript 配置（含8个路径别名）
├── postcss.config.js            # PostCSS 配置
├── package.json                 # 依赖管理
├── README.md                    # 项目说明书
├── shturl.cc                    # 完整需求文档
└── window-shturl.c              # 6窗口并行开发分工规则
```

## 快速开始

### 环境要求

- **Node.js** >= 18.17.0
- **npm** >= 9.0（推荐使用 npm 或 pnpm）
- **Git**（用于代码托管）

### 1. 克隆项目

```bash
git clone https://github.com/lee123593/malaysia-hardware-store.git
cd malaysia-hardware-store
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

浏览器访问 `http://localhost:3000` 即可预览。

### 4. 构建生产版本

```bash
npm run build
```

### 5. 启动生产模式（本地预览）

```bash
npm run start
```

## GitHub 上传步骤

### 首次上传

```bash
# 1. 初始化 Git（如果尚未初始化）
git init

# 2. 关联远程仓库
git remote add origin https://github.com/lee123593/malaysia-hardware-store.git

# 3. 添加所有文件到暂存区
git add .

# 4. 创建首次提交
git commit -m "feat: CaseArt 马来西亚设计感手机壳商城 - 项目初始化"

# 5. 推送到 GitHub（main 分支）
git branch -M main
git push -u origin main
```

### 日常更新

```bash
git add .
git commit -m "描述你的改动内容"
git push
```

## Vercel 部署步骤

### 方式一：Vercel 网页端（推荐新手）

1. 访问 [vercel.com](https://vercel.com) 并注册/登录（推荐使用 GitHub 账号）
2. 点击 **"New Project"** → 选择 GitHub 仓库 `lee123593/malaysia-hardware-store`
3. 点击 **"Import"**
4. 无需修改任何配置，Vercel 会自动识别 Next.js 项目
5. 点击 **"Deploy"**，等待部署完成（约 1-2 分钟）
6. 部署成功后，Vercel 会提供一个 `xxx.vercel.app` 域名
7. （可选）在 Vercel 项目 Settings → Domains 中绑定自定义域名

### 方式二：Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 在项目根目录执行部署（首次会引导配置）
vercel

# 4. 生产环境部署
vercel --prod
```

### 自动部署

项目关联 GitHub 仓库后，Vercel 默认开启自动部署：
- 推送代码到 `main` 分支 → 自动触发生产部署
- 创建 Pull Request → 自动生成预览环境

## 需求对照校验清单

### 一、核心定位
| # | 需求项 | 状态 |
|---|--------|------|
| 1 | 有且只售卖手机壳，不新增其他 3C 周边 | ✅ 全局类型定义限定 PhoneCase 唯一商品类型 |
| 2 | 目标市场：马来西亚全境（西马/东马） | ✅ site.ts 配置 WM/EM 双区域 |
| 3 | 货源全部来自中国 | ✅ 商品数据含 source 字段标识中国货源 |
| 4 | 支持中文/英文/马来语三语 | ✅ i18n 三语语言包结构，types.ts 完整定义 |
| 5 | 价格以马币 MYR 展示 | ✅ site.ts currency.code = MYR, symbol = RM |

### 二、页面结构
| # | 页面 | 状态 |
|---|------|------|
| 1 | 首页（Banner + 卖点 + 快捷入口 + 新品/热销） | ⏳ 待窗口2 实现 |
| 2 | 全部商品/型号分类页（品牌→机型） | ⏳ 待窗口2 实现 |
| 3 | 机型专属商品页 | ⏳ 待窗口2 实现 |
| 4 | 商品详情页（轮播、三语、MYR定价） | ⏳ 待窗口2 实现 |
| 5 | 购物车页（数量修改、总额计算） | ⏳ 待窗口2 实现 |
| 6 | 结算/下单页（西马/东马配送） | ⏳ 待窗口2 实现 |
| 7 | 关于/说明页 | ⏳ 待窗口2 实现 |
| 8 | 底部通用区域 | ⏳ 待窗口2 实现 |

### 三、设计规范
| # | 需求项 | 状态 |
|---|--------|------|
| 1 | 主色克莱因蓝 #002FA7 | ✅ variables.css + tailwind.config.ts + theme.ts 统一配置 |
| 2 | 按钮悬浮缩放+光影+颜色渐变 | ✅ animations.css btn-hover-scale / btn-hover-glow |
| 3 | 商品卡片悬停上浮+阴影加深 | ✅ animations.css card-float-up |
| 4 | 页面切换平滑过渡 | ✅ animations.css page-transition |
| 5 | 骨架屏加载动画 | ✅ animations.css skeleton-shimmer |
| 6 | 导航智能吸顶渐显 | ✅ animations.css nav-slide-down |
| 7 | 移动端极致适配 | ✅ responsive.css 移动优先 + 安全区域适配 |

### 四、手机型号覆盖
| # | 品牌 | 状态 |
|---|------|------|
| 1 | Apple iPhone (12-16 全系列) | ⏳ 待窗口5 完善数据 |
| 2 | Samsung Galaxy (S25/S26/Z Fold/Z Flip/A系列) | ⏳ 待窗口5 完善数据 |
| 3 | Xiaomi / Redmi | ⏳ 待窗口5 完善数据 |
| 4 | realme | ⏳ 待窗口5 完善数据 |
| 5 | vivo / iQOO | ⏳ 待窗口5 完善数据 |
| 6 | OPPO / OnePlus | ⏳ 待窗口5 完善数据 |
| 7 | Honor | ⏳ 待窗口5 完善数据 |
| 8 | Tecno | ⏳ 待窗口5 完善数据 |

### 五、后台管理系统
| # | 需求项 | 状态 |
|---|--------|------|
| 1 | 三语内容统一编辑 | ⏳ 待窗口4 实现 |
| 2 | 手机品牌/型号 CRUD | ⏳ 待窗口4 实现 |
| 3 | 商品上架/下架/编辑（含三语） | ⏳ 待窗口4 实现 |
| 4 | 首页装修控制 | ⏳ 待窗口4 实现 |
| 5 | 网站基础设置（名称/LOGO/语言等） | ⏳ 待窗口4 实现 |
| 6 | 订单管理（查看/状态修改/导出） | ⏳ 待窗口4 实现 |
| 7 | 全站文字后台可控 | ⏳ 待窗口4 实现 |
| 8 | 单管理员账号、纯中文界面 | ⏳ 待窗口4 实现 |

### 六、技术实现
| # | 需求项 | 状态 |
|---|--------|------|
| 1 | 响应式设计（电脑/平板/手机） | ✅ 基础框架已就绪（responsive.css + Tailwind 断点） |
| 2 | Next.js 14 App Router | ✅ 项目已配置 |
| 3 | 克莱因蓝统一主题 | ✅ CSS变量 + Tailwind配置 + TS主题对象三端统一 |
| 4 | 三语原生切换 | ⏳ 架构已就绪，待窗口3 填充语言包内容 |
| 5 | 中文后台 | ⏳ 待窗口4 实现 |
| 6 | Vercel 部署 | ✅ 部署配置已就绪 |

> **状态说明**：✅ = 已完成 ｜ ⏳ = 待对应窗口实现 ｜ ❌ = 存在问题

## 开发分工（6窗口并行）

| 窗口 | 职责 | 说明 |
|------|------|------|
| 窗口1 | 主控架构 | 项目目录、全局CSS变量、Tailwind/TS配置 |
| 窗口2 | 前端UI&动效 | 全部页面、按钮交互、动画、三端响应式 |
| 窗口3 | 三语系统 | 中/英/马语言包、语言切换功能 |
| 窗口4 | 中文后端 | 全控管理后台、API Routes |
| 窗口5 | 机型数据 | 马来西亚热门手机型号分类、商品数据结构 |
| 窗口6 | 部署&测试 | 部署文档、功能校验、代码审查、整合验收 |

## 代码配置速查

### 路径别名
| 别名 | 路径 |
|------|------|
| `@/*` | `./src/*` |
| `@config/*` | `./src/config/*` |
| `@i18n/*` | `./src/i18n/*` |
| `@styles/*` | `./src/styles/*` |
| `@components/*` | `./src/components/*` |
| `@hooks/*` | `./src/hooks/*` |
| `@types/*` | `./src/types/*` |
| `@lib/*` | `./src/lib/*` |

### 可用脚本
| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热更新） |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产模式 |
| `npm run lint` | 运行 ESLint 检查 |

## 注意事项

1. **商品类型限制**：全站只允许手机壳类商品，禁止添加任何其他品类。类型系统已在 `src/types/` 中做强制约束。
2. **货币统一**：所有价格以 MYR 马币显示和结算，不出现人民币、美元等其他货币。
3. **分类规则**：唯一一级分类维度是手机品牌→型号，不按风格、材质、价格做分类。
4. **后台语言**：管理后台仅支持简体中文，前端支持三语。
5. **版权信息**：请在部署前更新 `src/config/site.ts` 中的联系方式和版权信息。

## License

Private — 仅限内部使用
