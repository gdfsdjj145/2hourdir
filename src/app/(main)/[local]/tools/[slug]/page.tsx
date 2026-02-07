import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getToolBySlug, getToolList } from '@/models/tool';
import { getToolTagsByIds } from '@/models/toolTag';
import {
  LuChevronRight,
  LuHeart,
  LuShare2,
  LuCode,
  LuExternalLink,
  LuSparkles,
  LuLayoutTemplate,
  LuMousePointer,
  LuRocket,
  LuGlobe,
  LuFileText,
  LuInfo,
  LuStar,
} from 'react-icons/lu';
import ToolImage from '@/components/2hourbuilder/ToolImage';

interface ToolDetailPageProps {
  params: Promise<{ slug: string; local: string }>;
}

// 生成静态参数
export async function generateStaticParams() {
  const tools = await getToolList({ limit: 100 });
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: ToolDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: '工具未找到',
    };
  }

  return {
    title: tool.title || tool.name,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: tool.title || tool.name,
      description: tool.description || '',
      images: tool.ogImage ? [tool.ogImage] : [],
    },
  };
}

// 核心特性数据（可以根据工具类型动态生成或存储在数据库中）
const defaultFeatures = [
  {
    icon: LuSparkles,
    title: '智能生成',
    description: '基于 AI 的智能内容生成',
    color: 'purple',
  },
  {
    icon: LuLayoutTemplate,
    title: '模板库',
    description: '丰富的专业模板可供选择',
    color: 'blue',
  },
  {
    icon: LuMousePointer,
    title: '简单易用',
    description: '可视化操作，无需编程',
    color: 'green',
  },
  {
    icon: LuRocket,
    title: '快速部署',
    description: '一键生成，即时可用',
    color: 'orange',
  },
];

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug, local } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // 获取工具标签
  const tags = tool.tagIds?.length ? await getToolTagsByIds(tool.tagIds) : [];

  // 获取相关工具（同标签或同类型）
  const allTools = await getToolList({ limit: 20 });
  const relatedTools = allTools
    .filter((t) => t.id !== tool.id && t.level === 'recommend')
    .slice(0, 3);

  // 评分颜色映射
  const getScoreColor = (score: number) => {
    if (score <= 2) return 'text-green-400';
    if (score <= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number, type: 'cost' | 'rate' | 'time') => {
    const labels = {
      cost: ['极低', '较低', '中等', '较高', '极高'],
      rate: ['极低', '较低', '中等', '较高', '极高'],
      time: ['极快', '较快', '中等', '较慢', '极慢'],
    };
    return labels[type][score - 1] || '中等';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="relative z-50 py-6 border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${local}`} className="flex items-center gap-3">
              <Image
                src="/brand/logo.png"
                alt="2 Hour Builder"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-white font-bold text-lg hidden sm:block">2 Hour Builder</span>
            </Link>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
              <Link href={`/${local}`} className="text-slate-400 hover:text-white transition-colors">
                首页
              </Link>
              <LuChevronRight className="w-4 h-4 text-slate-600" />
              <Link href={`/${local}`} className="text-slate-400 hover:text-white transition-colors">
                工具导航
              </Link>
              <LuChevronRight className="w-4 h-4 text-slate-600" />
              <span className="text-purple-400">{tool.name}</span>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Tool Header Section */}
        <section className="mb-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Tool Icon & Info */}
            <div className="flex-1">
              <div className="flex items-start gap-6">
                {/* Tool Logo */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {tool.logo ? (
                    <ToolImage
                      src={tool.logo}
                      alt={tool.name}
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <LuSparkles className="w-10 h-10 text-purple-400" />
                  )}
                </div>

                {/* Tool Info */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {tool.name}
                  </h1>
                  <p className="text-lg text-slate-300 mb-2">
                    {tool.levelReason || tool.description}
                  </p>
                  <p className="text-slate-500">
                    {tool.description}
                  </p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-sm px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${tag.color}20`,
                            color: tag.color || '#a78bfa',
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full lg:w-auto">
              <a
                href={tool.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-xl transition-all duration-300 text-center"
              >
                免费试用
              </a>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700/50 transition-all">
                  <LuHeart className="w-4 h-4" />
                  <span>收藏</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700/50 transition-all">
                  <LuShare2 className="w-4 h-4" />
                  <span>分享</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700/50 transition-all">
                  <LuCode className="w-4 h-4" />
                  <span>代码</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Preview Image */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
              <div className="aspect-[4/3] relative bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                {tool.ogImage ? (
                  <Image
                    src={tool.ogImage}
                    alt={`${tool.name} 预览`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      {tool.logo ? (
                        <ToolImage
                          src={tool.logo}
                          alt={tool.name}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <LuSparkles className="w-8 h-8 text-purple-400" />
                      )}
                    </div>
                    <p className="text-slate-500 text-sm">工具预览图</p>
                  </div>
                )}
              </div>
              {/* Demo Button */}
              <a
                href={tool.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-gradient-to-r from-purple-600/80 to-purple-500/80 hover:from-purple-600 hover:to-purple-500 text-white font-medium text-center transition-all"
              >
                查看演示
              </a>
            </div>
          </div>

          {/* Middle: Core Features */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                <LuStar className="w-5 h-5 text-yellow-400" />
                核心特性
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {defaultFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  const colorClasses: Record<string, string> = {
                    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
                    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
                    green: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
                    orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400',
                  };
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl bg-gradient-to-br ${colorClasses[feature.color]} border transition-all hover:scale-[1.02]`}
                    >
                      <Icon className="w-6 h-6 mb-2" />
                      <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Related Tools */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 p-6">
              <h2 className="text-lg font-bold text-white mb-4">相关工具推荐</h2>
              <div className="space-y-3">
                {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool.id}
                    href={`/${local}/tools/${relatedTool.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {relatedTool.logo ? (
                        <ToolImage
                          src={relatedTool.logo}
                          alt={relatedTool.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <LuSparkles className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm group-hover:text-purple-300 transition-colors truncate">
                        {relatedTool.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {relatedTool.levelReason || relatedTool.description}
                      </p>
                    </div>
                  </Link>
                ))}
                {relatedTools.length === 0 && (
                  <p className="text-slate-500 text-sm text-center py-4">暂无相关工具</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Info Section */}
        <section className="mt-8">
          <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <LuInfo className="w-5 h-5 text-blue-400" />
              详细信息
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Languages */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <LuGlobe className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-1">支持语言</h3>
                  <p className="text-white">中文、英文</p>
                </div>
              </div>

              {/* Output Format */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <LuFileText className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-1">输出格式</h3>
                  <p className="text-white">HTML、可访问 URL</p>
                </div>
              </div>

              {/* Learning Cost */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <LuSparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-1">上手成本</h3>
                  <p className={getScoreColor(tool.learnCost)}>
                    {getScoreLabel(tool.learnCost, 'cost')} ({tool.learnCost}/5)
                  </p>
                </div>
              </div>

              {/* Time Cost */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <LuRocket className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-1">完成速度</h3>
                  <p className={getScoreColor(tool.timeCost)}>
                    {getScoreLabel(tool.timeCost, 'time')} ({tool.timeCost}/5)
                  </p>
                </div>
              </div>
            </div>

            {/* Official Link */}
            {tool.url && (
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <LuExternalLink className="w-4 h-4" />
                  <span>访问官方网站</span>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Related Actions Section */}
        {tool.actionTools && tool.actionTools.length > 0 && (
          <section className="mt-8">
            <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">相关输出场景</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tool.actionTools.map((actionTool) => (
                  <Link
                    key={actionTool.id}
                    href={`/${local}/output/${actionTool.action.slug}`}
                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                        {actionTool.role}
                      </span>
                      {actionTool.action.category && (
                        <span className="text-xs text-slate-500">
                          {actionTool.action.category.title}
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                      {actionTool.action.title}
                    </h3>
                    {actionTool.description && (
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                        {actionTool.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            href={`/${local}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <LuChevronRight className="w-4 h-4 rotate-180" />
            <span>返回首页</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
