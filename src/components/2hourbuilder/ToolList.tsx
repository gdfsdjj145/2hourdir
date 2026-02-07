import Link from 'next/link';
import { LuChevronRight, LuStar, LuSparkles } from 'react-icons/lu';
import { getToolList } from '@/models/tool';
import { getToolTagList } from '@/models/toolTag';
import ToolImage from './ToolImage';

interface ToolListProps {
  locale?: string;
}

export default async function ToolList({ locale = 'zh' }: ToolListProps) {
  // 获取工具和标签数据
  const [tools, tags] = await Promise.all([
    getToolList(),
    getToolTagList(),
  ]);

  // 创建标签 ID -> 标签信息的映射
  const tagMap = new Map(tags.map(t => [t.id, t]));

  // 分离核心工具和配套工具
  const featuredTools = tools.filter(t => t.level === 'recommend').slice(0, 6);
  const otherTools = tools.filter(t => t.level !== 'recommend' || !featuredTools.includes(t));

  return (
    <section className="py-16 pb-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <LuSparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">精选工具</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            你不需要自己选工具
          </h2>
          <p className="text-xl text-slate-300">
            我们已经帮你配好
          </p>
        </div>

        {/* Featured Tools */}
        {featuredTools.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
              <LuStar className="w-4 h-4 text-yellow-400" />
              核心工具
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredTools.map((tool) => {
                // 获取工具的标签
                const toolTags = (tool.tagIds || [])
                  .map(id => tagMap.get(id))
                  .filter(Boolean)
                  .slice(0, 2);

                return (
                  <Link
                    key={tool.id}
                    href={`/${locale}/tools/${tool.slug}`}
                    className="group p-5 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {tool.logo && (
                          <ToolImage
                            src={tool.logo}
                            alt={tool.name}
                            className="w-8 h-8 rounded-lg object-contain bg-white/10"
                          />
                        )}
                        <div>
                          <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {tool.name}
                          </h4>
                          <div className="flex gap-1 mt-1">
                            {toolTags.map((tag) => (
                              <span
                                key={tag!.id}
                                className="text-xs px-2 py-0.5 rounded"
                                style={{
                                  backgroundColor: `${tag!.color}20`,
                                  color: tag!.color || '#a78bfa',
                                }}
                              >
                                {tag!.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <LuChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {tool.levelReason || tool.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Tools */}
        {otherTools.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-4">配套工具</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {otherTools.map((tool) => {
                const toolTags = (tool.tagIds || [])
                  .map(id => tagMap.get(id))
                  .filter(Boolean)
                  .slice(0, 1);

                return (
                  <Link
                    key={tool.id}
                    href={`/${locale}/tools/${tool.slug}`}
                    className="group p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {tool.logo && (
                          <ToolImage
                            src={tool.logo}
                            alt={tool.name}
                            className="w-5 h-5 rounded object-contain bg-white/10"
                          />
                        )}
                        <h4 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                          {tool.name}
                        </h4>
                      </div>
                      <LuChevronRight className="w-3 h-3 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-2">
                      {tool.levelReason || tool.description}
                    </p>
                    <div className="flex gap-1">
                      {toolTags.map((tag) => (
                        <span
                          key={tag!.id}
                          className="text-xs"
                          style={{ color: tag!.color || '#64748b' }}
                        >
                          {tag!.name}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {tools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">暂无工具数据</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            工具只是手段，<span className="text-purple-400">2 小时后的输出</span>才是目的
          </p>
        </div>
      </div>
    </section>
  );
}
