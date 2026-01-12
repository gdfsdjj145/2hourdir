'use client';
import React from 'react';
import Link from 'next/link';
import {
  LuCode2,
  LuTerminal,
  LuCloud,
  LuStar,
  LuHeart,
  LuZap,
  LuRocket,
  LuShield,
  LuLink,
  LuPhone,
  LuCheckCircle,
  LuSettings,
  LuUsers,
  LuFileText,
  LuGithub,
  LuDatabase,
  LuGlobe,
  LuLayers,
  LuLayout,
  LuBox
} from 'react-icons/lu';

// 5个分类入口
const categories = [
  { id: 'page', title: '写一个页面', icon: LuLayout },
  { id: 'feature', title: '写一个功能', icon: LuCode2 },
  { id: 'script', title: '写一个脚本', icon: LuTerminal },
  { id: 'content', title: '写一篇内容', icon: LuFileText },
  { id: 'product', title: '做一个小产品', icon: LuBox },
];

// 左侧装饰图标 - 散乱分布
const leftIcons = [
  { Icon: LuCode2, top: '5%', left: '10%', size: 'w-8 h-8', color: 'text-purple-400', bg: '', duration: 4 },
  { Icon: LuTerminal, top: '15%', left: '2%', size: 'w-6 h-6', color: 'text-slate-400', bg: 'bg-slate-700/50 p-2.5 rounded-xl', duration: 5 },
  { Icon: LuStar, top: '10%', left: '22%', size: 'w-5 h-5', color: 'text-purple-500', bg: '', duration: 3 },
  { Icon: LuFileText, top: '28%', left: '5%', size: 'w-6 h-6', color: 'text-blue-400', bg: 'bg-slate-700/50 p-2 rounded-lg', duration: 4.5 },
  { Icon: LuGithub, top: '24%', left: '16%', size: 'w-7 h-7', color: 'text-slate-300', bg: 'bg-slate-700/50 p-3 rounded-full', duration: 5.5 },
  { Icon: LuCloud, top: '42%', left: '3%', size: 'w-10 h-10', color: 'text-slate-500', bg: '', duration: 4 },
  { Icon: LuStar, top: '38%', left: '20%', size: 'w-4 h-4', color: 'text-purple-400', bg: '', duration: 3.5 },
  { Icon: LuDatabase, top: '55%', left: '8%', size: 'w-7 h-7', color: 'text-green-400/70', bg: '', duration: 4.2 },
  { Icon: () => <span className="text-slate-300 font-bold text-xs">API</span>, top: '65%', left: '4%', size: '', color: '', bg: 'bg-slate-700/50 px-3 py-2 rounded-lg', duration: 5 },
  { Icon: LuSettings, top: '72%', left: '18%', size: 'w-6 h-6', color: 'text-slate-500', bg: '', duration: 3.8 },
  { Icon: LuUsers, top: '82%', left: '6%', size: 'w-9 h-9', color: 'text-slate-400', bg: '', duration: 4.5 },
  { Icon: LuStar, top: '78%', left: '22%', size: 'w-6 h-6', color: 'text-purple-400', bg: '', duration: 3.2 },
  { Icon: LuLayers, top: '92%', left: '12%', size: 'w-8 h-8', color: 'text-blue-400/60', bg: '', duration: 4.8 },
];

// 右侧装饰图标 - 散乱分布
const rightIcons = [
  { Icon: LuHeart, top: '4%', right: '8%', size: 'w-7 h-7', color: 'text-pink-400', bg: '', duration: 4 },
  { Icon: LuRocket, top: '12%', right: '18%', size: 'w-10 h-10', color: 'text-slate-300', bg: '', duration: 5 },
  { Icon: LuHeart, top: '20%', right: '5%', size: 'w-4 h-4', color: 'text-purple-400', bg: '', duration: 3.5 },
  { Icon: LuZap, top: '26%', right: '14%', size: 'w-7 h-7', color: 'text-blue-400', bg: '', duration: 4.2 },
  { Icon: LuZap, top: '35%', right: '22%', size: 'w-5 h-5', color: 'text-blue-300', bg: '', duration: 3 },
  { Icon: LuCheckCircle, top: '40%', right: '6%', size: 'w-8 h-8', color: 'text-blue-400', bg: '', duration: 4.8 },
  { Icon: LuGlobe, top: '50%', right: '4%', size: 'w-9 h-9', color: 'text-purple-400/70', bg: '', duration: 5.2 },
  { Icon: LuSettings, top: '55%', right: '18%', size: 'w-5 h-5', color: 'text-purple-300', bg: '', duration: 3.8 },
  { Icon: LuCloud, top: '65%', right: '10%', size: 'w-9 h-9', color: 'text-blue-400', bg: '', duration: 4.5 },
  { Icon: LuShield, top: '72%', right: '5%', size: 'w-10 h-10', color: 'text-blue-400', bg: '', duration: 5 },
  { Icon: LuPhone, top: '78%', right: '20%', size: 'w-6 h-6', color: 'text-slate-400', bg: 'bg-slate-700/50 p-2 rounded-full', duration: 4.2 },
  { Icon: LuLink, top: '86%', right: '8%', size: 'w-7 h-7', color: 'text-purple-400', bg: '', duration: 3.5 },
  { Icon: LuHeart, top: '90%', right: '22%', size: 'w-5 h-5', color: 'text-pink-400', bg: '', duration: 4 },
];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-12">
      {/* 全局动画样式 */}
      <style>{`
        @keyframes float-up {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-down {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-5deg);
          }
        }
      `}</style>

      {/* 左侧装饰图标 */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {leftIcons.map((item, index) => {
          const { Icon, top, left, size, color, bg, duration } = item;
          return (
            <div
              key={`left-${index}`}
              className={`absolute ${bg} ${color} opacity-50 hover:opacity-90 transition-opacity`}
              style={{
                top,
                left,
                animation: `float-${index % 2 === 0 ? 'up' : 'down'} ${duration}s ease-in-out infinite`,
                animationDelay: `${(index * 0.25) % 1.5}s`,
              }}
            >
              <Icon className={size} />
            </div>
          );
        })}
      </div>

      {/* 右侧装饰图标 */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {rightIcons.map((item, index) => {
          const { Icon, top, right, size, color, bg, duration } = item;
          return (
            <div
              key={`right-${index}`}
              className={`absolute ${bg} ${color} opacity-50 hover:opacity-90 transition-opacity`}
              style={{
                top,
                right,
                animation: `float-${index % 2 === 0 ? 'down' : 'up'} ${duration}s ease-in-out infinite`,
                animationDelay: `${(index * 0.3) % 1.5}s`,
              }}
            >
              <Icon className={size} />
            </div>
          );
        })}
      </div>

      {/* 主内容区域 */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
        {/* 主标题 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          你现在有 2 小时
        </h1>

        {/* 副标题 */}
        <p className="text-2xl md:text-3xl text-slate-300 font-medium mb-6">
          今天，交付一个真实输出。
        </p>

        {/* 副文案 */}
        <p className="text-base md:text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
          不是学习，不是收藏，是 2 小时后你能发出去的东西。
        </p>

        {/* 5个分类入口 */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/70 border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1"
              >
                <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                <span className="text-sm md:text-base text-slate-300 group-hover:text-white transition-colors font-medium">
                  {category.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
