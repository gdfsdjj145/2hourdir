---
name: crawl-tool
description: 抓取网站信息并同步到工具数据库，支持批量添加、爬取元数据、AI 生成简介
author: 2HourBuilder
---

# 工具抓取与入库指南

本技能指导 AI 如何将新的开发工具网站抓取并入库到 2 Hour Builder 平台。

---

## 快速理解

当用户说类似以下需求时，使用本技能：
- "帮我添加一个新工具"
- "抓取这个网站的信息"
- "把这个工具录入系统"
- "批量添加几个工具"
- "爬取网站 TDK"

---

## 系统架构

```
1. 配置工具 → 在 crawl-sites.ts 的 sites 数组中添加 SiteConfig
2. 运行爬取 → npx tsx scripts/crawl-sites.ts [--save] [--no-ai]
3. 数据入库 → 自动保存到 MongoDB Tool 表
4. 前端展示 → ToolList 组件自动从数据库读取展示
```

### 关键文件

| 文件 | 用途 |
|------|------|
| `scripts/crawl-sites.ts` | 爬取脚本主文件 |
| `scripts/crawl-results.json` | 上次爬取结果缓存 |
| `scripts/init-tool-tags.ts` | 标签初始化脚本 |
| `src/models/tool.ts` | Tool 数据模型层 |
| `src/models/toolTag.ts` | ToolTag 数据模型层 |
| `prisma/schema.prisma` | 数据库 Schema（Tool/ToolTag 模型） |
| `src/components/2hourbuilder/ToolList.tsx` | 前端工具列表组件 |
| `src/app/(main)/[local]/tools/[slug]/page.tsx` | 工具详情页 |

---

## 添加新工具的完整流程

### 第一步：确认工具信息

向用户确认以下必要信息：

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `url` | 是 | 工具官网 URL | `https://cursor.com/` |
| `slug` | 是 | 唯一标识符，用于 URL | `cursor` |
| `category` | 否 | 显示分类 | `代码编辑` |
| `tags` | 否 | 标签 slug 数组 | `['ai-coding', 'code-editor']` |
| `level` | 否 | 推荐等级 | `recommend` / `alternative` / `notRecommend` |
| `levelReason` | 否 | 推荐理由 | `AI 辅助编程的首选工具` |
| `learnCost` | 否 | 上手成本 1-5 | `2` |
| `failRate` | 否 | 失败概率 1-5 | `1` |
| `timeCost` | 否 | 时间消耗 1-5 | `2` |

### 第二步：检查标签是否存在

可用的标签（在 `scripts/init-tool-tags.ts` 中定义）：

| slug | 名称 | 颜色 |
|------|------|------|
| `ai-coding` | AI 编程 | #8B5CF6 |
| `ai-design` | AI 设计 | #EC4899 |
| `ai-chat` | AI 对话 | #06B6D4 |
| `code-editor` | 代码编辑器 | #10B981 |
| `frontend` | 前端框架 | #3B82F6 |
| `backend` | 后端服务 | #F59E0B |
| `database` | 数据库 | #EF4444 |
| `deploy` | 部署托管 | #14B8A6 |
| `design` | 设计工具 | #F472B6 |
| `code-hosting` | 代码托管 | #6366F1 |
| `css` | CSS 框架 | #0EA5E9 |
| `ui-generator` | UI 生成 | #A855F7 |
| `free-tier` | 免费额度 | #22C55E |
| `must-have` | 必备工具 | #EF4444 |
| `frontend-template` | 前端模板 | #0EA5E9 |
| `logo-generator` | Logo 生成 | #A855F7 |
| `qr-code-generator` | 二维码工具 | #22C55E |
| `operation-tool` | 运营工具 | #EF4444 |

如果需要新标签，先在 `scripts/init-tool-tags.ts` 的 `toolTags` 数组中添加，然后运行：

```bash
npx tsx scripts/init-tool-tags.ts
```

### 第三步：在爬取脚本中添加工具配置

编辑 `scripts/crawl-sites.ts`，在 `sites` 数组中添加新的 `SiteConfig`：

```typescript
// 在 sites 数组中添加
{
  url: 'https://example.com/',
  slug: 'example-tool',
  category: '工具分类',
  tags: ['ai-coding', 'must-have'],
  level: 'recommend',
  levelReason: '推荐理由描述',
  learnCost: 2,    // 1=极低 2=较低 3=中等 4=较高 5=极高
  failRate: 1,     // 1=极低 2=较低 3=中等 4=较高 5=极高
  timeCost: 2,     // 1=极少 2=较少 3=中等 4=较多 5=极多
},
```

### 第四步：运行爬取

```bash
# 预览模式（不保存数据库）
npx tsx scripts/crawl-sites.ts

# 预览 + 跳过 AI 简介
npx tsx scripts/crawl-sites.ts --no-ai

# 保存到数据库
npx tsx scripts/crawl-sites.ts --save

# 保存 + 跳过 AI 简介
npx tsx scripts/crawl-sites.ts --save --no-ai
```

### 第五步：验证结果

1. 查看 `scripts/crawl-results.json` 确认爬取数据正确
2. 如果使用了 `--save`，数据已入库，可通过前端页面查看

---

## SiteConfig 接口定义

```typescript
interface SiteConfig {
  url: string;            // 工具官网 URL（必填）
  slug: string;           // URL 标识符，唯一（必填）
  category?: string;      // 工具分类（显示用）
  tags?: string[];        // 标签 slug 列表
  level?: 'recommend' | 'alternative' | 'notRecommend';  // 推荐等级
  levelReason?: string;   // 推荐理由
  learnCost?: number;     // 上手成本 1-5
  failRate?: number;      // 失败概率 1-5
  timeCost?: number;      // 时间消耗 1-5
}
```

## 爬取提取的数据

脚本会自动从网站 HTML 中提取：

| 数据 | 来源 |
|------|------|
| 网站名称 | `og:site_name` > `application-name` > `<title>` 第一段 |
| 描述 | `meta[name="description"]` > `og:description` > `twitter:description` |
| 关键词 | `meta[name="keywords"]` |
| 图标 | SVG icon > 高分辨率 icon > apple-touch-icon > favicon.ico |
| OG 图片 | `meta[property="og:image"]` |
| 标题 | `<title>` 标签内容 |
| AI 简介 | 通过 OpenRouter API 根据 TDK 自动生成（可选） |

---

## 数据库 Tool 模型

```prisma
model Tool {
  id           String       @id @default(auto()) @map("_id") @db.ObjectId
  slug         String       @unique
  name         String
  description  String?
  url          String?
  logo         String?
  title        String?
  keywords     String?
  ogImage      String?
  level        String       @default("recommend")
  levelReason  String?
  learnCost    Int          @default(3)
  failRate     Int          @default(3)
  timeCost     Int          @default(3)
  tagIds       String[]
  sortOrder    Int          @default(0)
  isActive     Boolean      @default(true)
  created_time DateTime     @default(now())
  updated_time DateTime     @updatedAt
  actionTools  ActionTool[]
}
```

---

## 直接通过代码入库（不使用爬取脚本）

如果已知工具的全部信息，可以直接调用 model 层入库：

```typescript
import { createTool, updateToolBySlug } from '@/models/tool';

// 创建新工具
await createTool({
  slug: 'cursor',
  name: 'Cursor',
  description: 'AI 驱动的代码编辑器',
  url: 'https://cursor.com/',
  logo: 'https://cursor.com/favicon.ico',
  level: 'recommend',
  levelReason: 'AI 编程首选编辑器',
  learnCost: 2,
  failRate: 1,
  timeCost: 2,
  tagIds: ['tag-id-1', 'tag-id-2'],
});

// 更新已有工具
await updateToolBySlug('cursor', {
  description: '更新后的描述',
  learnCost: 3,
});
```

---

## 批量添加工具示例

当用户需要一次添加多个工具时：

1. 在 `sites` 数组中批量添加所有 SiteConfig
2. 一次性运行爬取脚本

```typescript
// 批量添加示例
const newTools: SiteConfig[] = [
  {
    url: 'https://cursor.com/',
    slug: 'cursor',
    category: '代码编辑',
    tags: ['ai-coding', 'code-editor'],
    level: 'recommend',
    levelReason: 'AI 辅助编程首选',
    learnCost: 2,
    failRate: 1,
    timeCost: 2,
  },
  {
    url: 'https://v0.dev/',
    slug: 'v0',
    category: 'UI 生成',
    tags: ['ai-design', 'ui-generator'],
    level: 'recommend',
    levelReason: '快速生成 UI 组件',
    learnCost: 1,
    failRate: 2,
    timeCost: 1,
  },
];
```

---

## 添加新标签

如果现有标签不满足需求，在 `scripts/init-tool-tags.ts` 中添加：

```typescript
// 在 toolTags 数组中添加
{ slug: 'new-tag-slug', name: '新标签名', color: '#HEX颜色' },
```

然后运行：
```bash
npx tsx scripts/init-tool-tags.ts
```

---

## 环境变量

| 变量 | 必填 | 说明 |
|------|------|------|
| `DATABASE_URL` | 是 | MongoDB 连接字符串（Prisma） |
| `OPENROUTER_API_KEY` | 否 | OpenRouter API Key，用于 AI 简介生成 |

---

## 注意事项

1. **slug 必须唯一** - 重复的 slug 会导致更新而非创建
2. **爬取间隔** - 脚本串行爬取，每个网站间隔 500ms，AI 调用间隔 1000ms
3. **失败降级** - 如果网站爬取失败，会使用 config 中的 slug 作为 name
4. **AI 简介可选** - 没有 OPENROUTER_API_KEY 时自动跳过
5. **标签 ID 映射** - 保存数据库时会自动将 tag slug 转换为 tag ID
6. **幂等操作** - 重复运行 `--save` 只会更新已有记录，不会重复创建

---

## 常见问题

### Q: 爬取结果中 icon 或 ogImage 为空怎么办？

手动在 `crawl-results.json` 中补充，或在保存数据库后通过 model 层手动更新：

```typescript
await updateToolBySlug('tool-slug', {
  logo: 'https://example.com/icon.png',
});
```

### Q: 如何只爬取新添加的工具？

目前脚本会爬取 `sites` 数组中的所有工具。如果只想处理新工具，可以临时注释掉已有的配置，爬取完再恢复。

### Q: 如何修改推荐等级的含义？

- `recommend` - 核心推荐工具，显示在首页精选区（最多 6 个）
- `alternative` - 补充工具，显示在"其他工具"区域
- `notRecommend` - 不推荐，但仍保留在数据库中

### Q: 前端如何展示这些工具？

`ToolList` 组件（`src/components/2hourbuilder/ToolList.tsx`）自动从数据库读取：
- `level=recommend` 的前 6 个显示为"核心工具"（3 列大卡片）
- 其余显示为"补充工具"（4 列小卡片）
- 工具详情页 `src/app/(main)/[local]/tools/[slug]/page.tsx` 使用 `generateStaticParams` 在构建时预渲染

---

## 相关技能

- `seo/dynamic_seo.md` - 工具详情页的动态 SEO 配置
- `database/design_data_model.md` - 数据模型设计
- `project/add-page.md` - 添加新页面
