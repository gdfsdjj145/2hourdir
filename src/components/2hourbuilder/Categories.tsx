'use client';
import React from 'react';
import Link from 'next/link';
import { LuLayout, LuCode2, LuSettings, LuFileText, LuBox } from 'react-icons/lu';

const categories = [
  {
    id: 'page',
    title: '写一个页面',
    subtitle: 'Landing page icon',
    icon: LuLayout,
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'feature',
    title: '写一个功能',
    subtitle: 'Code icon',
    icon: LuCode2,
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    id: 'script',
    title: '写一个脚本',
    subtitle: 'Automation project',
    icon: LuSettings,
    iconBg: 'bg-slate-500/20',
    iconColor: 'text-slate-400',
  },
  {
    id: 'content',
    title: '写一篇内容',
    subtitle: 'Blog icon',
    icon: LuFileText,
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'product',
    title: '做一个小产品',
    subtitle: 'Product project',
    icon: LuBox,
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
  },
];

export default function Categories() {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-1">Action Section</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">今日你要做什么？</h2>
        </div>

        {/* Category Grid - 3+2 布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.slice(0, 3).map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="group block"
              >
                <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg ${category.iconBg} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-5 h-5 ${category.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold mb-1 group-hover:text-purple-300 transition-colors">
                    {category.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-slate-500">{category.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 第二行 - 2个卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 lg:max-w-[66.666%]">
          {categories.slice(3, 5).map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="group block"
              >
                <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg ${category.iconBg} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-5 h-5 ${category.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold mb-1 group-hover:text-purple-300 transition-colors">
                    {category.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-slate-500">{category.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
