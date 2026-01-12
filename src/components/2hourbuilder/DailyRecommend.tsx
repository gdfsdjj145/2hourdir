'use client';
import React from 'react';
import Link from 'next/link';
import { LuStar, LuClock, LuArrowRight, LuSparkles, LuExternalLink } from 'react-icons/lu';

// 今日推荐的 Action
const todayAction = {
  id: 'landing-page-1',
  title: '用 Cursor + v0 做一个产品落地页',
  description: '从 0 到 1 完成一个可上线的产品介绍页面，包含 Hero、功能展示、定价和 CTA。',
  difficulty: 2,
  duration: '2 小时',
  output: '一个可部署的 Landing Page',
};

// 推荐工具
const recommendedTools = [
  {
    name: 'Cursor',
    description: 'AI 代码编辑器，写代码的最佳搭档',
    url: 'https://cursor.sh',
    tag: '首选',
  },
  {
    name: 'v0.dev',
    description: 'AI 生成 UI 组件，快速出设计稿',
    url: 'https://v0.dev',
    tag: '配合',
  },
  {
    name: 'Vercel',
    description: '一键部署，让作品上线',
    url: 'https://vercel.com',
    tag: '部署',
  },
];

export default function DailyRecommend() {
  return (
    <section className="py-12 pb-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <LuSparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl md:text-2xl font-bold text-white">
              今日推荐：一条 2 Hour Action
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            人在犹豫时，需要被"指路"。今天就做这个。
          </p>
        </div>

        {/* Today's Action Card */}
        <Link
          href={`/output/${todayAction.id}`}
          className="block group mb-8"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-slate-800/50 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {todayAction.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  {todayAction.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Difficulty */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">难度:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <LuStar
                          key={i}
                          className={`w-3 h-3 ${
                            i < todayAction.difficulty
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1 text-slate-500">
                    <LuClock className="w-4 h-4" />
                    <span className="text-sm">{todayAction.duration}</span>
                  </div>

                  {/* Output */}
                  <div className="text-sm text-purple-300">
                    输出: {todayAction.output}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <LuArrowRight className="text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Tool Recommendations */}
        <div>
          <h3 className="text-sm font-medium text-slate-400 mb-4">推荐工具组合</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-white font-medium group-hover:text-purple-300 transition-colors">
                    {tool.name}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    tool.tag === '首选'
                      ? 'bg-green-500/20 text-green-400'
                      : tool.tag === '配合'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {tool.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{tool.description}</p>
                <div className="flex items-center gap-1 text-xs text-slate-600 group-hover:text-slate-400 transition-colors">
                  <span>访问</span>
                  <LuExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
