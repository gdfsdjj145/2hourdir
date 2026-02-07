/**
 * 网站信息爬取脚本
 * 用于获取网站的 icon 和简介，并保存到数据库
 * 支持使用 OpenRouter AI 根据 TDK 自动生成网站简介
 *
 * 使用方法:
 * npx tsx scripts/crawl-sites.ts
 *
 * 参数:
 * --save    保存到数据库
 * --dry-run 仅显示结果，不保存（默认）
 * --no-ai   跳过 AI 简介生成
 *
 * 环境变量:
 * OPENROUTER_API_KEY - OpenRouter API 密钥（可选，用于 AI 简介生成）
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

// 手动加载 .env 文件
function loadEnv() {
  const envPath = path.join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
}
loadEnv();

import prisma from '../src/lib/prisma';

interface SiteInfo {
  url: string;
  name: string;
  description: string;
  icon: string;
  ogImage?: string;
  error?: string;
  // TDK
  title: string;           // 页面标题
  keywords: string;        // 页面关键词
  // 额外 meta 信息
  ogTitle?: string;        // OG 标题
  ogSiteName?: string;     // OG 站点名称
  twitterTitle?: string;   // Twitter 标题
  // AI 生成的简介
  aiDescription?: string;  // AI 根据 TDK 生成的网站简介
}

// OpenRouter API 响应类型
interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface SiteConfig {
  url: string;
  slug: string;           // URL 标识符
  category?: string;      // 工具分类（显示用）
  tags?: string[];        // 标签 slug 列表
  level?: 'recommend' | 'alternative' | 'notRecommend';
  levelReason?: string;
  learnCost?: number;     // 上手成本 1-5
  failRate?: number;      // 失败概率 1-5
  timeCost?: number;      // 时间消耗 1-5
}

// OpenRouter API 配置
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const AI_MODEL = 'allenai/molmo-2-8b:free'; // 免费模型

// 调试：检查 API Key 是否加载
if (OPENROUTER_API_KEY) {
  console.log(`[DEBUG] OPENROUTER_API_KEY loaded: ${OPENROUTER_API_KEY.slice(0, 15)}...`);
} 

/**
 * 使用 AI 根据 TDK 生成网站简介
 */
async function generateAIDescription(siteInfo: SiteInfo): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    console.log('  ⚠️ 未配置 OPENROUTER_API_KEY，跳过 AI 生成');
    return '';
  }

  // 如果没有足够的信息，跳过 AI 生成
  if (!siteInfo.title && !siteInfo.description && !siteInfo.keywords) {
    return '';
  }

  const prompt = `你是一个专业的产品文案撰写人。请根据以下网站的 TDK（标题、描述、关键词）信息，生成一段简洁的网站介绍。

网站信息：
- 标题 (Title): ${siteInfo.title || '未提供'}
- 描述 (Description): ${siteInfo.description || '未提供'}
- 关键词 (Keywords): ${siteInfo.keywords || '未提供'}
- 网站名称: ${siteInfo.name || '未提供'}
- URL: ${siteInfo.url}

要求：
1. 用中文撰写
2. 简洁明了，控制在 50-100 字以内
3. 突出网站的核心功能和价值
4. 不要使用营销性过强的词汇
5. 只输出简介内容，不要有其他说明文字`;

  try {
    const response = await axios.post<OpenRouterResponse>(
      OPENROUTER_API_URL,
      {
        model: AI_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://2hourbuilder.com',
          'X-Title': '2Hour Builder Crawler',
        },
        timeout: 30000,
      }
    );

    const content = response.data.choices?.[0]?.message?.content?.trim() || '';
    if (content) {
      console.log(`  🤖 AI 简介: ${content.slice(0, 50)}...`);
    }
    return content;
  } catch (error: any) {
    const errorDetail = error.response?.data ? JSON.stringify(error.response.data) : error.message;
    console.log(`  ⚠️ AI 生成失败: ${errorDetail}`);
    return '';
  }
}

// 要爬取的网站列表（可配置更多信息）
const sites: SiteConfig[] = [
  {
    url: 'https://docs.codecli.shop/',
    slug: 'codecli',
    category: '代码编辑',
    tags: ['ai-coding', 'code-editor', 'must-have'],
    level: 'recommend',
    levelReason: '',
    learnCost: 2,
    failRate: 1,
    timeCost: 1,
  },
  {
    url: 'https://www.mvpfast.top/',
    slug: 'mvpfast',
    category: '开发模板',
    tags: ['ai-coding', 'frontend-template', 'must-have'],
    level: 'recommend',
    levelReason: '快速创建个人应用，最短时间上线',
    learnCost: 1,
    failRate: 2,
    timeCost: 1,
  },
  {
    url: 'https://www.logocook.shop/',
    slug: 'logocook',
    category: 'Logo 生成',
    tags: ['ai-design', 'logo-generator', 'must-have'],
    level: 'recommend',
    levelReason: '快速生成个性化的Logo',
    learnCost: 1,
    failRate: 1,
    timeCost: 2,
  },
  {
    url: 'https://www.codebox.club/',
    slug: 'codebox',
    category: '二维码工具',
    tags: ['qr-code-generator', 'must-have'],
    level: 'recommend',
    levelReason: '快速生成二维码，方便分享',
    learnCost: 2,
    failRate: 1,
    timeCost: 1,
  },
  // ========== AI 模型 ==========
  {
    url: 'https://chatgpt.com/',
    slug: 'chatgpt',
    category: 'AI 对话',
    tags: ['ai-chat', 'must-have'],
    level: 'recommend',
    levelReason: '全球最流行的 AI 对话助手，支持多模态',
    learnCost: 1,
    failRate: 2,
    timeCost: 1,
  },
  {
    url: 'https://claude.ai/',
    slug: 'claude',
    category: 'AI 对话',
    tags: ['ai-chat', 'ai-coding', 'must-have'],
    level: 'recommend',
    levelReason: '编程能力强，长文本理解出色',
    learnCost: 1,
    failRate: 2,
    timeCost: 1,
  },
  {
    url: 'https://gemini.google.com/',
    slug: 'gemini',
    category: 'AI 对话',
    tags: ['ai-chat'],
    level: 'alternative',
    levelReason: 'Google 出品，与 Google 生态深度集成',
    learnCost: 1,
    failRate: 2,
    timeCost: 1,
  },
  {
    url: 'https://www.deepseek.com/',
    slug: 'deepseek',
    category: 'AI 对话',
    tags: ['ai-chat', 'ai-coding'],
    level: 'recommend',
    levelReason: '国产开源大模型，编程和推理能力强',
    learnCost: 1,
    failRate: 2,
    timeCost: 1,
  },
  {
    url: 'https://kimi.moonshot.cn/',
    slug: 'kimi',
    category: 'AI 对话',
    tags: ['ai-chat'],
    level: 'alternative',
    levelReason: '超长上下文支持，适合长文档处理',
    learnCost: 1,
    failRate: 1,
    timeCost: 1,
  },
  {
    url: 'https://tongyi.aliyun.com/',
    slug: 'tongyi',
    category: 'AI 对话',
    tags: ['ai-chat'],
    level: 'alternative',
    levelReason: '阿里出品，中文理解能力好，生态丰富',
    learnCost: 1,
    failRate: 1,
    timeCost: 1,
  },
];

async function fetchSiteInfo(config: SiteConfig): Promise<SiteInfo & { config: SiteConfig }> {
  const result: SiteInfo & { config: SiteConfig } = {
    url: config.url,
    name: '',
    description: '',
    icon: '',
    title: '',
    keywords: '',
    config,
  };

  try {
    const response = await axios.get(config.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
      timeout: 10000,
      maxRedirects: 5,
    });

    const $ = cheerio.load(response.data);
    const baseUrl = new URL(config.url);

    // ========== TDK 提取 ==========
    // T - Title
    result.title = $('title').text().trim() || '';
    result.ogTitle = $('meta[property="og:title"]').attr('content') || '';
    result.ogSiteName = $('meta[property="og:site_name"]').attr('content') || '';
    result.twitterTitle = $('meta[name="twitter:title"]').attr('content') || '';

    // D - Description
    result.description = $('meta[name="description"]').attr('content')
      || $('meta[property="og:description"]').attr('content')
      || $('meta[name="twitter:description"]').attr('content')
      || '';

    // K - Keywords
    result.keywords = $('meta[name="keywords"]').attr('content') || '';

    // ========== 网站名称 ==========
    result.name = result.ogSiteName
      || $('meta[name="application-name"]').attr('content')
      || result.title.split(/[-|–—]/)[0].trim()
      || baseUrl.hostname;

    // 获取 icon
    const iconSelectors = [
      'link[rel="icon"][type="image/svg+xml"]',
      'link[rel="icon"][sizes="192x192"]',
      'link[rel="icon"][sizes="180x180"]',
      'link[rel="icon"][sizes="128x128"]',
      'link[rel="icon"][sizes="96x96"]',
      'link[rel="icon"][sizes="32x32"]',
      'link[rel="apple-touch-icon"]',
      'link[rel="apple-touch-icon-precomposed"]',
      'link[rel="shortcut icon"]',
      'link[rel="icon"]',
    ];

    let iconHref = '';
    for (const selector of iconSelectors) {
      const href = $(selector).attr('href');
      if (href) {
        iconHref = href;
        break;
      }
    }

    if (iconHref) {
      if (iconHref.startsWith('//')) {
        result.icon = `https:${iconHref}`;
      } else if (iconHref.startsWith('/')) {
        result.icon = `${baseUrl.origin}${iconHref}`;
      } else if (!iconHref.startsWith('http')) {
        result.icon = `${baseUrl.origin}/${iconHref}`;
      } else {
        result.icon = iconHref;
      }
    } else {
      result.icon = `${baseUrl.origin}/favicon.ico`;
    }

    // 获取 OG Image
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage) {
      if (ogImage.startsWith('/')) {
        result.ogImage = `${baseUrl.origin}${ogImage}`;
      } else {
        result.ogImage = ogImage;
      }
    }

    console.log(`✓ ${result.name} - ${config.url}`);
  } catch (error: any) {
    result.error = error.message;
    // 爬取失败时使用配置中的信息
    result.name = config.slug;
    console.log(`✗ ${config.url} - ${error.message} (将使用默认信息)`);
  }

  return result;
}

async function saveToDatabase(results: (SiteInfo & { config: SiteConfig })[]) {
  console.log('\n正在保存到数据库...\n');

  // 先获取所有 tag，建立 slug -> id 映射
  const allTags = await prisma.toolTag.findMany();
  const tagMap = new Map(allTags.map(t => [t.slug, t.id]));

  let saved = 0;
  let updated = 0;

  for (const site of results) {
    try {
      const existing = await prisma.tool.findUnique({
        where: { slug: site.config.slug },
      });

      // 根据 tag slugs 获取 tag IDs
      const tagIds = (site.config.tags || [])
        .map(slug => tagMap.get(slug))
        .filter((id): id is string => !!id);

      const data = {
        slug: site.config.slug,
        name: site.name || site.config.slug,
        // 优先使用 AI 简介，其次是原始 description，最后是 levelReason
        description: site.aiDescription || site.description || site.config.levelReason || '',
        url: site.url,
        logo: site.icon || null,
        // TDK
        title: site.title || null,
        keywords: site.keywords || null,
        ogImage: site.ogImage || null,
        // 推荐信息
        level: site.config.level || 'recommend',
        levelReason: site.config.levelReason || null,
        learnCost: site.config.learnCost || 3,
        failRate: site.config.failRate || 3,
        timeCost: site.config.timeCost || 3,
        // 标签
        tagIds: tagIds,
      };

      if (existing) {
        await prisma.tool.update({
          where: { slug: site.config.slug },
          data,
        });
        console.log(`  ↻ 更新: ${site.config.slug}`);
        updated++;
      } else {
        await prisma.tool.create({ data });
        console.log(`  + 创建: ${site.config.slug}`);
        saved++;
      }
    } catch (error: any) {
      console.log(`  ✗ 失败: ${site.config.slug} - ${error.message}`);
    }
  }

  console.log(`\n数据库操作完成: 新增 ${saved} 条, 更新 ${updated} 条`);
}

async function main() {
  const args = process.argv.slice(2);
  const shouldSave = args.includes('--save');
  const isDryRun = !shouldSave;

  console.log('开始爬取网站信息...\n');
  console.log(`共 ${sites.length} 个网站`);
  console.log(`模式: ${isDryRun ? '仅预览 (添加 --save 参数保存到数据库)' : '保存到数据库'}\n`);

  const results: (SiteInfo & { config: SiteConfig })[] = [];

  // 串行爬取
  for (const site of sites) {
    const info = await fetchSiteInfo(site);
    results.push(info);
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n爬取完成!\n');

  // 使用 AI 生成简介
  const skipAI = args.includes('--no-ai');
  if (!skipAI && OPENROUTER_API_KEY) {
    console.log('========== AI 生成简介 ==========\n');
    for (const site of results) {
      if (!site.error) {
        console.log(`处理: ${site.name || site.config.slug}`);
        site.aiDescription = await generateAIDescription(site);
        await new Promise(resolve => setTimeout(resolve, 1000)); // AI 调用间隔
      }
    }
    console.log('\nAI 简介生成完成!\n');
  } else if (!OPENROUTER_API_KEY) {
    console.log('提示: 设置 OPENROUTER_API_KEY 环境变量可启用 AI 简介生成\n');
  }

  // 输出结果
  console.log('========== 爬取结果 ==========\n');

  for (const site of results) {
    console.log(`【${site.name || site.config.slug}】`);
    console.log(`  Slug: ${site.config.slug}`);
    console.log(`  URL: ${site.url}`);
    console.log(`  -------- TDK --------`);
    console.log(`  T (Title): ${site.title.slice(0, 60)}${site.title.length > 60 ? '...' : ''}`);
    console.log(`  D (Description): ${site.description.slice(0, 80)}${site.description.length > 80 ? '...' : ''}`);
    console.log(`  K (Keywords): ${site.keywords.slice(0, 60)}${site.keywords.length > 60 ? '...' : '' || '(无)'}`);
    console.log(`  -------- Meta --------`);
    console.log(`  Icon: ${site.icon}`);
    if (site.ogImage) {
      console.log(`  OG Image: ${site.ogImage}`);
    }
    console.log(`  分类: ${site.config.category || '-'}`);
    console.log(`  标签: ${(site.config.tags || []).join(', ') || '(无)'}`);
    console.log(`  推荐等级: ${site.config.level || 'recommend'}`);
    if (site.aiDescription) {
      console.log(`  -------- AI 简介 --------`);
      console.log(`  ${site.aiDescription}`);
    }
    if (site.error) {
      console.log(`  ⚠️ 爬取错误: ${site.error}`);
    }
    console.log('');
  }

  // 保存到文件
  const outputPath = path.join(__dirname, 'crawl-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`结果已保存到: ${outputPath}`);

  // 保存到数据库
  if (shouldSave) {
    await saveToDatabase(results);
  } else {
    console.log('\n提示: 添加 --save 参数将数据保存到数据库');
    console.log('示例: npx tsx scripts/crawl-sites.ts --save');
  }

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
